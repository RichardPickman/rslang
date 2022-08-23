import { Schema } from 'mongoose';
import { User } from '../Types/Models';

const addMethods = <T>(schema: Schema<T>) => {
  schema.method('toResponse', function() {
    const { _id, ...rest }: Partial<User> = this.toJSON();
    delete rest.password;
    delete rest.__v;
    delete rest.userId;
    return { id: _id, ...rest };
  });
};

export default addMethods;
