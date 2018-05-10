import { 
    addNewIdea, 
    getIdeas, 
    getIdeaWithID, 
    updateIdea,
    deleteIdea,
		sendQueueFromIdea
} from '../controllers/ideaController';
import { login, register, loginRequired, sendQueue} from '../controllers/userControllers';

const routesIdeas = (app) => {
    app.route('/idea')
    .get((req, res, next) => {
        // middleware
        console.log(`Request from: ${req.originalUrl}`)
        console.log(`Request type: ${req.method}`)
        next();
    },sendQueueFromIdea, loginRequired, getIdeas)
    //}, getIdeas)
    
    // POST endpoint
    //.post(addNewIdea);
    .post(sendQueueFromIdea, loginRequired, addNewIdea);

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

    // registration route
    app.route('/auth/register')
        //.post(register);
        .post(register, sendQueue);

    // login route
    app.route('/auth/login')
        .post(login);
}

export default routesIdeas;
