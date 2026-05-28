import prisma from "../config/database";
import { createAirportRequest, editAirportRequest, getAirportRequest, listAirportRequest } from "../types/airport";
import { ConflictError, NotFoundError, ValidationError } from "../utils/errors";

export class airportService {
    static async create(req: createAirportRequest, user: any) {
        const iataExists = await prisma.airport.findFirst({
            where: {
                iataCode: req.iataCode,
            }
        });

        const icaoExists = await prisma.airport.findFirst({
            where: {
                icaoCode: req.icaoCode,
            }
        });

        if (iataExists || icaoExists) {
            throw new ConflictError("ICAO or IATA code already exists for this airport!")
        };

        try {
            const newAirport = await prisma.airport.create({
                data: {
                    name: req.name,
                    iataCode: req.iataCode,
                    icaoCode: req.icaoCode,
                    city: req.city,
                    country: req.country,
                }
            });

            return newAirport;
        } catch (error: any) {
            throw new ValidationError("Error cannot create an airport")
        }
    }

    static async edit(req: editAirportRequest, user: any) {
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

        try {
            return await prisma.airport.update({
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
        } catch (error) {
            throw new ValidationError("Cannot edit airport");
        }
    }

    static async get(req: getAirportRequest, user: any) {
        const icaoExists = await prisma.airport.findUnique({
            where: {
                icaoCode: req.icaoCode,
            }
        });

        if (!icaoExists) {
            throw new NotFoundError("Airport not found");
        }

        try {
            return await prisma.airport.findUnique({
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
            })
        } catch (error) {
            throw new ValidationError("Cannot found airport");
        }
    }

    static async list(req: listAirportRequest, user: any) {
        try {
            return await prisma.airport.findMany({
                select: {
                    id: true,
                    name: true,
                    iataCode: true,
                    icaoCode: true,
                    city: true,
                    country: true
                }
            });
        } catch (error) {
            throw new Error("Cannot list airports");
        }
    };
}

// name: string,
// iataCode: string,
// icaoCode: string,
// city: string,
// country: string,