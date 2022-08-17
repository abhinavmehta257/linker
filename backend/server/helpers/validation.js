const Joi = require('@hapi/joi');

const registerValidation = data =>{
const schema = Joi.object({
    name: Joi.string().min(3),
    userName: Joi.string().min(3).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
});
return schema.validate(data);
};

const loginValidation = data =>{
    const schema = Joi.object({
        userName: Joi.string().min(3).required(),
        password: Joi.string().min(6).required(),
    });
    return schema.validate(data);
}

module.exports.loginValidation = loginValidation;
module.exports.registerValidation = registerValidation;