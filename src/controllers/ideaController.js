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

export const getPvotes = (req, res) => {
    Idea.findById(req.params.ideaId, (err, idea) => {
        if (err) {
            res.send(err);
        }
        res.json(idea);
    });
}


/*
var exec = require('child_process').exec;

export const receiveFromStat = (req, res, next) => {
	console.log(req.body);
	var child = exec('node ./queueUsers/receive_logs_dominio.js "*.*.stat"');
	child.stdout.on('data', function(data) {
	    console.log('stdout: ' + data);
	});
	child.stderr.on('data', function(data) {
	    console.log('stdout: ' + data);
	});
	child.on('close', function(code) {
	    console.log('closing code: ' + code);
	});
	next();	
}
*/

/*
//Oficial
var exec = require('child_process').exec;
export const receiveFromIdea = (req, res, next) => {
	console.log(req.body);
	var child = exec('node ./queueUsers/receive_logs_dominio.js "idea.#"');
	child.stdout.on('data', function(data) {
	    console.log('stdout: ' + data);
	});
	child.stderr.on('data', function(data) {
	    console.log('stdout: ' + data);
	});
	child.on('close', function(code) {
	    console.log('closing code: ' + code);
	});
	next();	
}
*/

export const sendQueueFromIdeaToStat = (req, res, next) => {
//var amqp = require('amqplib/callback_api');
	const id = req.params.ideaId;
	console.log(id); 
  //let idea = new Idea(req.params.ideaId);
  let newIdea = new Idea(req.body);
	console.log(newIdea.toJSON()); 
  //let ideaF = Idea.findById(req.params.ideaId);
  let idea = Idea.findById(id);
	//console.log(idea); 
	//console.log(idea.JSON.parse()); 
  //const idea = req.body;
	amqp.connect('amqp://localhost', function(err, conn) {
	  conn.createChannel(function(err, ch) {
	    var ex = 'topic_logs';
	    //var args = process.argv.slice(2);
			//var args = ["idea.#", "Actualizar Votos: from idea to stat(statController.js:) "];
			var args = ["*.*.stat", "Actualizar Votos: from idea(ideaController) to stat(statController.js:) ", idea];
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
