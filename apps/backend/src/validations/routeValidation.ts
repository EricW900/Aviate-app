import Joi from "joi";

export const createRouteSchema = Joi.object({
    originId: Joi.string().required(),
    destinationId: Joi.string().required().invalid(Joi.ref('originId')).messages({
        'any.invalid': 'destinationId must be different from originId'
    }),
    distanceKm: Joi.number().positive().required(),
    estimatedTime: Joi.number().positive().required()
})

export const editRouteSchema = Joi.object({
    routeId: Joi.string().required(),
    originId: Joi.string().required(),
    destinationId: Joi.string().required().invalid(Joi.ref('originId')).messages({
        'any.invalid': 'destinationId must be different from originId'
    }),
    distanceKm: Joi.number().positive().required(),
    estimatedTime: Joi.number().positive().required()
})

export const getRouteSchema = Joi.object({
    routeId: Joi.string().required(),
})
