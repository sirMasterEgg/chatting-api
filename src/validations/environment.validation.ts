import Joi from "joi";

const environmentSchema = Joi.object({
    MONGODB_DATABASE_URL: Joi.string().required(),
    MYSQL_DATABASE_URL: Joi.string().required(),
    ACCESS_TOKEN_SECRET: Joi.string().required(),
    REFRESH_TOKEN_SECRET: Joi.string().required(),
    ACCESS_TOKEN_TTL: Joi.string().required(),
    REFRESH_TOKEN_TTL: Joi.string().required(),
    COOKIE_TTL: Joi.string().required(),
    COOKIE_SECRET: Joi.string().required(),
}).unknown();

export default environmentSchema;