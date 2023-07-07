import Joi from "joi";

export const registerSchema = Joi.object({
    username: Joi.string().required().regex(/^[a-z0-9_.]+$/),
    password: Joi.string().required(),
    email: Joi.string().email().required(),
    name: Joi.string().required(),
});

export const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});