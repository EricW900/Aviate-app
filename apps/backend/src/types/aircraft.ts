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

export interface listAircraftRequest {

}

// // Not necessary in this case because there's no delete, only status "DEACTIVATED"
// export interface deleteAircraftRequest {
//     aircraftId: string;
// }
