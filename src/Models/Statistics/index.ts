import mongoose from 'mongoose';
import addMethods from '../../utils/toResponse';
import { Statistics } from '../../Types/Models';

const Schema = mongoose.Schema;

const StatisticSchema = new Schema<Statistics>(
  {
    userId: {
      type: String,
      required: true
    },
    learnedWords: {
      type: Number
    },
    optional: {
      type: Object,
      required: false
    }
  },
  { collection: 'statistic' }
);

addMethods(StatisticSchema);

const model = mongoose.model('Statistic', StatisticSchema);

export default model;
