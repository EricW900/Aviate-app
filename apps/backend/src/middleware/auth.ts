import { Request, Response, NextFunction } from "express";
import { JwtUtil } from "../utils/jwt";
import { ApiResponseUtil } from "../utils/apiResponse";
import { AuthenticationError } from "../utils/errors";
import { role_type } from "@prisma/client";
import prisma from "../config/database";

export interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
    email: string;
    role: role_type;
    isActive: boolean;
  };
}

export const authenticate = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new AuthenticationError("Access token is required");
    }

    const token = authHeader.substring(7);
    const decoded = JwtUtil.verifyToken(token);

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        role: true,
        isActive: true,
      },
    });

    if (!user || !user.isActive) {
      throw new AuthenticationError("User is inactive or no longer exists");
    }

    req.user = {
      userId: user.id,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
    };

    next();
  } catch (error) {
    if (error instanceof AuthenticationError) {
      ApiResponseUtil.unauthorized(res, error.message);
      return;
    }
    ApiResponseUtil.unauthorized(res, "Invalid or expired token");
  }
};

export const authorize = (...allowedRoles: role_type[]) => {
  return (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): void => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      ApiResponseUtil.forbidden(res, "You do not have permission for this action");
      return;
    }

    next();
  };
};
