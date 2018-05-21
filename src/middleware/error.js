const winston = require('winston');
module.exports = function(err, req, res, next) {
		winston.error(err.message, err);
		//winston.log('error', err.message);
		//error, warn, info, verbose, debug, silly
		res.status(500).send('Algo fallo en el servidor');
};

