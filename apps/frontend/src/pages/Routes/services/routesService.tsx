import api from "../../../api/axios";

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

export const listRoutes = async () => {
    return api.get("/route/list");
};