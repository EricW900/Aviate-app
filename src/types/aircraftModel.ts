export interface createAircraftModelRequest {
    name: string;
    manufacturerId: string;
}

export interface getAircraftModelRequest {
    aircraftId: string[];
}