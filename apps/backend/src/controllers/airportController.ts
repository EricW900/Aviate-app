import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../middleware/auth";
import { ApiResponseUtil } from "../utils/apiResponse";
import { airportService } from "../services/airportService";

export class airportController {
    static async create(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
            const result = await airportService.create(req.body);

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
            const result = await airportService.edit(req.body);

            ApiResponseUtil.success(
                res,
                "Airport edited successfully",
                result
            );
        } catch (error) {
            next(error);
        }
    }

    static async get(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
            const result = await airportService.get({ icaoCode: req.params.icaoCode });

            ApiResponseUtil.success(
                res,
                "Airport get successfully",
                result
            );
        } catch (error) {
            next(error);
        }
    }

    static async list(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
            const result = await airportService.list();

            ApiResponseUtil.success(
                res,
                "Airport list successfully",
                result
            );

        } catch (error) {
            next(error);
        }
    }
}
