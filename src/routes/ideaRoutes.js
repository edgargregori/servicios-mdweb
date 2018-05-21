import { 
    addNewIdea, 
    getIdeas, 
    getIdeaWithID, 
    updateIdea,
    deleteIdea,
		deleteAllIdea,
		sendQueueFromIdeaToStat 
		//receiveFromIdeaToQueue
} from '../controllers/ideaController';
import { login, register, loginRequired, deleteAllPvotes, sendQueue} from '../controllers/userControllers';
import { getPvotess, patchPvotes} from '../controllers/pvotesController';
//sendQueuFromIdea: from Idea to Queue to receiveFromUsersToQueue(-->stat)
const routesIdeas = (app) => {
    app.route('/v1/ideas')
    .get((req, res, next) => {
				//throw new Error("No se pudo entrar a la aplicacion.")
        // middleware
        console.log(`Request from: ${req.originalUrl}`)
        console.log(`Request type: ${req.method}`)
        next();
    }, getIdeas)
    //}, loginRequired, getIdeas)
    //}, sendQueueFromIdeaToStat, receiveFromUsersToQueue, loginRequired, getIdeas)
    //}, getIdeas)
    
    // POST endpoint
    //.post(addNewIdea);
    //.post(sendQueueFromIdea, loginRequired, addNewIdea);
    .post(loginRequired, addNewIdea);

    app.route('/v1/idea/:ideaId')
    // get specific idea
    .get( getIdeaWithID)
    //.get(loginRequired, getIdeaWithID)
    
    // put request
    .put( updateIdea)
    //.put(loginRequired, updateIdea)

    // delete request
    .delete(deleteIdea);
    //.delete(loginRequired, deleteIdea);

		app.route('/v1/ideas/delete/all')
    	.get((req, res, next) => {
        // middleware
        console.log(`Request from: ${req.originalUrl}`)
        console.log(`Request type: ${req.method}`)
        next();
    }, deleteAllIdea);
		// proposer ~ email.
		app.route('/v1/ideas/votes/:voterId')
    	.get((req, res, next) => {
        // middleware
        console.log(`Request from: ${req.originalUrl}`)
        console.log(`Request type: ${req.method}`)
        next();
    }, getIdeas);
	
		//Action vote /ideas/idx/votes?action=vote
//	/*
    app.route('/v1/idea/:ideaId/votes')
    	.get((req, res, next) => {
        // middleware
        console.log(`Request from: ${req.originalUrl}`)
        console.log(`Request type: ${req.method}`)
        next();
    	}, getPvotess) //sendQueueFromIdeaToStat,
			.post(patchPvotes, sendQueueFromIdeaToStat);//sendQueueFromIdeaToStat,
			//.patch(sendQueueFromIdeaToStat, addNewPvotes);
			  //.get(receiveFromIdeaToQueue, loginRequired);
//	*/

    // registration route
    app.route('/v1/auth/register')
        //.post(register);
        .post(register, sendQueue);

    // login route
    app.route('/v1/auth/login')
        .post(login);

		app.route('/v1/user/delete/all')
			.get(deleteAllPvotes);
}

export default routesIdeas;
