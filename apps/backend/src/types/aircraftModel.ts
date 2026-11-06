export interface createAircraftModelRequest {
    name: string;
    manufacturerId: string;
}

export interface getAircraftModelRequest {
    aircraftModelIds: string[];
}

export interface editAircraftModelRequest {
    aircraftModelId: string;
    manufacturerId: string;
    aircraftModelName: string;
}
