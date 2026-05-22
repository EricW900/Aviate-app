import prisma from "../config/database";
import { ConflictError, NotFoundError, ValidationError } from "../utils/errors";
import { createAircraftModelRequest, getAircraftModelRequest } from "../types/aircraftModel";

export class aircraftModelService {
    static async create(req: createAircraftModelRequest, user: any) {
        req.name = req.name.toUpperCase();

        const existing = await prisma.aircraftModel.findFirst({
            where: {
                name: req.name,
            }
        });

        if (existing) {
            throw new ConflictError("Aircraft model already exists")
        }

        const manufacturerExists = await prisma.manufacturer.findUnique({
            where: {
                id: req.manufacturerId,
            }
        });

        if (!manufacturerExists) {
            throw new NotFoundError("Manufacturer not found");
        }

        const aircraftModel = await prisma.aircraftModel.create({
            data: {
                name: req.name,
                manufacturerId: req.manufacturerId,
            }
        });

        return aircraftModel;
    }

    static async bulkGet(req: getAircraftModelRequest, user: any) {
        const aircraft = await prisma.aircraftModel.findMany({
            where: {
                id: {
                    in: req.aircraftId,
                }
            }
        });

        if (aircraft.length !== req.aircraftId.length) {
            throw new NotFoundError("One or more aircraft models not found");
        }

        return aircraft;
    }
}
