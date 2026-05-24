import prisma from "../config/database";
import { ConflictError, NotFoundError, ValidationError } from "../utils/errors";
import { createAircraftModelRequest, editAircraftModelRequest, getAircraftModelRequest, listAircraftModelRequest } from "../types/aircraftModel";

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

    static async list(req: listAircraftModelRequest, user: any) {
        const aircraftsModelsList = await prisma.aircraftModel.findMany({
            select: {
                id: true,
                name: true,
                manufacturer: true,
            }
        });

        if (aircraftsModelsList.length == 0) {
            throw new NotFoundError("One or more aicraft models not found");
        }

        return aircraftsModelsList;
    }

    static async edit(req: editAircraftModelRequest, user: any) {
        const aircraftModelExists = await prisma.aircraftModel.findFirst({
            where: {
                id: req.aircraftModelId
            }
        });

        if (!aircraftModelExists) {
            throw new NotFoundError("Aircraft Model Doesn't exists");
        }

        const manufacturerExists = await prisma.manufacturer.findFirst({
            where: {
                id: req.manufacturerId
            }
        });

        if (!manufacturerExists) {
            throw new NotFoundError("Manufacturer doesn't exists");
        }

        const aircraftModelUpdate = await prisma.aircraftModel.update({
            where: {
                id: req.aircraftModelId
            }, data: {
                name: req.aircraftModelName,
                manufacturerId: req.manufacturerId
            }
        });

        return aircraftModelUpdate;
    }
}
