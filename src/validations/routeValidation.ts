import Joi from "joi";
import { join } from "path";

export const createRouteSchema = Joi.object({
    originId: Joi.string().required(),
    destinationId: Joi.string().required().invalid(Joi.ref('originId')).messages({
        'any.invalid': 'destinationId must be different from originId'
    }),
    distanceKm: Joi.number().required(),
    estimatedTime: Joi.number().required()
})

export const editRouteSchema = Joi.object({
    routeId: Joi.string().required(),
    originId: Joi.string(),
    destinationId: Joi.string().invalid(Joi.ref('originId')).messages({
        'any.invalid': 'destinationId must be different from originId'
    }),
    distanceKm: Joi.number().required(),
    estimatedTime: Joi.number().required()
})

export const getRouteSchema = Joi.object({
    routeId: Joi.string().required(),
})

export const listRouteSchema = Joi.object({

})