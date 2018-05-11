import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const PvotesSchema = new Schema({
    idea_id: {
      type: String,
      required: true
		},
    email: {
        type: String,
        required: true
    }
});
//		suggesting: {
//      type: String,
//      required: true
//    }
//   user_id: {
//      type: Number,
//      required: true
//    },
//    idea_id: {
//      type: Number,
//      required: true
//		},
// 
