import Statistics from "../../Models/Statistics";
import errors from "../../Errors/appErrors";

export const get = async (userId: string) => {
    const statistic = await Statistics.findOne({ userId });
    if (!statistic) {
        throw new errors.NOT_FOUND_ERROR("statistic", `userId: ${userId}`);
    }

    return statistic;
};

export const upsert = async (userId: string, statistic: Record<string, unknown>) =>
    Statistics.findOneAndUpdate({ userId }, { $set: statistic }, { upsert: true, new: true });

export const remove = async (userId: string) => Statistics.deleteOne({ userId });
