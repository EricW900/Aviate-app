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

export const editAircraftModelSchema = Joi.object({
    aircraftModelId: Joi.string()
        .required()
        .messages({
            'string.base': 'Aircraft model ID must be a string.',
            'any.required': 'Aircraft model ID is required.'
        }),

    aircraftModelName: Joi.string()
        .required()
        .uppercase()
        .min(1)
        .messages({
            'string.base': 'Aircraft model name must be a string.',
            'string.empty': 'Aircraft model name cannot be empty.',
            'string.min': 'Aircraft model name must contain at least 1 character.',
            'string.uppercase': 'Aircraft model name must be in uppercase.',
            'any.required': 'Aircraft model name is required.'
        }),

    manufacturerId: Joi.string()
        .required()
        .messages({
            'string.base': 'Manufacturer ID must be a string.',
            'any.required': 'Manufacturer ID is required.'
        })
})