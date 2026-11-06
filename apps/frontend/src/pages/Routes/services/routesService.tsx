import api from "../../../api/axios";
import type { ApiResponse } from "../../../types/api";

export interface RouteAirport {
    name: string;
    city: string;
    iata: string;
    icao: string;
}

export interface Route {
    id: string;

    distanceKm: number;
    estimatedTime: number;

    origin: RouteAirport;
    destination: RouteAirport;
}

export interface CreateRouteRequest {
    originId: string;
    destinationId: string;
    distanceKm: number;
    estimatedTime: number;
}

export const createRoute = async (payload: CreateRouteRequest) => {
    return api.post<ApiResponse<Route>>("/route/create", payload);
};

export const listRoutes = async () => {
    return api.get<ApiResponse<Route[]>>("/route/list");
};
