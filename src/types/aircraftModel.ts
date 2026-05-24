export interface createAircraftModelRequest {
    name: string;
    manufacturerId: string;
}

export interface getAircraftModelRequest {
    aircraftId: string[];
}

export interface listAircraftModelRequest {

}

export interface editAircraftModelRequest {
    aircraftModelId: string;
    manufacturerId: string;
    aircraftModelName: string;
}