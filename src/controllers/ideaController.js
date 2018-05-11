import mongoose from 'mongoose';
import { IdeaSchema } from '../models/ideaModel';

var amqp = require('amqplib/callback_api');

const Idea = mongoose.model('Idea', IdeaSchema);

export const addNewIdea = (req, res) => {
    let newIdea = new Idea(req.body);

    newIdea.save((err, idea) => {
        if (err) {
            res.send(err);
        }
        res.json(idea);
    });
};

export const getIdeas = (req, res) => {
    Idea.find({}, (err, idea) => {
        if (err) {
            res.send(err);
        }
        res.json(idea);
    });
};

export const getIdeaWithID = (req, res) => {
    Idea.findById(req.params.ideaId, (err, idea) => {
        if (err) {
            res.send(err);
        }
        res.json(idea);
    });
}

export const updateIdea = (req, res) => {
    Idea.findOneAndUpdate({ _id: req.params.ideaId}, req.body, { new: true }, (err, idea) => {
        if (err) {
            res.send(err);
        }
        res.json(idea);
    })
}

export const deleteIdea = (req, res) => {
    Idea.remove({ _id: req.params.ideaId }, (err, idea) => {
        if (err) {
            res.send(err);
        }
        res.json({ message: 'Successfully deleted idea'});
    })
}

export const deleteAllIdea = (req, res) => {
    Idea.remove({}, (err, idea) => {
        if (err) {
            res.send(err);
        }
        res.json({ message: 'Successfully deleted all Ideas'});
    })
}


export const sendQueueFromIdea = (req, res, next) => {
//var amqp = require('amqplib/callback_api');
  //const newUser = new User(req.body);
	amqp.connect('amqp://localhost', function(err, conn) {
	  conn.createChannel(function(err, ch) {
	    var ex = 'topic_logs';
	    //var args = process.argv.slice(2);
			var args = ["*.users.*", "Lista ideas from ideaController.js: "];
			//var args = ["*.users.*", "Lista ideas: ", newUser];
	    var msg = args.slice(1).join(' ') || 'ideaController: Mmmmm..!';
	    var key = (args.length > 0) ? args[0] : 'idea.users.stat';
	
	    ch.assertExchange(ex, 'topic', {durable: false});
	    //ch.publish(ex, key, new Buffer(msg));
			// timeSendToQueue < timeExit
			const timeSendToQueue = 500;
	  	setTimeout(function() { ch.publish(ex, key, new Buffer(msg)); }, timeSendToQueue);
	    console.log(" [x] Sent from src/controllers/ideaController.js: %s: '%s'", key, msg);
	  });
	
		const timeExit = 1000;
	  setTimeout(function() { 
			conn.close(); 
			//process.exit(0);
		}, timeExit);
	});
   next();
}
