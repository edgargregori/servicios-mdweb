import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const PvotesSchema = new Schema({
   user_id: {
      type: Number,
      required: true
    },
    idea_id: {
      type: Number,
      required: true
		}
});
