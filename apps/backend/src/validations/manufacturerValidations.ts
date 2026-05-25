import Joi from "joi";

export const createManufacturerSchema = Joi.object({
    name: Joi.string().uppercase().required().min(2).max(100).messages({
        "string.name": "Please provide a valid manufacturer name",
    }),
})

export const editManufacturerSchema = Joi.object({
    manufacturerId: Joi.string().required(),
    name: Joi.string().uppercase().required().min(2).max(100),
    active: Joi.boolean(),
})

export const listManufacturerSchema = Joi.object({

})