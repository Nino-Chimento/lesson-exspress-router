import Joi from "joi";
export const planetSchema = Joi.object({
    id: Joi.number().integer().required(),
    name: Joi.string().required(),
});
export const planetNameSchema = Joi.object({
    name: Joi.string().required().max(10),
});
