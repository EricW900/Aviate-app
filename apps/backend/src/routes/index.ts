import { Router } from "express";
import authRoutes from "./authRoutes";
import { ApiResponseUtil } from "../utils/apiResponse";
import aircraftRoutes from "./aircraftRoutes";
import manufacturerRoutes from "./manufacturerRoutes";
import aircraftModelRoutes from "./aircraftModelRoutes"
import routeRoutes from "./routeRoutes";
import airportRoutes from "./aiportRoutes";
import flightRoute from "./flightRoute";

const router = Router();

// Health check
router.get("/health", (req, res) => {
  ApiResponseUtil.success(res, "Server is running", {
    status: "OK",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
  });
});

// API routes
router.use("/auth", authRoutes);

// Aircraft, Manufacturer and Model Routes
router.use("/aircraft", aircraftRoutes);
router.use("/manufacturer", manufacturerRoutes);
router.use("/aircraftModel", aircraftModelRoutes);

// Routes and Airports routes
router.use("/route", routeRoutes);
router.use("/airport", airportRoutes);

// Flights and Crew routes
router.use("/flight", flightRoute);

export default router;
