import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import addMethods from '../../utils/toResponse';
import { Settings } from '../../Types/Models';

const SettingsSchema = new Schema<Settings>(
  {
    userId: {
      type: String,
      required: true
    },
    wordsPerDay: {
      type: Number
    },
    optional: {
      type: Object,
      required: false
    }
  },
  { collection: 'setting' }
);

addMethods(SettingsSchema);

const model = mongoose.model('SettingsSchema', SettingsSchema);

export default model;
