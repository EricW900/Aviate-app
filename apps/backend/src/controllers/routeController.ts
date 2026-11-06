import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../middleware/auth";
import { ApiResponseUtil } from "../utils/apiResponse";
import { routeService } from "../services/routeService";

export class routeController {
    static async create(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
            const result = await routeService.create(req.body);

            ApiResponseUtil.success(
                res,
                "Route created successfully",
                result,
                201
            );
        } catch (error) {
            next(error);
        }
    }

    static async edit(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
            const result = await routeService.edit(req.body);

            ApiResponseUtil.success(
                res,
                "Route edited successfully",
                result
            );
        } catch (error) {
            next(error);
        }
    }

    static async get(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
            const result = await routeService.get({ routeId: req.params.routeId });

            ApiResponseUtil.success(
                res,
                "Route found successfully",
                result
            );
        } catch (error) {
            next(error);
        }
    }

    static async list(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
            const result = await routeService.list();

            ApiResponseUtil.success(
                res,
                "Routes found successfully",
                result
            );
        } catch (error) {
            next(error);
        }
    }
}
