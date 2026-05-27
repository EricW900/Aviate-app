import api from "../../../api/axios";

export interface Airport {
    id: string;
    name: string;
    iataCode: string;
    icaoCode: string;
    city: string;
    country: string;
}

export interface CreateAirportRequest {
    name: string;
    iataCode: string;
    icaoCode: string;
    city: string;
    country: string;
}

export interface EditAirportRequest {
    airportId: string;
    name: string;
    iataCode: string;
    icaoCode: string;
    city: string;
    country: string;
}

// Routes
export const createAirport = async (payload: CreateAirportRequest) => {
    return api.post("/airport/create", payload);
}

export const editAirport = async (payload: EditAirportRequest) => {
    return api.post("/airport/edit", payload);
}

export const listAirports = async () => {
    return api.get("/airport/list");
}