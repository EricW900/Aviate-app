export interface createAirportRequest {
    name: string,
    iataCode: string,
    icaoCode: string,
    city: string,
    country: string,
}

export interface editAirportRequest {
    airportId: string,
    name: string,
    iataCode: string,
    icaoCode: string,
    city: string,
    country: string,
}

export interface getAirportRequest {
    icaoCode: string,
}

export interface listAirportRequest {

}