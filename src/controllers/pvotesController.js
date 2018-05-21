import mongoose from 'mongoose';
import { PvotesSchema } from '../models/pvotesModel';

var amqp = require('amqplib/callback_api');

const Pvotes = mongoose.model('Pvotes', PvotesSchema);

export const addNewPvotes = (req, res) => {
		//params ideaId, voterId == email(from model User).
    let newPvotes = new Pvotes(req.body);
    newPvotes.save((err, pvotes) => {
        if (err) {
            res.send(err);
        }
        res.json(pvotes);
    });
}
function toPvotes(params, body) {
	return new Pvotes({
		ideaId: params.ideaId,
		voterId: body.voterId,
		idea: body.idea,
		voter: body.voter
});
		//ideaId: body.ideaId,
}
export const patchPvotes = (req, res, next) => {
	const vote = req.body.action;
	const ideaId = req.params.ideaId;
	console.log("-------------------<<<<IDEA ID >>>>>>--------------");
	console.log(ideaId);
	//const userId = req.body.userId;
	//const voter = req.body.voter;
	//const idea = req.body.idea;
	//var pvotes = toPvotes(req.params, req.body);
  //if (err) {
  //    res.send(err);
  //}
  //res.json(pvotes);

	if (vote) {
	  //let newPvotes = new Pvotes(toPvotes(req.params, req.body));
	  let newPvotes = toPvotes(req.params, req.body);
    newPvotes.save((err, pvotes) => {
        if (err) {
            res.send(err);
        }
        res.json(pvotes);
				next();
    });
	} else {
    Pvotes.remove({ _id: req.params.pvotesId }, (err, pvotes) => {
        if (err) {
            res.send(err);
        }
        res.json({ message: 'Successfully deleted pvotes'});
				next();
    })
	}
}

export const getPvotess = (req, res) => {
	//const vote = req.params.ideaId;
  //if (err) {
  //    res.send(err);
  //}
  //res.json(vote);


    Pvotes.find({}, (err, pvotes) => {
        if (err) {
            res.send(err);
        }
        res.json(pvotes);
    });
};

export const getPvotesWithID = (req, res) => {
    Pvotes.findById(req.params.pvotesId, (err, pvotes) => {
        if (err) {
            res.send(err);
        }
        res.json(pvotes);
    });
}

export const updatePvotes = (req, res) => {
    Pvotes.findOneAndUpdate({ _id: req.params.pvotesId}, req.body, { new: true }, (err, pvotes) => {
        if (err) {
            res.send(err);
        }
        res.json(pvotes);
    })
}

export const deletePvotes = (req, res) => {
    Pvotes.remove({ _id: req.params.pvotesId }, (err, pvotes) => {
        if (err) {
            res.send(err);
        }
        res.json({ message: 'Successfully deleted pvotes'});
    })
}

export const deleteAllPvotes = (req, res) => {
    Pvotes.remove({}, (err, pvotes) => {
        if (err) {
            res.send(err);
        }
        res.json({ message: 'Successfully deleted all pvotes'});
    })
}


export const sendFromPvotesToQueueToStat = (req, res, next) => {
	//var amqp = require('amqplib/callback_api');
  //const newUser = new User(req.body);
	const ideaId = req.params.ideaId;
	console.log(ideaId); 
  //let newIdea = new Idea(req.body);
	//console.log(newIdea.toJSON()); 
	amqp.connect('amqp://localhost', function(err, conn) {
		  conn.createChannel(function(err, ch) {
	    var ex = 'topic_ideas';
	    //var args = process.argv.slice(2);
			var args = ["*.*.stat", "Actualizar votos: ", ideaId];
			//var args = ["*.users.*", "Lista ideas: ", newUser];
	    var msg = args.slice(1).join(' ') || 'pvotesController: Mmmmm..!';
	    var key = (args.length > 0) ? args[0] : 'idea.users.stat';
	
	    ch.assertExchange(ex, 'topic', {durable: false});
	    //ch.publish(ex, key, new Buffer(msg));
			// timeSendToQueue < timeExit
			const timeSendToQueue = 500;
	  	setTimeout(function() { ch.publish(ex, key, new Buffer(msg)); }, timeSendToQueue);
	    console.log(" [x] Sent %s: '%s'", key, msg);
	  });
	
		const timeExit = 1000;
	  setTimeout(function() { 
			conn.close(); 
			//process.exit(0);
		}, timeExit);
	});
   next();
}
