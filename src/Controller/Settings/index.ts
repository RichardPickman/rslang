import Settings from "../../Models/Settings";
import errors from "../../Errors/appErrors";

export const get = async (userId: string) => {
    const setting = await Settings.findOne({ userId });
    if (!setting) {
        throw new errors.NOT_FOUND_ERROR("Cannot find setting");
    }

    return setting;
};

export const upsert = async (userId: string, setting: Record<string, unknown>) =>
    Settings.findOneAndUpdate({ userId }, { $set: setting }, { upsert: true, new: true });

export const remove = async (userId: string) => Settings.deleteOne({ userId });
