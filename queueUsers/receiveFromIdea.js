var exec = require('child_process').exec;

export const receiveFromIdea = (req, res, next) => {
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
	
}

