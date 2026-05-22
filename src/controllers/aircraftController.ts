import { Request, Response, NextFunction } from "express";
import { AircraftService } from "../services/aircraftService";
import { ApiResponseUtil } from "../utils/apiResponse";
import { AuthenticatedRequest } from "../middleware/auth";

export class AircraftController {
    static async create(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
            console.log(req.user);
            const result = await AircraftService.create(req.body, req.user);

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
            const result = await AircraftService.edit(req.body, req.user);

            ApiResponseUtil.success(
                res,
                "Aircraft edited successfully",
                result,
                201
            );
        } catch (error) {
            next (error);
        }
    }

    static async bulkGet(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
            const { aircraftIds } = req.body;

            const result = await AircraftService.bulkGet(aircraftIds, req.user);

            ApiResponseUtil.success(
                res,
                "Aircrafts found sucessfully",
                result,
                201,
            );
        } catch (error) {
            next (error);
        }
    }

    static async list(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
            const result = await AircraftService.list(req.body, req.user);

            ApiResponseUtil.success(
                res,
                "Aircrafts list found sucessfully",
                result,
                201,
            );
        } catch (error) {
            next (error);
        }
    }

    // Not necessary in this case because there's no delete, only status "DEACTIVATED"
    // static async delete(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    //     try {
    //         const result = await AircraftService.delete(req.body, req.user);

    //         ApiResponseUtil.success(
    //             res,
    //             "Aircraft deleted successfully",
    //             result,
    //             201,
    //         );
    //     } catch (error) {
    //         next (error);
    //     }
    // }
}