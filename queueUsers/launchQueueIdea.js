var exec = require('child_process').exec;

export const launchQueueIdea = (req, res, next) => {
	//console.log(req.body);
if ( req != null && next != null ) {
		console.log('receiveFromStat -> req' + req.body);
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
	    console.log('stdout: ' + data);
	});
	var childToStat = exec('curl -X GET -H "Content-Type: application/x-www-form-urlencoded" -i "http://34.205.63.101:3000/idea" --data "idea_id=122&email=eg2%40mail.com&user_id=12345"'); 
	child.stderr.on('data', function(data) {
	    console.log('stdout: ' + data);
	});
	child.stderr.on('data', function(data) {
	    console.log('stdout: ' + data);
	});
	child.on('close', function(code) {
	    console.log('closing code: ' + code);
	});
	
}

