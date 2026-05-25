import prisma from "../config/database";
import { bulkGetFlightRequest, createCrewRequest, createFlightRequest, editCrewRequest, editFlightRequest, getCrewRequest, getFlightRequest, flightsRequest } from "../types/flight";
import { ConflictError, NotFoundError, ValidationError } from "../utils/errors";

export class flightService {
    static async create(req: createFlightRequest, user: any) {

        const routeExists = await prisma.route.findFirst({
            where: { id: req.routeId }
        });

        if (!routeExists) {
            throw new NotFoundError("Cannot create flight! Route doesn't exists");
        }

        const aircraftExists = await prisma.aircraft.findUnique({
            where: { id: req.aircraftId }
        });

        if (!aircraftExists) {
            throw new NotFoundError("Cannot create flight! Aircraft doesn't exists");
        }

        const flightNumber = `RG - ${req.flightNumber}`;

        const flightNumberExists = await prisma.flight.findFirst({
            where: {
                flightNumber: flightNumber,
            }
        });

        if (flightNumberExists) {
            throw new ConflictError("Flight number already exists");
        }

        const departureTime = new Date(req.departureTime);
        const arrivalTime = new Date(req.arrivalTime);

        if (departureTime >= arrivalTime) {
            throw new ValidationError("Departure time must be before arrival time");
        }

        const concurrentFlights = await prisma.flight.findMany({
            where: {
                aircraftId: req.aircraftId,
                AND: [
                    {
                        departureTime: {
                            lt: arrivalTime
                        }
                    },
                    {
                        arrivalTime: {
                            gt: departureTime
                        }
                    }
                ]
            }
        });

        if (concurrentFlights.length > 0) {
            throw new ValidationError("Aircraft is already assigned to another flight during this time");
        }

        try {
            const newFlight = await prisma.flight.create({
                data: {
                    flightNumber,
                    routeId: req.routeId,
                    aircraftId: req.aircraftId,
                    departureTime, // Date
                    arrivalTime,   // Date
                    status: req.status
                }
            });

            return newFlight;
        } catch (error) {
            throw new Error("Error creating flight");
        }
    };

    static async get(req: getFlightRequest, user: any) {
        try {
            const flight = await prisma.flight.findUnique({
                where: {
                    id: req.flightId
                },
                select: {
                    flightNumber: true,
                    departureTime: true,
                    arrivalTime: true,
                    status: true,

                    aircraft: {
                        select: {
                            prefix: true,
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
                    },

                    route: {
                        select: {
                            origin: {
                                select: {
                                    iataCode: true,
                                    icaoCode: true
                                }
                            },
                            destination: {
                                select: {
                                    iataCode: true,
                                    icaoCode: true
                                }
                            }
                        }
                    }
                }
            });

            return flight;
        } catch (error) {
            throw new NotFoundError("Cannot get flight");
        }
    };

    static async flights(req: flightsRequest, user: any) {
        try {
            const flights = await prisma.flight.findMany({
                select: {
                    flightNumber: true,
                    departureTime: true,
                    arrivalTime: true,
                    status: true,

                    aircraft: {
                        select: {
                            prefix: true,
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
                    },

                    route: {
                        select: {
                            origin: {
                                select: {
                                    iataCode: true,
                                    icaoCode: true
                                }
                            },
                            destination: {
                                select: {
                                    iataCode: true,
                                    icaoCode: true
                                }
                            }
                        }
                    }
                }
            });

            return flights;
        } catch (error) {
            throw new NotFoundError("Cannot get flights");
        }
    };

    static async bulkGet(req: bulkGetFlightRequest, user: any) {
        try {
            const flights = await prisma.flight.findMany({
                where: {
                    id: {
                        in: req.flightId,
                    }
                },
                select: {
                    flightNumber: true,
                    departureTime: true,
                    arrivalTime: true,
                    status: true,

                    aircraft: {
                        select: {
                            prefix: true,
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
                    },

                    route: {
                        select: {
                            origin: {
                                select: {
                                    iataCode: true,
                                    icaoCode: true
                                }
                            },
                            destination: {
                                select: {
                                    iataCode: true,
                                    icaoCode: true
                                }
                            }
                        }
                    }
                }
            });

            return flights;
        } catch (error) {
            throw new NotFoundError("Cannot get flights");
        }
    }

    static async edit(req: editFlightRequest, user: any) {
        const routeExists = await prisma.route.findFirst({
            where: { id: req.routeId }
        });

        if (!routeExists) {
            throw new NotFoundError("Cannot edit flight! Route doesn't exists");
        };

        const aircraftExists = await prisma.aircraft.findUnique({
            where: { id: req.aircraftId }
        });

        if (!aircraftExists) {
            throw new NotFoundError("Cannot edit flight! Aircraft doesn't exists");
        };

        const routeDistance = await prisma.route.findFirst({
            where: {
                id: req.routeId,
            },
            select: {
                distanceKm: true,
            }
        });

        const aircraftAutonomy = await prisma.aircraft.findFirst({
            where: {
                id: req.aircraftId,
            },
            select: {
                rangeKm: true,
            }
        });

        if (!routeDistance) {
            throw new NotFoundError("Route not found");
        }

        if (!aircraftAutonomy) {
            throw new NotFoundError("Aircraft not found");
        }

        if (aircraftAutonomy.rangeKm < routeDistance.distanceKm) {
            throw new ValidationError("Aircraft cannot perform this route (insufficient range)");
        }


        const flightNumber = `RG - ${req.flightNumber}`;
        const flightNumberExists = await prisma.flight.findFirst({
            where: {
                flightNumber: flightNumber,
                NOT: {
                    id: req.flightId
                }
            }
        });

        if (flightNumberExists) {
            throw new ConflictError("Flight number exists! Cannot edit route");
        }

        const departureTime = new Date(req.departureTime);
        const arrivalTime = new Date(req.arrivalTime);

        if (departureTime >= arrivalTime) {
            throw new ValidationError("Departure time must be before arrival time");
        }

        const concurrentFlights = await prisma.flight.findMany({
            where: {
                aircraftId: req.aircraftId,
                NOT: {
                    id: req.flightId
                },
                AND: [
                    {
                        departureTime: {
                            lt: arrivalTime
                        }
                    },
                    {
                        arrivalTime: {
                            gt: departureTime
                        }
                    }
                ]
            }
        });

        if (concurrentFlights.length > 0) {
            throw new ValidationError("Aircraft is already assigned to another flight during this time");
        }

        try {
            const newFlight = await prisma.flight.update({
                where: {
                    id: req.flightId,
                },
                data: {
                    flightNumber,
                    routeId: req.routeId,
                    aircraftId: req.aircraftId,
                    departureTime, // Date
                    arrivalTime,   // Date
                    status: req.status
                }
            });

            return newFlight;
        } catch (error) {
            throw new Error("Error editing flight");
        }
    }

    static async createCrew(req: createCrewRequest, user: any) {

        const flight = await prisma.flight.findUnique({
            where: { id: req.flightId },
            include: {
                crew: true
            }
        });

        if (!flight) {
            throw new NotFoundError("Cannot assign crew! Flight doesn't exist");
        }

        if (
            flight.status === "COMPLETED" ||
            flight.status === "CANCELLED"
        ) {
            throw new ValidationError("Cannot assign crew to a finished or cancelled flight");
        }

        const crewUser = await prisma.user.findUnique({
            where: { id: req.userId }
        });

        if (!crewUser) {
            throw new NotFoundError("Cannot assign crew! User doesn't exist");
        }

        if (!crewUser.isActive) {
            throw new ValidationError("Cannot assign inactive user to flight crew");
        }

        const validRoleMatch = {
            PILOT: ["PILOT"],
            FIRST_OFFICER: ["FIRST_OFFICER"],
            CABIN_CREW: ["CABIN_CREW"],
            FLIGHT_ENGINEER: ["FLIGHT_ENGINEER"]
        };

        if (!validRoleMatch[req.role]?.includes(crewUser.role)) {
            throw new ValidationError(
                `User role (${crewUser.role}) cannot be assigned as ${req.role}`
            );
        }

        const existingCrew = await prisma.flightCrew.findUnique({
            where: {
                flightId_userId: {
                    flightId: req.flightId,
                    userId: req.userId
                }
            }
        });

        if (existingCrew) {
            throw new ConflictError("User already assigned to this flight");
        }

        if (req.role === "PILOT") {
            const pilotExists = flight.crew.some(
                (c) => c.role === "PILOT"
            );

            if (pilotExists) {
                throw new ConflictError("This flight already has a pilot assigned");
            }
        }

        if (req.role === "FIRST_OFFICER") {
            const foExists = flight.crew.some(
                (c) => c.role === "FIRST_OFFICER"
            );

            if (foExists) {
                throw new ConflictError("This flight already has a first officer assigned");
            }
        }

        try {
            const crew = await prisma.flightCrew.create({
                data: {
                    flightId: req.flightId,
                    userId: req.userId,
                    role: req.role
                }
            });

            return crew;

        } catch (error: any) {
            if (error.code === "P2002") {
                throw new ConflictError("Crew already exists for this flight");
            }

            throw new Error("Error creating flight crew");
        }
    }

    static async getCrew(req: getCrewRequest, user: any) {

        const flight = await prisma.flight.findUnique({
            where: {
                id: req.flightId
            },
            select: {
                id: true,
                flightNumber: true,
                status: true,
                departureTime: true,
                arrivalTime: true,

                crew: {
                    select: {
                        id: true,
                        role: true,

                        user: {
                            select: {
                                id: true,
                                firstName: true,
                                lastName: true,
                                email: true,
                                role: true,
                                employee_code: true,
                                isActive: true
                            }
                        }
                    }
                }
            }
        });

        if (!flight) {
            throw new NotFoundError("Flight not found");
        }

        return flight;
    }

    static async editCrew(req: editCrewRequest, user: any) {

        const flight = await prisma.flight.findUnique({
            where: { id: req.flightId }
        });

        if (!flight) {
            throw new NotFoundError("Flight not found");
        }

        const crewExists = await prisma.flightCrew.findUnique({
            where: {
                id: req.crewId
            }
        });

        if (!crewExists) {
            throw new NotFoundError("Crew not found");
        }

        const newUser = await prisma.user.findUnique({
            where: { id: req.userId }
        });

        if (!newUser) {
            throw new NotFoundError("User not found");
        }

        if (!newUser.isActive) {
            throw new ValidationError("Cannot assign inactive user to crew");
        }

        const duplicateCrew = await prisma.flightCrew.findFirst({
            where: {
                flightId: req.flightId,
                userId: req.userId,
                NOT: {
                    id: req.crewId
                }
            }
        });

        if (duplicateCrew) {
            throw new ConflictError("User already assigned to this flight");
        }

        const validRoleMatch = {
            PILOT: ["PILOT"],
            FIRST_OFFICER: ["FIRST_OFFICER"],
            CABIN_CREW: ["CABIN_CREW"],
            FLIGHT_ENGINEER: ["FLIGHT_ENGINEER"]
        };

        if (!validRoleMatch[req.role]?.includes(newUser.role)) {
            throw new ValidationError(
                `User role (${newUser.role}) cannot be assigned as ${req.role}`
            );
        }

        const existingCrew = await prisma.flightCrew.findMany({
            where: {
                flightId: req.flightId,
                NOT: {
                    id: req.crewId
                }
            }
        });

        if (req.role === "PILOT") {
            const pilotExists = existingCrew.some(c => c.role === "PILOT");
            if (pilotExists) {
                throw new ConflictError("This flight already has a pilot assigned");
            }
        }

        if (req.role === "FIRST_OFFICER") {
            const foExists = existingCrew.some(c => c.role === "FIRST_OFFICER");
            if (foExists) {
                throw new ConflictError("This flight already has a first officer assigned");
            }
        }

        try {
            const updatedCrew = await prisma.flightCrew.update({
                where: {
                    id: req.crewId
                },
                data: {
                    userId: req.userId,
                    role: req.role
                }
            });

            return updatedCrew;

        } catch (error) {
            throw new Error("Error updating crew");
        }
    }
}