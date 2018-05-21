import { 
    addNewStat, 
    getStats, 
    getStatWithID, 
    updateStat,
    deleteStat,
		deleteAllStat,
		receiveFromStat,
		countPvotesFromIdea,
		sendQueueFromStatToIdea

} from '../controllers/statController';
import { 
	//receiveFromUsersToQueue,
	login, 
	register, 
	loginRequired, 
	deleteAllPvotes, 
	sendQueue 
} from '../controllers/userControllers';

//sendQueuFromStat: from Idea to Queul to receiveFromUsersToQueue
const routesStats = (app) => {
///*
    app.route('/v1/stats/:ideaId/pvotes')
    .get((req, res, next) => {
        // middleware
        console.log(`Request from: ${req.originalUrl}`)
        console.log(`Request type: ${req.method}`)
        next();
    }, countPvotesFromIdea, sendQueueFromStatToIdea)
    //}, getStats)
    
    // POST endpoint
    //.post(addNewStat);
    .post(sendQueueFromStatToIdea, loginRequired, addNewStat);
//*/

///*
    app.route('/stats')
    .get((req, res, next) => {
        // middleware
        console.log(`Request from: ${req.originalUrl}`)
        console.log(`Request type: ${req.method}`)
        next();
    }, getStats, sendQueueFromStatToIdea)
    //}, getStats)
    
    // POST endpoint
    //.post(addNewStat);
    .post(sendQueueFromStatToIdea, loginRequired, addNewStat);

    app.route('/stat/:statId')
    // get specific stat
    .get( getStatWithID)
    //.get(loginRequired, getStatWithID)
    
    // put request
    .put( updateStat)
    //.put(loginRequired, updateStat)

    // delete request
    .delete(deleteStat);
    //.delete(loginRequired, deleteStat);

		app.route('/stat/delete/all')
			  .get(deleteAllStat);

    // registration route
    app.route('/auth/register')
        //.post(register);
        .post(register, sendQueue);

    // login route
    app.route('/auth/login')
        .post(login);

		app.route('/user/delete/all')
			.get(deleteAllPvotes);
//*/
}

export default routesStats;
