import api from "../../../api/axios";

export interface Manufacturer {
    id: string;
    name: string;
    active: boolean;
};

export interface CreateManufacturerRequest {
    name: string;
};

export interface EditManufacturerRequest {
    manufacturerId: string;
    name: string;
    active: boolean;
};

export interface Aircraft {
    id: string;
    prefix: string;
    capacity: number;
    rangeKm: number;
    status: "ACTIVE" | "DEACTIVATED";
    modelId: string;

    model?: {
        name: string;

        manufacturer?: {
            name: string;
        };
    };
}

export interface AircraftModel {
    id: string;
    name: string;
}

export interface CreateAircraftRequest {
    prefix: string;
    modelId: string;
    capacity: number;
    rangeKm: number;
}

export interface EditAircraftRequest {
    aircraftId: string;
    prefix: string;
    modelId: string;
    capacity: number;
    rangeKm: number;
    status: "ACTIVE" | "DEACTIVATED";
}

export const listManufacturers = async () => {
    return api.get("/manufacturer/list");
};

export const createManufacturer = async (
    payload: CreateManufacturerRequest
) => {
    return api.post("/manufacturer/create", payload);
};

export const editManufacturer = async (
    payload: EditManufacturerRequest
) => {
    return api.post("/manufacturer/edit", payload);
};

export const listAircraft = async () => {
  return api.get("/aircraft/list");
};

export const createAircraft = async (
  payload: CreateAircraftRequest
) => {
  return api.post("/aircraft/create", payload);
};

export const editAircraft = async (
  payload: EditAircraftRequest
) => {
  return api.post("/aircraft/edit", payload);
};

export const listAircraftModels = async () => {
  return api.get("/aircraftModel/list");
};