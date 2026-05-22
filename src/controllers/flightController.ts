import { Request, Response, NextFunction, response } from "express";
import { AuthenticatedRequest } from "../middleware/auth";
import { ApiResponseUtil } from "../utils/apiResponse";
import { flightService } from "../services/flightService";

export class flightController {
    static async create(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
            const result = await flightService.create(req.body, req.user);

            ApiResponseUtil.success(
                res,
                "Flight created successfully",
                result,
                201
            );
        } catch (error) {
            next(error);
        }
    }

    static async get(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
            const result = await flightService.get(req.body, req.user);

            ApiResponseUtil.success(
                res,
                "Flight getted successfully",
                result,
                201
            );
        } catch (error) {
            next(error);
        }
    }

    static async bulkGet(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
            const flightsIds = req.body;
            const result = await flightService.bulkGet(flightsIds, req.user);

            ApiResponseUtil.success(
                res,
                "Flights getted successfully",
                result,
                201
            );
        } catch (error) {
            next(error);
        }
    }

    static async flights(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
            const result = await flightService.flights(req.body, req.user);

            ApiResponseUtil.success(
                res,
                "All flights getted successfully",
                result,
                201
            );
        } catch (error) {
            next(error);
        }
    }

    static async edit(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
            const result = await flightService.edit(req.body, req.user);

            ApiResponseUtil.success(
                res,
                "Flight edited successfully",
                result,
                201
            );
        } catch (error) {
            next(error);
        }
    }

    static async createCrew(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
            const result = await flightService.createCrew(req.body, req.user);

            ApiResponseUtil.success(
                res,
                "Crew created successfully",
                result,
                201
            );
        } catch (error) {
            next(error);
        }
    }

    static async getCrew(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
            const result = await flightService.getCrew(req.body, req.user);

            ApiResponseUtil.success(
                res,
                "Crew getted successfully",
                result,
                201
            );
        } catch (error) {
            next(error);
        }
    }

    static async editCrew(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
            const result = await flightService.editCrew(req.body, req.user);

            ApiResponseUtil.success(
                res,
                "Crew edited successfully",
                result,
                201
            );
        } catch (error) {
            next(error);
        }
    }
}