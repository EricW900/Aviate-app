import api from "../../../api/axios";
import type { ApiResponse } from "../../../types/api";

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

export type AircraftStatus =
    | "ACTIVE"
    | "MAINTENANCE"
    | "INACTIVE"
    | "GROUNDED"
    | "ORDERED"
    | "DEACTIVATED";

export interface Aircraft {
    id: string;
    prefix: string;
    capacity: number;
    rangeKm: number;
    status: AircraftStatus;
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
    status: AircraftStatus;
}

export const listManufacturers = async () => {
    return api.get<ApiResponse<Manufacturer[]>>("/manufacturer/list");
};

export const createManufacturer = async (
    payload: CreateManufacturerRequest
) => {
    return api.post<ApiResponse<Manufacturer>>("/manufacturer/create", payload);
};

export const editManufacturer = async (
    payload: EditManufacturerRequest
) => {
  return api.patch<ApiResponse<Manufacturer>>("/manufacturer/edit", payload);
};

export const listAircraft = async () => {
  return api.get<ApiResponse<Aircraft[]>>("/aircraft/list");
};

export const createAircraft = async (
  payload: CreateAircraftRequest
) => {
  return api.post<ApiResponse<Aircraft>>("/aircraft/create", payload);
};

export const editAircraft = async (
  payload: EditAircraftRequest
) => {
  return api.patch<ApiResponse<Aircraft>>("/aircraft/edit", payload);
};

export const listAircraftModels = async () => {
  return api.get<ApiResponse<AircraftModel[]>>("/aircraftModel/list");
};
