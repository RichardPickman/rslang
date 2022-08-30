import User from '../../Models/Users';
import { TypedError } from '../../Types';

export const getUserByEmail = async (email: string) => {
  const user = await User.findOne({ email });
  if (!user) {
    return null;
  }

  return user;
};

export const get = async (id: string) => {
  const user = await User.findOne({ _id: id });
  if (!user) {
    return null;
  }

  return user;
};

export const save = async (user: Record<string, unknown>) => {
  try {
    const userEnt = await User.create(user);

    return userEnt;
  } catch (err) {
    return null;
  }
};

export const update = async (id: string, user: Record<string, unknown>) =>
  User.findOneAndUpdate({ _id: id }, { $set: user }, { new: true });

export const remove = async (id: string) => User.deleteOne({ _id: id });
