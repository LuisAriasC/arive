/* External dependencies */
import * as Joi from '@hapi/joi';

export default Joi.object({
  VAULT_KEY: Joi.required(),
  NODE_ENV: Joi.required(),
});
