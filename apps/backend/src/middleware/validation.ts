import { Request, Response, NextFunction } from "express";
import { Schema } from "joi";
import { ApiResponseUtil } from "../utils/apiResponse";

type RequestSource = "body" | "params" | "query";

export const validateRequest = (
  schema: Schema,
  source: RequestSource = "body"
) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error, value } = schema.validate(req[source], { abortEarly: false });

    if (error) {
      const errorMessage = error.details.map((detail) => detail.message).join(", ");
      ApiResponseUtil.validationError(res, "Validation failed", errorMessage);
      return;
    }

    if (source === "body") {
      req.body = value;
    } else if (source === "params") {
      req.params = value;
    }

    next();
  };
};
