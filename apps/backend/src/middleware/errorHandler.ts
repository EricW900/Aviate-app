import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/errors";
import { ApiResponseUtil } from "../utils/apiResponse";
import { Prisma } from "@prisma/client";

export const errorHandler = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  if (error instanceof AppError) {
    ApiResponseUtil.error(res, error.message, undefined, error.statusCode);
    return;
  }

  // Handle Prisma errors
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2002") {
      ApiResponseUtil.conflict(res, "Resource already exists");
      return;
    }

    if (error.code === "P2025") {
      ApiResponseUtil.notFound(res, "Resource not found");
      return;
    }
  }

  // Handle validation errors
  if (error.name === "ValidationError") {
    ApiResponseUtil.validationError(res, error.message);
    return;
  }

  // Log unexpected errors
  console.error("Unexpected error:", error);

  ApiResponseUtil.error(
    res,
    "Internal server error",
    process.env.NODE_ENV === "development" ? error.message : undefined
  );
};
