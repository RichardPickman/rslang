import Token from "../../Models/Token";
import errors from "../../Errors/appErrors";

export const get = async (userId: string, tokenId?: string) => {
    const token = await Token.findOne({ userId, tokenId });
    if (!token) {
        throw new errors.AUTHENTICATION_ERROR("Token is not found!");
    }

    return token;
};

export const upsert = async (token: Record<string, unknown>) =>
    Token.findOneAndUpdate({ userId: token.userId }, { $set: token }, { upsert: true, new: true });
