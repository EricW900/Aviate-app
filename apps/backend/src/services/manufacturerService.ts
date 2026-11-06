import prisma from "../config/database";
import { ConflictError, NotFoundError } from "../utils/errors";
import { createManufacturerRequest, editManufacturerRequest } from "../types/manufacturer";

export class manufacturerService {
    static async create(req: createManufacturerRequest) {
        const name = req.name.toUpperCase();

        const existing = await prisma.manufacturer.findFirst({
            where: {
                name,
            }
        });

        if (existing) {
            throw new ConflictError("This manufacturer already exists");
        }

        const manufacturer = await prisma.manufacturer.create({
            data: {
                name,
            }
        });

        return manufacturer;
    }

    static async edit(req: editManufacturerRequest) {
        const existing = await prisma.manufacturer.findUnique({
            where: {
                id: req.manufacturerId,
            }
        });

        if (!existing) {
            throw new NotFoundError("Manufacturer not found");
        }

        const manufacturer = await prisma.manufacturer.update({
            where: {
                id: req.manufacturerId,
            },
            data: {
                name: req.name,
                active: req.active
            }
        });

        return manufacturer;
    }

    static async list() {
        const manufacturerList = await prisma.manufacturer.findMany({
            where: {
                active: true,
            }, select: {                
                id: true,
                name: true,
                active: true,
            }
        });

        return manufacturerList;
    }
}
