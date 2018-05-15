import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import jsonwebtoken from 'jsonwebtoken';
import User from './src/models/userModel';
//import routes from './src/routes/crmRoutes';
import routesIdeas from './src/routes/ideaRoutes';
import routesPvotess from './src/routes/pvotesRoutes';
import routesStats from './src/routes/statRoutes';
//import { receiveFromUsersToQueue } from './queueUsers/launchReceive';
import { launchQueueStat } from './queueUsers/launchQueueStat';
//import { receiveFromIdea } from './queueUsers/receiveFromIdea';
import { launchQueuePvotes } from './queueUsers/launchQueuePvotes';

const app = express();
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

app.get('/', (req, res) =>
    res.send(`Node and express server is running on port ${PORT}`)
);

app.listen(PORT, () =>
    console.log(`your server is running on port ${PORT}`)
);
