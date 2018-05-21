import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import jsonwebtoken from 'jsonwebtoken';
import User from './src/models/userModel';
import { PvotesSchema } from './src/models/pvotesModel';
//import routes from './src/routes/crmRoutes';
import routesIdeas from './src/routes/ideaRoutes';
import routesPvotess from './src/routes/pvotesRoutes';
import routesStats from './src/routes/statRoutes';
//import { receiveFromUsersToQueue } from './queueRabbitAmqp/launchReceive';
import { launchQueueStat } from './queueRabbitAmqp/launchQueueStat';
//import { receiveFromIdea } from './queueRabbitAmqp/receiveFromIdea';
import { launchQueuePvotes } from './queueRabbitAmqp/launchQueuePvotes';

const winston = require('winston');
const error = require('./src/middleware/error');
const app = express();

///*// Log transportado por winston.
process.on('uncaughtException', (ex) => {
	console.log('Error no capturado por express, si por winston.');
	winston.error(ex.message, ex);
	//process.exit(1);
});

//const winstonerr = 
winston.handleExceptions(
	new winston.transports.Console({ colorize: true, prettyPrint: true}),
	new winston.transports.File({ filename: 'uncaughtExceptions.log'}));

process.on('unhandledRejection', (ex) => {
	console.log('Error de rechazo no manejado . NO por express, si por winston.');
	winston.error(ex.message, ex);
	//process.exit(1);
	//throw ex;// manejado por winston y almacenado en uncaughtExceptions.log.
});

winston.add(winston.transports.File, { filename: 'winstonlog.log'});

//const p = Promise.reject(new Error('Error: Fallo asyncrono.'));
//p.then(() => console.log('Terminado'));//.catch();
//await


//throw new Error('Error fuera de express');
//*/

const PORT = 3000;
//const launch = receiveFromUsersToQueue();
const queueStat = launchQueueStat();
//const launchReceiveFromStat = receiveFromIdea();
const queuePvotes = launchQueuePvotes();
// mongoose connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/CRMdb', {
    useMongoClient: true
});
/*
mongoose.connection.on('open', function () {
	console.log("MongoDb connected");
	const Pvotes = mongoose.model('Pvotes', PvotesSchema);
});
*/
// bodyparser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// JWT setup
app.use((req, res, next) => {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
       jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', (err, decode) => {
           if (err) req.user = undefined;
           req.user = decode;
           next();
       }); 
    } else {
        req.user = undefined;
        next();
    }
});

//routes(app);
routesIdeas(app);
routesPvotess(app);
routesStats(app);

// serving static files
app.use(express.static('public'));

app.use(error);

app.get('/', (req, res) => { 
	try{
				//winston.log('error', err.message);
				//winston.error(err.message, err);
				//throw new Error("No se pudo entrar a la aplicacion.")
				//let error= new Error("No se pudo entrar a la aplicacion.")
				//callback(error);
    res.send(`Node and express server is running on port ${PORT}`)
	} catch (e) {
		console.log(e.name + ": " +e.message);
	}
});

app.listen(PORT, () =>
    console.log(`your server is running on port ${PORT}`)
);
