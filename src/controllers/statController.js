import mongoose from 'mongoose';
import { StatSchema } from '../models/statModel';
import { PvotesSchema } from '../models/pvotesModel';
import { IdeaSchema } from '../models/ideaModel';

var amqp = require('amqplib/callback_api');
const Stat = mongoose.model('Stat', StatSchema);
const Pvotes = mongoose.model('Pvotes', PvotesSchema);
const Idea = mongoose.model('Idea', IdeaSchema);

export const addNewStat = (req, res) => {
    let newStat = new Stat(req.body);

    newStat.save((err, stat) => {
        if (err) {
            res.send(err);
        }
        res.json(stat);
    });
};
//export const updateIdea = (req, res) => {
function updateIdea(ideaId, votes) {
    Idea.findOneAndUpdate({ _id: ideaId}, { votes: votes  }, { new: true }, (err, idea) => {
        if (err) {
            //res.send(err);
					return err;
        }
        //res.json(idea);
			return idea;
			next();
    })
};
export const countPvotesFromIdea = (req, res, next) => {
	try {
		let votosIdea = {idea:"idx",votes:13};
		//return votosIdea;
		//const ideaId = "5af52aaa04171b1a284eef4c";
		console.log("*************************---------------*************************");
		const ideaId = req.params.ideaId;
		console.log("Idea Id %: ", ideaId);
		const idea = "u1suggest";//u1suggest
		console.log("statController.findStats");
    var all = 
		Pvotes.find({ideaId: ideaId}, (err, pvotes) => {
      if (err) {
          res.send(err);
      }
			console.log("pvotes 1:  " + pvotes.length);
			let tt = countItems(pvotes);        //res.json(pvotesIdea);
			console.log("pvotesIdea total 1: " + tt);
			let countIT = countItems(pvotes); 
			console.log("countIT " +  countIT);	

			updateIdea(ideaId, pvotes.length);
      res.json(pvotes);
				next();
		}).count();
		console.log("Votos: " + all);
	}
	catch (ex) {
		//Log exception
		next(err);
	}
};

function countItems(pvotes) {
			var count = 0;
			for (var prop in pvotes) {
				if(pvotes.hasOwnProperty(prop))
					++count;
			}
};

///*
// Oficial
export const sendQueueFromStatToIdea = (req, res, next) => {
	//var amqp = require('amqplib/callback_api');
  //const newUser = new User(req.body);
	var votosIdea = req;
	amqp.connect('amqp://localhost', function(err, conn) {
	  conn.createChannel(function(err, ch) {
	    var ex = 'topic_ideas';
	    //var args = process.argv.slice(2);
			var args = ["idea.#", " Votos  Actualizados!!: ideaId: 1, votes: 13 votos from stat(statController) to idea(ideaController.js:) ", votosIdea];
			//var args = ["*.users.*", "Lista ideas: ", newUser];
	    var msg = args.slice(1).join(' ') || 'statController: Mmmmm..!';
	    var key = (args.length > 0) ? args[0] : 'idea.users.stat';
	
	    ch.assertExchange(ex, 'topic', {durable: false});
	    //ch.publish(ex, key, new Buffer(msg));
			// timeSendToQueue < timeExit
			const timeSendToQueue = 500;
	  	setTimeout(function() { ch.publish(ex, key, new Buffer(msg)); }, timeSendToQueue);
	    console.log(" [x] Sent from src/controllers/statController.js: %s: '%s'", key, msg);
	  });
	
		const timeExit = 1000;
	  setTimeout(function() { 
			conn.close(); 
			//process.exit(0);
		}, timeExit);
	});
   next();
}
//*/





export const getStats = (req, res, next) => {
		let votosIdea = {idea:"idx",votes:13};
		//return votosIdea;
    Stat.find({}, (err, idea) => {
        if (err) {
            res.send(err);
        }
        res.json(votosIdea);
				next();
    });
};

export const getStatWithID = (req, res) => {
    Stat.findById(req.params.ideaId, (err, stat) => {
        if (err) {
            res.send(err);
        }
        res.json(stat);
    });
}

export const updateStat = (req, res) => {
    Stat.findOneAndUpdate({ _id: req.params.statId}, req.body, { new: true }, (err, stat) => {
        if (err) {
            res.send(err);
        }
        res.json(stat);
    })
}

export const deleteStat = (req, res) => {
    Stat.remove({ _id: req.params.statId }, (err, stat) => {
        if (err) {
            res.send(err);
        }
        res.json({ message: 'Successfully deleted stat'});
    })
}

export const deleteAllStat = (req, res) => {
    Stat.remove({}, (err, stat) => {
        if (err) {
            res.send(err);
        }
        res.json({ message: 'Successfully deleted all Stats'});
    })
}

export const getPvotes = (req, res) => {
    Stat.findById(req.params.statId, (err, stat) => {
        if (err) {
            res.send(err);
        }
        res.json(stat);
    });
}




