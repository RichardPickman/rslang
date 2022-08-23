import User from "../../Models/Users";
import error from "../../Errors/appErrors";
import { TypedError } from "../../Types";

const ENTITY_NAME = "user";
const MONGO_ENTITY_EXISTS_ERROR_CODE = 11000;

export const getUserByEmail = async (email: string) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new error.NOT_FOUND_ERROR(ENTITY_NAME, { email });
    }

    return user;
};

export const get = async (id: string) => {
    const user = await User.findOne({ _id: id });
    if (!user) {
        throw new error.NOT_FOUND_ERROR(ENTITY_NAME, { id });
    }

    return user;
};

export const save = async (user: Record<string, unknown>) => {
    try {
        return await User.create(user);
    } catch (err) {
        if (err instanceof Error) {
            if ((err as TypedError).code === MONGO_ENTITY_EXISTS_ERROR_CODE) {
                throw new error.ENTITY_EXISTS(`${ENTITY_NAME} with this e-mail exists`);
            } else {
                throw err;
            }
        }
    }
};

export const update = async (id: string, user: Record<string, unknown>) =>
    User.findOneAndUpdate({ _id: id }, { $set: user }, { new: true });

export const remove = async (id: string) => User.deleteOne({ _id: id });
