import Joi from "joi";

export const createAirportSchema = Joi.object({
    name: Joi.string().uppercase().required(),
    icaoCode: Joi.string().uppercase().length(4).pattern(/^[A-Z]{4}$/).required(),
    iataCode: Joi.string().uppercase().length(3).pattern(/^[A-Z]{3}$/).required(),
    city: Joi.string().uppercase().required(),
    country: Joi.string().uppercase().required(),
})

export const editAirportSchema = Joi.object({
    airportId: Joi.string().required(),
    name: Joi.string().uppercase().required(),
    icaoCode: Joi.string().uppercase().length(4).pattern(/^[A-Z]{4}$/).required(),
    iataCode: Joi.string().uppercase().length(3).pattern(/^[A-Z]{3}$/).required(),
    city: Joi.string().uppercase().required(),
    country: Joi.string().uppercase().required(),
})

export const getAirportSchema = Joi.object({
    icaoCode: Joi.string().uppercase().length(4).pattern(/^[A-Z]{4}$/).required(),
})