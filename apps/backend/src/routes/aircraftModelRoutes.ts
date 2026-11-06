import { Router } from "express";
import { aircraftModelController } from "../controllers/aircraftModelController";
import { validateRequest } from "../middleware/validation";
import { authenticate, authorize } from "../middleware/auth";
import { createAircraftModelSchema, editAircraftModelSchema, getAircraftModelSchema } from "../validations/aircraftModelValidation";

const router = Router();

router.post("/create",
    authenticate,
    authorize("ADMIN"),
    validateRequest(createAircraftModelSchema),
    aircraftModelController.create,
)

router.post("/get",
    authenticate,
    validateRequest(getAircraftModelSchema),
    aircraftModelController.bulkGet,
)

router.get("/list",
    authenticate,
    aircraftModelController.list
)

router.patch("/edit",
    authenticate,
    authorize("ADMIN"),
    validateRequest(editAircraftModelSchema),
    aircraftModelController.edit,
)

export default router;
