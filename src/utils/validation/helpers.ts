import Joi from 'joi';
const objIdPattern = /^[0-9a-fA-F]{24}$/;

interface ExtendedIdSchema extends Joi.ObjectSchema {
  ObjectId(): this;
}

const isValid = function(value: string) {
  return (
    Boolean(value) && !Array.isArray(value) && objIdPattern.test(String(value))
  );
};

export const ObjectId: ExtendedIdSchema = Joi.extend(joi => {
  return {
    type: 'objectId',
    messages: {
      invalid: 'It must have a valid ObjectId.'
    },
    validate(value, { error }) {
      if (!isValid(value)) {
        return { value, errors: error('invalid') };
      }
    }
  };
});
