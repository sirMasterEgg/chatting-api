import Joi from "joi";

export const addFriendSchema = Joi.object({
    targetEmail: Joi.string().email(),
    targetUsername: Joi.string().regex(/^[a-z0-9_.]+$/),
});