import prisma from "../config/database";
import { createAircraftRequest, editAircraftRequest, getAircraftRequest } from "../types/aircraft";
import { ConflictError, NotFoundError } from "../utils/errors";

export class AircraftService {
    static async create(data: createAircraftRequest) {
        const model = await prisma.aircraftModel.findUnique({
            where: { id: data.modelId },
        });

        if (!model) {
            throw new NotFoundError("Aircraft model not found");
        }

        // verifying duplicated prefix
        const existing = await prisma.aircraft.findUnique({
            where: { prefix: data.prefix },
        });

        if (existing) {
            throw new ConflictError("Aircraft with this prefix already exists")
        }

        const aircraft = await prisma.aircraft.create({
            data: {
                prefix: data.prefix,
                modelId: data.modelId,
                capacity: data.capacity,
                rangeKm: data.rangeKm,
                status: "ACTIVE",
            }
        });

        return aircraft;
    }

    static async edit(data: editAircraftRequest) {
        if (!data.aircraftId) {
            throw new NotFoundError("Aircraft Id not sent!");
        }

        if (!data.modelId) {
            throw new NotFoundError("Aircraft model not found");
        }

        const aircraft = await prisma.aircraft.findUnique({
            where: { id: data.aircraftId }
        });

        if (!aircraft) {
            throw new NotFoundError("Aircraft not found");
        }

        const model = await prisma.aircraftModel.findUnique({
            where: { id: data.modelId }
        });

        if (!model) {
            throw new NotFoundError("Aircraft model not found");
        }

        const editedAircraft = await prisma.aircraft.update({
            where: { id: data.aircraftId },
            data: {
                modelId: data.modelId,
                prefix: data.prefix,
                capacity: data.capacity,
                rangeKm: data.rangeKm,
                status: data.status,
            }
        });

        return editedAircraft;
    }

    static async bulkGet(data: getAircraftRequest) {
        const aircrafts = await prisma.aircraft.findMany({
            where: {
                id: {
                    in: data.aircraftIds,
                }
            }
        });

        if (aircrafts.length !== data.aircraftIds.length) {
            throw new NotFoundError("One or more aircraft not found");
        }

        return aircrafts;
    }

    static async list() {
        return prisma.aircraft.findMany({
                select: {
                    id: true,
                    prefix: true,
                    capacity: true,
                    rangeKm: true,
                    status: true,
                    modelId: true,

                    model: {
                        select: {
                            name: true,

                            manufacturer: {
                                select: {
                                    name: true
                                }
                            }
                        }
                    }
                }
        });
    }
}
