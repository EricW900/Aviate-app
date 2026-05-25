import Joi from "joi";
import { CrewRole, FlightStatus } from "@prisma/client";

export const createFlightSchema = Joi.object({
    flightNumber: Joi.number().required(),
    routeId: Joi.string().required(),
    aircraftId: Joi.string().required(),
    departureTime: Joi.date().required(),
    arrivalTime: Joi.date().required(),
    status: Joi.string().valid(...Object.values(FlightStatus)),
});

export const getFlightSchema = Joi.object({
    flightId: Joi.string().required(),
});

export const bulkGetFlightSchema = Joi.object({
    flightIds: Joi.array().items(Joi.string().required()).required()
});

export const flightsSchema = Joi.object({

})

export const editFlightSchema = Joi.object({
    flightId: Joi.string().required(),
    flightNumber: Joi.number().required(),
    routeId: Joi.string().required(),
    aircraftId: Joi.string().required(),
    departureTime: Joi.date().required(),
    arrivalTime: Joi.date().required(),
    status: Joi.string().valid(...Object.values(FlightStatus)),
})

export const createCrewSchema = Joi.object({
    flightId: Joi.string().required(),
    userId: Joi.string().required(),
    role: Joi.string().valid(...Object.values(CrewRole)).required(),
})

export const getCrewSChema = Joi.object({
    flightId: Joi.string().required(),
})

export const editCrewSchema = Joi.object({
    flightId: Joi.string().required(),
    crewId: Joi.string().required(),
    userId: Joi.string().required(),
    role: Joi.string()
        .valid(...Object.values(CrewRole))
        .required()
});