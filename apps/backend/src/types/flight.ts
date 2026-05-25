import { CrewRole, FlightStatus } from "@prisma/client";

export interface createFlightRequest {
    flightNumber: string,
    routeId: string,
    aircraftId: string,
    departureTime: Date,
    arrivalTime: Date,
    status: FlightStatus,
}

export interface getFlightRequest {
    flightId: string,
}

export interface bulkGetFlightRequest {
    flightId: string[],
}

export interface flightsRequest{

}

export interface editFlightRequest {
    flightId: string,
    flightNumber: string,
    routeId: string,
    aircraftId: string,
    departureTime: Date,
    arrivalTime: Date,
    status: FlightStatus,
}

export interface createCrewRequest {
    flightId: string,
    userId: string,
    role: CrewRole
}

export interface getCrewRequest {
    flightId: string,
}

export interface editCrewRequest {
    flightId: string,
    crewId: string,
    userId: string,
    role: CrewRole,
}