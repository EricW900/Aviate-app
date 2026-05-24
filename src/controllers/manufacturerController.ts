import { Request, Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../middleware/auth";
import { manufacturerService } from "../services/manufacturerService";
import { ApiResponseUtil } from "../utils/apiResponse";

export class manufacturerController {
    static async create(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
            const result = await manufacturerService.create(req.body, req.user);

            ApiResponseUtil.success(
                res,
                "Manufacturer created successfully",
                result,
                201
            );
        } catch (error) {
            next(error);
        }
    }

    static async edit(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
            const result = await manufacturerService.edit(req.body, req.user);

            ApiResponseUtil.success(
                res,
                "Manufacturer edited successfully",
                result,
                201
            );
        } catch (error) {
            next(error);
        }
    }

    static async list(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
            const result = await manufacturerService.list(req.body, req.user);

            ApiResponseUtil.success(
                res,
                "Manufacturer list found successfully",
                result,
                201
            );
        } catch (error) {
            next(error);
        }
    }
}