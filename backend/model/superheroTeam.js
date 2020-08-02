const { Joi } = require("celebrate");

// superheroTeam schema to validate request body structure
const superheroTeam = {
    body: {
        superheroName: Joi.string().required(),
        teamName: Joi.string().required()
    }
};

module.exports = superheroTeam;