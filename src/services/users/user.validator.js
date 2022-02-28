const Joi = require('joi');
const { joiPassword } = require('joi-password');


const userCreateValidator = Joi.object({
    userName: Joi.string().min(2).max(30).required(),
    firstName: Joi.string().min(2).max(30).required(),
    lastName: Joi.string().min(2).max(30).required(),
    balance: Joi.number().greater(0).precision(2).required(),
    mail: Joi.string().email().required(),
    password: joiPassword
        .string()
        .noWhiteSpaces()
        .min(8)
        .minOfLowercase(1)
        .minOfNumeric(1)
        .minOfUppercase(1)
        .required(),
    // .minOfSpecialCharacters(1)

})


const userUpdateValidator = Joi.object({
    userName: Joi.string().min(2).max(30).required(),
    firstName: Joi.string().min(2).max(30).required(),
    balance: Joi.number().greater(0).precision(2).required(),
    lastName: Joi.string().min(2).max(30).required(),
    mail: Joi.string().email().required(),
})

const userUpdatePasswordValidator = Joi.object({
    oldPassword: joiPassword
        .string()
        .noWhiteSpaces()
        .min(8)
        .minOfLowercase(1)
        .minOfNumeric(1)
        .minOfUppercase(1)
        .required(),
    
    newPassword: joiPassword
        .string()
        .noWhiteSpaces()
        .min(8)
        .minOfLowercase(1)
        .minOfNumeric(1)
        .minOfUppercase(1)
        .required(),
    
})


module.exports = { userCreateValidator, userUpdateValidator , userUpdatePasswordValidator };