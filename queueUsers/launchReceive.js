var exec = require('child_process').exec;

export const receiveFromUsersToQueue = (req, res, next) => {
	console.log("req: ");
	//console.log(req.body);
  var child = exec('node ./queueUsers/receive_logs_dominio.js "*.users.*"');
  child.stdout.on('data', function(data) {
      console.log('stdout: ' + data);
  });
  child.stderr.on('data', function(data) {
      console.log('stdout: ' + data);
  });
  child.on('close', function(code) {
      console.log('closing code: ' + code);
  });
  //next();
}

