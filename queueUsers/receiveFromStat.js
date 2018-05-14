var exec = require('child_process').exec;

export const receiveFromStat = (req, res, next) => {
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
	    console.log('LLamar a: http://localhost/stat/vote');
	    console.log('stdout: ' + data);
	});
			var child2 = exec('ls');
	child.stderr.on('data', function(data) {
	    console.log('stdout: ' + data);
	});
	child.on('close', function(code) {
	    console.log('closing code: ' + code);
	});

}

