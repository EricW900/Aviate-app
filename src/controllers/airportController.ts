import { Request, Response, NextFunction, response } from "express";
import { AuthenticatedRequest } from "../middleware/auth";
import { ApiResponseUtil } from "../utils/apiResponse";
import { airportService } from "../services/airportService";

export class airportController {
    static async create(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
            const result = await airportService.create(req.body, req.user);

            ApiResponseUtil.success(
                res,
                "Airport created successfully",
                result,
                201
            );
        } catch (error) {
            next(error);
        }
    }

    static async edit(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
            const result = await airportService.edit(req.body, req.user);

            ApiResponseUtil.success(
                res,
                "Airport edited successfully",
                result,
                201
            );
        } catch (error) {
            next(error);
        }
    }

    static async get(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
            const result = await airportService.get(req.body, req.user);

            ApiResponseUtil.success(
                res,
                "Airport get successfully",
                result,
                201
            );
        } catch (error) {
            next(error);
        }
    }
}