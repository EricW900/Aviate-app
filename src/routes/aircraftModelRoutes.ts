import { Router } from "express";
import { aircraftModelController } from "../controllers/aircraftModelController";
import { validateRequest } from "../middleware/validation";
import { authenticate } from "../middleware/auth";
import { createAircraftModelSchema, getAircraftModelSchema } from "../validations/aircraftModelValidation";

const router = Router();

router.post("/create",
    authenticate,
    validateRequest(createAircraftModelSchema),
    aircraftModelController.create,
)

router.post("/get",
    authenticate,
    validateRequest(getAircraftModelSchema),
    aircraftModelController.bulkGet,
)

export default router;