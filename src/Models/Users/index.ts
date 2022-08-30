import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import addMethods from '../../utils/toResponse';
import { User as UserDocument } from '../../Types/Models';

interface UserModel extends mongoose.Model<UserDocument> {}

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8
    }
  },
  { collection: 'users' }
);

userSchema.pre('save', async function preSave(this: UserDocument, next) {
  this.password = await bcrypt.hash(this.password as string, 10);

  next();
});

// userSchema.pre('findOneAndUpdate', async function(this: UserDocument, next) {
//   const password = await bcrypt.hash(this.password as string, 10);

//   next();
// });

addMethods(userSchema);

const User = mongoose.model<UserDocument, UserModel>('users', userSchema);

export default User;
