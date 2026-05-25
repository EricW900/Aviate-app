import prisma from "../config/database";
import { ConflictError, NotFoundError, ValidationError } from "../utils/errors";
import { createManufacturerRequest, editManufacturerRequest, listManufacturerRequest } from "../types/manufacturer";

export class manufacturerService {
    static async create(req: createManufacturerRequest, user: any) {
        console.log(req, user);
        // if (!user.isActive) {
        //     throw new ValidationError("Inactive users cannot create a manufacturer");
        // };

        req.name = req.name.toUpperCase();

        const existing = await prisma.manufacturer.findFirst({
            where: {
                name: req.name,
            }
        });

        if (existing) {
            throw new ConflictError("This manufacturer already exists");
        };

        const manufacturer = await prisma.manufacturer.create({
            data: {
                name: req.name,
            }
        });

        return manufacturer;
    }

    static async edit(req: editManufacturerRequest, user: any) {
        // if (!user.isActive) {
        //     throw new ValidationError("Inactive users cannot edit a manufacturer");
        // };

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

    static async list(req: listManufacturerRequest, user: any) {
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