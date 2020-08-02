const { Joi } = require("celebrate");

// superhero schema to validate request body structure
const superhero = {
    body: {
        name: Joi.string().required(),
        alignment: Joi.string().valid('GOOD', 'BAD', 'NEUTRAL').required()
    }
};

module.exports = superhero;