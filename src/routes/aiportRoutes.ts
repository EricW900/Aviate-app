import { Router } from "express";
import { validateRequest } from "../middleware/validation";
import { authenticate } from "../middleware/auth";
import { airportController } from "../controllers/airportController";
import { createAirportSchema, editAirportSchema, getAirportSchema } from "../validations/aiportValidation";

const router = Router();

router.post("/create",
    authenticate,
    validateRequest(createAirportSchema),
    airportController.create
)

router.post("/edit",
    authenticate,
    validateRequest(editAirportSchema),
    airportController.edit,
)

router.get("/get",
    authenticate,
    validateRequest(getAirportSchema),
    airportController.get,
)

export default router;