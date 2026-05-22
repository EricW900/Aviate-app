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
    prefix: Joi.string().min(3).max(10),
    modelId: Joi.string().required(),
    capacity: Joi.number().positive().required(),
    rangeKm: Joi.number().positive().required(),
    status: Joi.string().valid(...Object.values(AircraftStatus)),
})

export const getAircraftSchema = Joi.object({
    ids: Joi.array().items(Joi.string().required()).required(),
})

export const listAircraftSchema = Joi.object({

})

//// Not necessary in this case because there's no delete, only status "DEACTIVATED"
// export const deleteAircraftSchema = Joi.object({
//     aircraftId: Joi.string().required(),
// })