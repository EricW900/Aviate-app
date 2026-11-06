import prisma from "../config/database";
import { createAirportRequest, editAirportRequest, getAirportRequest } from "../types/airport";
import { ConflictError, NotFoundError } from "../utils/errors";

export class airportService {
    static async create(req: createAirportRequest) {
        const airportExists = await prisma.airport.findFirst({
            where: {
                OR: [
                    { iataCode: req.iataCode },
                    { icaoCode: req.icaoCode },
                ],
            }
        });

        if (airportExists) {
            throw new ConflictError("ICAO or IATA code already exists for this airport!")
        }

        return prisma.airport.create({
            data: {
                name: req.name,
                iataCode: req.iataCode,
                icaoCode: req.icaoCode,
                city: req.city,
                country: req.country,
            }
        });
    }

    static async edit(req: editAirportRequest) {
        const airport = await prisma.airport.findUnique({
            where: {
                id: req.airportId,
            },
        });

        if (!airport) {
            throw new NotFoundError("Airport not found");
        }

        const iataConflict = await prisma.airport.findFirst({
            where: {
                iataCode: req.iataCode,
                id: {
                    not: req.airportId,
                },
            },
        });

        if (iataConflict) {
            throw new ConflictError("IATA code already exists for another airport!");
        }

        const icaoConflict = await prisma.airport.findFirst({
            where: {
                icaoCode: req.icaoCode,
                id: {
                    not: req.airportId,
                },
            },
        });

        if (icaoConflict) {
            throw new ConflictError("ICAO code already exists for another airport!");
        }

        return prisma.airport.update({
            where: {
                id: req.airportId,
            },
            data: {
                name: req.name,
                iataCode: req.iataCode,
                icaoCode: req.icaoCode,
                city: req.city,
                country: req.country,
            },
        });
    }

    static async get(req: getAirportRequest) {
        const airport = await prisma.airport.findUnique({
            where: {
                icaoCode: req.icaoCode,
            },
            select: {
                name: true,
                iataCode: true,
                icaoCode: true,
                city: true,
                country: true
            }
        });

        if (!airport) {
            throw new NotFoundError("Airport not found");
        }

        return airport;
    }

    static async list() {
        return prisma.airport.findMany({
            select: {
                id: true,
                name: true,
                iataCode: true,
                icaoCode: true,
                city: true,
                country: true
            }
        });
    }
}
