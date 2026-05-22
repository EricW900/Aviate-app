export interface createManufacturerRequest {
    name: string;
}

export interface editManufacturerRequest {
    manufacturerId: string;
    name: string;
    active: boolean;
}