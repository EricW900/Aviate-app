import api from "../../../api/axios";
import type { ApiResponse } from "../../../types/api";

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
    return api.get<ApiResponse<Manufacturer[]>>("/manufacturer/list");
}

export const listAircraftModels = async () => {
    return api.get<ApiResponse<AircraftModel[]>>("/aircraftModel/list");
}

export const createAircraftModel = async (
    payload: CreateAircraftModelRequest
) => {
    return api.post<ApiResponse<AircraftModel>>("/aircraftModel/create", payload);
}

export const editAircraftModel = async (
    payload: EditAircraftModelRequest
) => {
    return api.patch<ApiResponse<AircraftModel>>("/aircraftModel/edit", payload);
}

