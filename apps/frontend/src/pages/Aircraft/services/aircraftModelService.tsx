import api from "../../../api/axios";

export interface Manufacturer {
    id: string;
    name: string;
    active: boolean;
}

export interface AircraftModel {
    id: string;
    name: string;
    manufacturerId: string;
    manufacturer?: Manufacturer;
}

export interface CreateAircraftModelRequest {
    name: string;
    manufacturerId: string;
}

export interface EditAircraftModelRequest {
    aircraftModelName: string;
    aircraftModelId: string;
    manufacturerId: string;
}

export const listManufacturers = async() => {
    return api.get("/manufacturer/list");
}

export const listAircraftModels = async () => {
    return api.get("/aircraftModel/list");
}

export const createAircraftModel = async (
    payload: CreateAircraftModelRequest
) => {
    return api.post("/aircraftModel/create", payload);
}

export const editAircraftModel = async (
    payload: EditAircraftModelRequest
) => {
    return api.post("/aircraftModel/edit", payload);
}

