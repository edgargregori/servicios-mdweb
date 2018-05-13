import { 
    addNewIdea, 
    getIdeas, 
    getIdeaWithID, 
    updateIdea,
    deleteIdea,
		deleteAllIdea,
		sendQueueFromStat, 
		receiveFromIdeaToQueue
} from '../controllers/ideaController';
import { login, register, loginRequired, deleteAllPvotes, sendQueue} from '../controllers/userControllers';
//sendQueuFromIdea: from Idea to Queue to receiveFromUsersToQueue(-->stat)
const routesIdeas = (app) => {
		//Action vote
		app.route('/idea/vote/:ideaId')
			  .get(receiveFromIdeaToQueue, sendQueueFromStat, loginRequired);

    app.route('/idea')
    .get((req, res, next) => {
        // middleware
        console.log(`Request from: ${req.originalUrl}`)
        console.log(`Request type: ${req.method}`)
        next();
    }, sendQueueFromStat, loginRequired, getIdeas)
    //}, sendQueueFromStat, receiveFromUsersToQueue, loginRequired, getIdeas)
    //}, getIdeas)
    
    // POST endpoint
    //.post(addNewIdea);
    //.post(sendQueueFromIdea, loginRequired, addNewIdea);
    .post(loginRequired, addNewIdea);

    app.route('/idea/:ideaId')
    // get specific idea
    .get( getIdeaWithID)
    //.get(loginRequired, getIdeaWithID)
    
    // put request
    .put( updateIdea)
    //.put(loginRequired, updateIdea)

    // delete request
    .delete(deleteIdea);
    //.delete(loginRequired, deleteIdea);

		app.route('/idea/delete/all')
			  .get(deleteAllIdea);

    // registration route
    app.route('/auth/register')
        //.post(register);
        .post(register, sendQueue);

    // login route
    app.route('/auth/login')
        .post(login);

		app.route('/user/delete/all')
			.get(deleteAllPvotes);
}

export default routesIdeas;
