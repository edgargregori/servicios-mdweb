import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const IdeaSchema = new Schema({
		suggesting: {
      type: String,
      required: true
    },
    proposer: {
      type: String,
      required: true
    },
    votes: {
      type: Number,
			default: 0
    },
    name: {
        type: String,
        required: true
    }
});
