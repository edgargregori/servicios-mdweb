import mongoose from 'mongoose';
import { PvotesSchema } from '../models/pvotesModel';

var amqp = require('amqplib/callback_api');

const Pvotes = mongoose.model('Pvotes', PvotesSchema);

export const addNewPvotes = (req, res) => {
    let newPvotes = new Pvotes(req.body);

    newPvotes.save((err, pvotes) => {
        if (err) {
            res.send(err);
        }
        res.json(pvotes);
    });
};

export const getPvotess = (req, res) => {
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
	amqp.connect('amqp://localhost', function(err, conn) {
	  conn.createChannel(function(err, ch) {
	    var ex = 'topic_logs';
	    //var args = process.argv.slice(2);
			var args = ["*.*.stat", "Actualizar votos: "];
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
