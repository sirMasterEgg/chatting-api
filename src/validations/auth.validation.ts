import Joi from "joi";

const authSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
    email: Joi.string().email().required(),
    name: Joi.string().required(),
});

export default authSchema;