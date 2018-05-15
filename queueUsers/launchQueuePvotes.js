var exec = require('child_process').exec;

export const launchQueuePvotes = (req, res, next) => {
	//console.log(req.body);
if ( req != null && next != null ) {
		console.log('receiveFromPvotes -> req' + req.body);
		next();
	}
	if ( res != null && next != null ) {
		console.log('receiveFromStat -> resp');
		next();
	}
	if ( next != null )
		next();	
	var child = exec('node ./queueUsers/receive_logs_dominio2.js "idea.#"');
	child.stdout.on('data', function(data) {
		  //console.log('LLamar a: http://34.205.63.101/stat/vote');
	    console.log('QueuePvotes: LLamar a: http://localhost/stat/vote');
	    console.log('stdout: ' + data);
	});

		//var child2 = exec('ls');
	child.stderr.on('data', function(data) {
	    console.log('stdout: ' + data);
	});
	child.on('close', function(code) {
	    console.log('closing code: ' + code);
	});
	var childToIdea = exec('node ./queueUsers/receive_logs_dominio2.js "idea.#"');

/*
			var childToStat = exec('curl -X GET -H "Content-Type: application/x-www-form-urlencoded" -i "http://34.205.63.101:3000/idea" --data "idea_id=122&email=eg2%40mail.com&user_id=12345"'); 
	childToIdea.stdout.on('data', function(data) {
		  //console.log('LLamar a: http://34.205.63.101/stat/vote');
	    console.log('QueuePvotes: LLamar a: http://localhost/stat/vote');
	    console.log('stdout: ' + data);
	});

		//var child2 = exec('ls');
	childToIdea.stderr.on('data', function(data) {
	    console.log('stdout: ' + data);
	});
	childToIdea.on('close', function(code) {
	    console.log('closing code: ' + code);
	});
*/


}

