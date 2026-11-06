import Joi from "joi";
import { AircraftStatus } from "@prisma/client";

export const createAircraftSchema = Joi.object({
    prefix: Joi.string().min(3).max(10).required(),
    modelId: Joi.string().required(),
    capacity: Joi.number().positive().required(),
    rangeKm: Joi.number().positive().required(),
})

export const editAircraftSchema = Joi.object({
    aircraftId: Joi.string().required(),
    prefix: Joi.string().min(3).max(10).required(),
    modelId: Joi.string().required(),
    capacity: Joi.number().positive().required(),
    rangeKm: Joi.number().positive().required(),
    status: Joi.string().valid(...Object.values(AircraftStatus)).required(),
})

export const getAircraftSchema = Joi.object({
    aircraftIds: Joi.array().items(Joi.string().required()).min(1).unique().required(),
})
