import mongoose, { Document } from 'mongoose';

export interface User extends Document {
  name: string;
  email: string;
  password?: string;
  userId?: mongoose.ObjectId;
  _update: string;
  toResponse: () => Record<string, unknown>;
}

export interface AggregatedWords extends User {
  wordId: mongoose.ObjectId;
  difficulty: string;
  optional: Record<string, unknown>;
}

export interface Words extends User {
  group: number;
  page: number;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  wordTranslate: string;
  textMeaningTranslate: string;
  textExampleTranslate: string;
}

export interface Settings extends User {
  wordsPerDay: number;
  optional: Record<string, unknown>;
}

export interface UserWords extends User {
  wordId: mongoose.ObjectId;
  difficulty: string;
  optional: Record<string, unknown>;
}

export interface Statistics extends User {
  learnedWords: number;
  optional: Record<string, unknown>;
}
