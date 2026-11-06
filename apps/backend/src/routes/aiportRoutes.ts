import { Router } from "express";
import { validateRequest } from "../middleware/validation";
import { authenticate, authorize } from "../middleware/auth";
import { airportController } from "../controllers/airportController";
import { createAirportSchema, editAirportSchema, getAirportSchema } from "../validations/aiportValidation";

const router = Router();

router.post("/create",
    authenticate,
    authorize("ADMIN"),
    validateRequest(createAirportSchema),
    airportController.create
)

router.patch("/edit",
    authenticate,
    authorize("ADMIN"),
    validateRequest(editAirportSchema),
    airportController.edit,
)

router.get("/get/:icaoCode",
    authenticate,
    validateRequest(getAirportSchema, "params"),
    airportController.get,
)

router.get("/list",
    authenticate,
    airportController.list,
)

export default router;
