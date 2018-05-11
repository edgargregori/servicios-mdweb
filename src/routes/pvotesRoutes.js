import { 
    addNewPvotes, 
    getPvotess, 
    getPvotesWithID, 
    updatePvotes,
    deletePvotes,
		deleteAllPvotes,
		sendFromPvotesToQueueToStat
} from '../controllers/pvotesController';
import { login, register, loginRequired, sendQueue} from '../controllers/userControllers';

const routesPvotess = (app) => {
    app.route('/pvotes')
    .get((req, res, next) => {
        // middleware
        console.log(`Request from: ${req.originalUrl}`)
        console.log(`Request type: ${req.method}`)
        next();
    },loginRequired, getPvotess)
    //}, getPvotess)
    
    // POST endpoint
    //.post(addNewPvotes);
    .post(sendFromPvotesToQueueToStat, loginRequired, addNewPvotes);

    app.route('/pvotes/:ideaId')
    // get specific pvotes
    .get( getPvotesWithID)
    //.get(loginRequired, getPvotesWithID)
    
    // put request
    .put( updatePvotes)
    //.put(loginRequired, updatePvotes)

    // delete request
    .delete(deletePvotes);
    //.delete(loginRequired, deletePvotes);

		app.route('/pvotes/delete/all')
		.get(deleteAllPvotes);

    // registration route
    app.route('/auth/register')
        //.post(register);
        .post(register, sendQueue);

    // login route
    app.route('/auth/login')
        .post(login);
}

export default routesPvotess;
