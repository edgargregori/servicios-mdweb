#!/usr/bin/env node

var amqp = require('amqplib/callback_api');

var exec = require('child_process').exec;

var args = process.argv.slice(2);

if (args.length == 0) {
  console.log("Usage: receive_logs_dominio.js <idea>.<users>.<stat>");
  process.exit(1);
}

amqp.connect('amqp://localhost', function(err, conn) {
  conn.createChannel(function(err, ch) {
    var ex = 'topic_logs';

    ch.assertExchange(ex, 'topic', {durable: false});

    ch.assertQueue('', {exclusive: true}, function(err, q) {
      console.log(' [*] idea.# logs from receive 2. To exit press CTRL+C');

      args.forEach(function(key) {
        ch.bindQueue(q.queue, ex, key);
				//console.log("key:" + key);
      });

      ch.consume(q.queue, function(msg) {
        console.log(" [x] idea.# %s: '%s'", msg.fields.routingKey, msg.content.toString());
	    		console.log('receive queue idea(Pvotes) 2:  http://localhost/stat/vote');
					//var child = exec('echo "receive_logs_2"');
	var child = exec('curl -X GET -H "Content-Type: application/x-www-form-urlencoded" -i "http://34.205.63.101:3000/idea" --data "idea_id=122&email=eg2%40mail.com&user_id=12345"'); 
					child.stdout.on('data', function(data) {
	    		console.log('stdout: ' + data);
					});
					child.stderr.on('data', function(data) {
	    			console.log('stdout: ' + data);
					});
					child.on('close', function(code) {
	    			console.log('closing code: ' + code);
					});
				const mensaje = "Bye from queueUsers/receive_logs_dominio.js";
				console.log("....: ", mensaje)
      }, {noAck: true});
    });
  });
});
