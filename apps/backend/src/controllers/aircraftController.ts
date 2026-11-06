import { Response, NextFunction } from "express";
import { AircraftService } from "../services/aircraftService";
import { ApiResponseUtil } from "../utils/apiResponse";
import { AuthenticatedRequest } from "../middleware/auth";

export class AircraftController {
    static async create(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
            const result = await AircraftService.create(req.body);

            ApiResponseUtil.success(
                res,
                "Aircraft created successfully",
                result,
                201
            );
        } catch (error) {
            next(error);
        }
    }

    static async edit(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
            const result = await AircraftService.edit(req.body);

            ApiResponseUtil.success(
                res,
                "Aircraft edited successfully",
                result,
            );
        } catch (error) {
            next (error);
        }
    }

    static async bulkGet(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
            const result = await AircraftService.bulkGet(req.body);

            ApiResponseUtil.success(
                res,
                "Aircrafts found sucessfully",
                result,
            );
        } catch (error) {
            next (error);
        }
    }

    static async list(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
            const result = await AircraftService.list();

            ApiResponseUtil.success(
                res,
                "Aircrafts list found sucessfully",
                result,
            );
        } catch (error) {
            next (error);
        }
    }

}
