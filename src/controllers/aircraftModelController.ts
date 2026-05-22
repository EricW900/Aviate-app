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
                response,
                "Aircraft model found",
                result,
                201
            )
        } catch (error) {
            next(error);
        }
    }
}