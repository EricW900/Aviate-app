import prisma from "../config/database";
import { createRouteRequest, editRouteRequest, getRouteRequest, listRouteRequest } from "../types/route";
import { ConflictError, NotFoundError, ValidationError } from "../utils/errors";

export class routeService {
    static async create(req: createRouteRequest, user: any) {
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

        try {
            const newRoute = await prisma.route.create({
                data: {
                    originId: req.originId,
                    destinationId: req.destinationId,
                    distanceKm: req.distanceKm,
                    estimatedTime: req.estimatedTime
                }
            });

            return newRoute;
        } catch (error: any) {
            throw new ConflictError("This route already exists");
        }
    }

    static async edit(req: editRouteRequest, user: any) {

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
                destinationId: req.destinationId
            }
        });

        if (routeExists) {
            throw new ConflictError("This route already exists");
        }

        try {
            return await prisma.route.update({
                where: { id: req.routeId },
                data: {
                    originId: req.originId,
                    destinationId: req.destinationId,
                    distanceKm: req.distanceKm,
                    estimatedTime: req.estimatedTime
                }
            });
        } catch (error: any) {
            if (error.code === 'P2025') {
                throw new NotFoundError("Route to edit not found");
            }

            throw new ConflictError("Cannot update route");
        }
    }

    static async get(req: getRouteRequest, user: any) {
        const routeExists = await prisma.route.findUnique({
            where: {
                id: req.routeId,
            }
        });

        if (!routeExists) {
            throw new NotFoundError("Cannot find route");
        }

        try {
            return await prisma.route.findUnique({
                where: {
                    id: req.routeId,
                },
                select: {
                    originId: true,
                    destinationId: true,
                    distanceKm: true,
                    estimatedTime: true,
                }
            })
        } catch (error) {
            throw new NotFoundError("Route not found");
        }
    }

    static async list(req: listRouteRequest, user: any) {
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