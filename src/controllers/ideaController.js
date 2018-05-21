import mongoose from 'mongoose';
import { IdeaSchema } from '../models/ideaModel';
import { PvotesSchema } from '../models/pvotesModel';

var amqp = require('amqplib/callback_api');

const Idea = mongoose.model('Idea', IdeaSchema);
const Pvotes = mongoose.model('Pvotes', PvotesSchema);

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

export const vote = (req, res) => {
		//Buscar todas las ideas del usuario (usuarioid).
    Idea.findById(userId, (err, idea) => {
        if (err) {
            res.send(err);
        }
        res.json(idea);
    });
}

// Ideas votadas por un usuario idendificado por voterId
export const getVotes = (req, res) => {
		const voterId = req.params.voterId;
    Pvotes.find({}, (err, pvotes) => {
        if (err) {
            res.send(err);
        }
			const pvotesUser = pvotes.filter(pvotes => pvotes.proposer == voterId);
        res.json(pvotesUser);
    });
};


export const sendQueueFromIdeaToStat = (req, res, next) => {
//var amqp = require('amqplib/callback_api');
	const ideaId = req.params.ideaId;
	console.log('IDEAID:' + ideaId); 
  //let idea = new Idea(req.params.ideaId);
  let newIdea = new Idea(req.body);
	console.log(newIdea.toJSON()); 
  //let ideaF = Idea.findById(req.params.ideaId);
  let idea = Idea.findById(ideaId);
	//console.log(idea); 
	//console.log(idea.JSON.parse()); 
  //const idea = req.body;
	amqp.connect('amqp://localhost', function(err, conn) {
	  conn.createChannel(function(err, ch) {
	    var ex = 'topic_ideas';
	    //var args = process.argv.slice(2);
			//var args = ["idea.#", "Actualizar Votos: from idea to stat(statController.js:) "];
			//var args = ["*.*.stat", "Actualizar Votos: from idea(ideaController) to stat(statController.js:) ", ideaId];
			var args = ["*.*.stat", ideaId];
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
