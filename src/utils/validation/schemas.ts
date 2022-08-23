import Joi, { CustomHelpers } from 'joi';
import joiObjectIdExtension from 'object-id-joi-extension';
import settings from '../../common/config';

const custom = Joi.extend(joiObjectIdExtension);

const optionalScheme = Joi.object()
  .max(settings.MAX_OPTIONAL_PROPERTIES)
  .pattern(/.*/, [
    Joi.string(),
    Joi.number(),
    Joi.boolean(),
    Joi.date(),
    Joi.object()
  ])
  .custom(optionalValidator, 'optional object validation');

const schemas = {
  id: Joi.object({ id: custom.objectId() }),
  wordId: Joi.object({ id: custom.objectId(), wordId: custom.objectId() }),
  user: Joi.object()
    .options({ abortEarly: false, allowUnknown: true })
    .keys({
      name: Joi.string().max(200),
      email: Joi.string().email({ tlds: { allow: false } }),
      password: Joi.string().min(settings.MIN_PASSWORD_LENGTH)
    }),
  userWord: Joi.object()
    .options({ abortEarly: false, allowUnknown: false })
    .keys({
      difficulty: Joi.string().max(50),
      optional: optionalScheme
    }),
  statistics: Joi.object()
    .options({ abortEarly: false, allowUnknown: false })
    .keys({
      learnedWords: Joi.number()
        .integer()
        .min(0)
        .max(100000),
      optional: optionalScheme
    }),
  settings: Joi.object()
    .options({ abortEarly: false, allowUnknown: false })
    .keys({
      wordsPerDay: Joi.number()
        .integer()
        .min(1)
        .max(1000),
      optional: optionalScheme
    })
};

function optionalValidator(
  value: Record<string, unknown>,
  helpers: CustomHelpers
) {
  if (JSON.stringify(value).length > settings.MAX_SYMBOLS_PER_OBJECT) {
    return helpers.error('object.length');
  }

  return value;
}

export default schemas;
