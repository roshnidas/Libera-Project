const { Joi } = require("celebrate");

// team schema to validate request body structure
const team = {
    body: {
        name: Joi.string().required(),
        meanAlignment: Joi.string().valid('GOOD', 'BAD', 'NEUTRAL')
    }
};

module.exports = team;