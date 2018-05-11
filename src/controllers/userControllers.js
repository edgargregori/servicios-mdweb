import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserSchema } from '../models/userModel';
//import amqp from 'amqplib/callback_api';

var amqp = require('amqplib/callback_api');

const User = mongoose.model('User', UserSchema);

export const register = (req, res) => {
    const newUser = new User(req.body);
    newUser.hashPassword = bcrypt.hashSync(req.body.password, 10);
    newUser.save((err, user) => {
        if (err) {
            return res.status(400).send({
                message: err
            });
        } else {
            user.hashPassword = undefined;
            return res.json(user);
        }
    })
}

export const login = (req, res) => {
   User.findOne({
       email: req.body.email
   }, (err, user) => {
       if (err) throw err;
       if (!user) {
           res.status(401).json({ message: 'Authentication failed. No user found!'});
       } else if (user) {
           if (!user.comparePassword(req.body.password, user.hashPassword)) {
                res.status(401).json({ message: 'Authentication failed. Wrong password!'});
       } else {
           return res.json({token: jwt.sign({ email: user.email, username: user.username, _id: user.id}, 'RESTFULAPIs')});
       }
    }
   }); 
}

export const loginRequired = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        return res.status(401).json({ message: 'Unauthorized user!'});
    }
}


export const sendQueue = (req, res, next) => {
//var amqp = require('amqplib/callback_api');
  const newUser = new User(req.body);
	amqp.connect('amqp://localhost', function(err, conn) {
	  conn.createChannel(function(err, ch) {
	    var ex = 'topic_logs';
	    //var args = process.argv.slice(2);
			var args = ["*.users.*", "From User to User: created: ", newUser];
			//var args = ["*.*.stat", "Msg from Users(created) to Stat: ", newUser];
	    var msg = args.slice(1).join(' ') || 'Hello World!';
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
