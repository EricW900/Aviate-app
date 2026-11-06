import Joi from "joi";
import { role_type } from "@prisma/client";

export const registerSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Please provide a valid email address",
    "any.required": "Email is required",
  }),
  password: Joi.string().min(8).required().messages({
    "string.min": "Password must be at least 8 characters long",
    "any.required": "Password is required",
  }),
  firstName: Joi.string().optional().allow(""),
  lastName: Joi.string().optional().allow(""),
});

export const createUserSchema = registerSchema.keys({
  role: Joi.string()
    .valid(...Object.values(role_type))
    .required()
    .messages({
      "any.only": "Role is invalid",
      "any.required": "Role is required",
    }),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Please provide a valid email address",
    "any.required": "Email is required",
  }),
  password: Joi.string().required().messages({
    "any.required": "Password is required",
  }),
});

export const editUserSchema = Joi.object({
  email: Joi.string().email(),
  firstName: Joi.string().allow(""),
  lastName: Joi.string().allow(""),
  role: Joi.string().valid(...Object.values(role_type)),
}).min(1);
