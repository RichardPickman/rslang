import Word from "../../Models/Words";
import errors from "../../Errors/appErrors";
const ENTITY_NAME = "word";

export const getAll = async (conditions: Record<string, unknown>) => {
    const { group, page } = conditions;

    return Word.find({ group, page });
};

export const get = async (id: string) => {
    const word = await Word.findOne({ _id: id });
    if (!word) {
        throw new errors.NOT_FOUND_ERROR(ENTITY_NAME, { id });
    }
    return word;
};
