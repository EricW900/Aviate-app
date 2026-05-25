import { aircraftModelService } from "../services/aircraftModelService";
import { Request, Response, NextFunction, response } from "express";
import { AuthenticatedRequest } from "../middleware/auth";
import { ApiResponseUtil } from "../utils/apiResponse";

export class aircraftModelController {
    static async create(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
            const result = await aircraftModelService.create(req.body, req.user);

            ApiResponseUtil.success(
                res,
                "Aircraft model created successfully",
                result,
                201
            );
        } catch (error) {
            next(error);
        }
    }

    static async bulkGet(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
            const result = await aircraftModelService.bulkGet(req.body, req.user);

            ApiResponseUtil.success(
                res,
                "Aircraft model found",
                result,
                201
            )
        } catch (error) {
            next(error);
        }
    }

    static async list(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
            const result = await aircraftModelService.list(req.body, req.user);

            ApiResponseUtil.success(
                res,
                "Aircraft models list found",
                result,
                201
            )
        } catch (error) {
            next (error);
        }
    }

    static async edit(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
            const result = await aircraftModelService.edit(req.body, req.user);

            ApiResponseUtil.success(
                res,
                "Aircraft edited",
                result,
                201
            )
        } catch (error) {
            next(error);
        }
    }
}