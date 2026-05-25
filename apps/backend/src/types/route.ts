export interface createRouteRequest {
    originId: string,
    destinationId: string,
    distanceKm: number,
    estimatedTime: number,
}

export interface editRouteRequest {
    routeId: string,
    originId: string,
    destinationId: string,
    distanceKm: number,
    estimatedTime: number,
}

export interface getRouteRequest {
    routeId: string,
}

export interface listRouteRequest {

}