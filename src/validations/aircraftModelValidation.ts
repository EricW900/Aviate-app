import Joi from "joi";

export const createAircraftModelSchema = Joi.object({
    name: Joi.string().uppercase().required().min(2).max(100).messages({
        "string.name": "Please provide a valid aircraft name",
    }),
    manufacturerId: Joi.string().required(),
})

export const getAircraftModelSchema = Joi.object({
    ids: Joi.array().items(Joi.string().required()).required(),
})

export const listAircraftModelSchema = Joi.object({

})