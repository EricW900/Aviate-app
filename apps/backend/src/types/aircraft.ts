import { AircraftStatus } from "@prisma/client";

export interface createAircraftRequest {
    prefix: string;
    modelId: string;
    capacity: number;
    rangeKm: number;
}

export interface editAircraftRequest {
    aircraftId: string;
    prefix: string;
    modelId: string;
    capacity: number;
    rangeKm: number;
    status: AircraftStatus;
}

export interface getAircraftRequest {
    aircraftIds: string[];
}
