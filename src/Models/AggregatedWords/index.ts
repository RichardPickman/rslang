import mongoose from "mongoose";
import addMethods from "../../utils/toResponse";
import { AggregatedWords } from "../../Types/Models";

const Schema = mongoose.Schema;

const UserWordsSchema = new Schema<AggregatedWords>(
    {
        wordId: { type: String, required: true },
        userId: { type: String, required: true },
        difficulty: { type: String, required: false },
        optional: {
            type: Object,
            required: false,
        },
    },
    { collection: "userWords" }
);

UserWordsSchema.index({ wordId: 1, userId: 1 }, { unique: true });

addMethods(UserWordsSchema);

const model = mongoose.model("UserWords", UserWordsSchema);

export default model;
