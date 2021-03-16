const Joi = require("@hapi/joi");

//Register Validation
const studentRegisterValid = data => {
    const schema = Joi.object({
        name: Joi.string().min(5).required(),
        email: Joi.string().min(6).required().email(),
        username: Joi.string().min(5).required(),
        password: Joi.string().min(6).required(),
        contact: Joi.string().length(10).pattern(/^\d+$/).required(),
        section: Joi.string().required(),
        semester: Joi.string().required(),
        branch: Joi.string().required(),
        enrollment: Joi.string().required()
    });
    return schema.validate(data);
};

//Login Validation
const studentLoginValid = data => {
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()

    });
    return schema.validate(data);
};


module.exports.studentRegisterValid = studentRegisterValid;
module.exports.studentLoginValid = studentLoginValid;