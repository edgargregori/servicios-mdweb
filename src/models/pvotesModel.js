import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const PvotesSchema = new Schema({
		// id de la idea.
    ideaId: {
      type: String,
      required: true
		},
   voterId: {
        type: String,
        required: true
    },
    idea: {
      type: String,
      required: true
		},
   voter: {
        type: String,
        required: true
    }
});


//    user_id: {
//      type: Number,
//      required: true
//    },
		//email del usuario
 
//		suggesting: {
//      type: String,
//      required: true
//    }
//    idea_id: {
//      type: Number,
//      required: true
//		},
// 
