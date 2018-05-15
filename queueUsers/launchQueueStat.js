var exec = require('child_process').exec;

export const launchQueueStat = (req, res, next) => {
	if ( req != null && next != null ) {
		console.log('receiveFromStat -> req' + req.body);
		next();
	}
	if ( res != null && next != null ) {
		console.log('receiveFromStat -> resp');
		next();
	}
	if ( next != null ) {
		res(req(res.json));
		next();	
	}
	//const req = req.body;
	var child = exec('node ./queueUsers/receive_logs_dominio.js "*.*.stat"');
	child.stdout.on('data', function(data) {
	    //console.log('LLamar a: http://34.205.63.101/stat/vote');
	    console.log('QueueStat LLamar a: http://localhost/stat');
	    console.log('stdout: ' + data);
	});

//	var child = exec('curl -X GET -H "Content-Type: application/x-www-form-urlencoded" -i "http://34.205.63.101:3000/stat/vote" --data "idea_id=122&email=eg2%40mail.com&user_id=12345"'); 
			var child2 = exec('ls -l');
	child.stderr.on('data', function(data) {
	    console.log('stdout: ' + data);
	});
	child.on('close', function(code) {
	    console.log('closing code: ' + code);
	});
/*
			var childToStat = exec('curl -X GET -H "Content-Type: application/x-www-form-urlencoded" -i "http://34.205.63.101:3000/stat" --data "idea_id=122&email=eg2%40mail.com&user_id=12345"'); 
	childToIdea.stdout.on('data', function(data) {
		  //console.log('LLamar a: http://34.205.63.101/stat/vote');
	    console.log('launchQueueStat(QueuePvotes), stodout on, stat');
	    console.log('stdout: ' + data);
	});

		//var child2 = exec('ls');
	childToIdea.stderr.on('data', function(data) {
	    console.log('stdout: ' + data);
	});
	childToIdea.on('close', function(code) {
	    console.log('launchQueueStat(QueuePvotes): closing code: ' + code);
	});
*/

}

