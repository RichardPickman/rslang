import mongoose from 'mongoose';
import addMethods from '../../utils/toResponse';
import { UserWords } from '../../Types/Models';

const Schema = mongoose.Schema;

const UserWordsSchema = new Schema<UserWords>(
  {
    wordId: { type: mongoose.Schema.Types.ObjectId, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    difficulty: { type: String, required: false },
    optional: {
      type: Object,
      required: false
    }
  },
  { collection: 'userWords' }
);

UserWordsSchema.index({ wordId: 1, userId: 1 }, { unique: true });

addMethods(UserWordsSchema);

const model = mongoose.model('UserWords', UserWordsSchema);

export default model;
