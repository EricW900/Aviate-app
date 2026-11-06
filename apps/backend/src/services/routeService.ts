import prisma from "../config/database";
import { createRouteRequest, editRouteRequest, getRouteRequest } from "../types/route";
import { ConflictError, NotFoundError, ValidationError } from "../utils/errors";

export class routeService {
    static async create(req: createRouteRequest) {
        const [origin, destination] = await Promise.all([
            prisma.airport.findUnique({ where: { id: req.originId } }),
            prisma.airport.findUnique({ where: { id: req.destinationId } })
        ]);

        if (!origin || !destination) {
            throw new NotFoundError("Origin or destination airport not found");
        }

        const routeExists = await prisma.route.findFirst({
            where: {
                originId: req.originId,
                destinationId: req.destinationId
            }
        });

        if (routeExists) {
            throw new ConflictError("This route already exists");
        }

        if (req.originId === req.destinationId) {
            throw new ValidationError("You cannot create a route with the same origin and destination");
        }

        if (req.distanceKm <= 0) {
            throw new ValidationError("You cannot create a route that has negative or zero distance");
        }

        if (req.estimatedTime <= 0) {
            throw new ValidationError("You cannot create a route that don't have estimated time or negative time");
        }

        return prisma.route.create({
            data: {
                originId: req.originId,
                destinationId: req.destinationId,
                distanceKm: req.distanceKm,
                estimatedTime: req.estimatedTime
            }
        });
    }

    static async edit(req: editRouteRequest) {

        if (req.originId === req.destinationId) {
            throw new ValidationError("Origin and destination cannot be the same");
        }

        if (req.distanceKm <= 0) {
            throw new ValidationError("Distance must be greater than zero");
        }

        if (req.estimatedTime <= 0) {
            throw new ValidationError("Estimated time must be greater than zero");
        }

        const [origin, destination] = await Promise.all([
            prisma.airport.findUnique({ where: { id: req.originId } }),
            prisma.airport.findUnique({ where: { id: req.destinationId } })
        ]);

        if (!origin || !destination) {
            throw new NotFoundError("Origin or destination airport not found");
        }

        const routeExists = await prisma.route.findFirst({
            where: {
                originId: req.originId,
                destinationId: req.destinationId,
                id: { not: req.routeId },
            }
        });

        if (routeExists) {
            throw new ConflictError("This route already exists");
        }

        return prisma.route.update({
            where: { id: req.routeId },
            data: {
                originId: req.originId,
                destinationId: req.destinationId,
                distanceKm: req.distanceKm,
                estimatedTime: req.estimatedTime
            }
        });
    }

    static async get(req: getRouteRequest) {
        const route = await prisma.route.findUnique({
            where: {
                id: req.routeId,
            },
            select: {
                originId: true,
                destinationId: true,
                distanceKm: true,
                estimatedTime: true,
            }
        });

        if (!route) {
            throw new NotFoundError("Route not found");
        }

        return route;
    }

    static async list() {
        const routes = await prisma.route.findMany({
            select: {
                id: true,

                distanceKm: true,
                estimatedTime: true,

                origin: {
                    select: {
                        name: true,
                        city: true,
                        iataCode: true,
                        icaoCode: true,
                    }
                },

                destination: {
                    select: {
                        name: true,
                        city: true,
                        iataCode: true,
                        icaoCode: true,
                    }
                }
            },

            orderBy: [
                {
                    origin: {
                        city: "asc"
                    }
                },
                {
                    destination: {
                        city: "asc"
                    }
                }
            ]
        });

        return routes.map(route => ({
            id: route.id,

            distanceKm: route.distanceKm,
            estimatedTime: route.estimatedTime,

            origin: {
                name: route.origin.name,
                city: route.origin.city,
                iata: route.origin.iataCode,
                icao: route.origin.icaoCode,
            },

            destination: {
                name: route.destination.name,
                city: route.destination.city,
                iata: route.destination.iataCode,
                icao: route.destination.icaoCode,
            },
        }));
    }
}
