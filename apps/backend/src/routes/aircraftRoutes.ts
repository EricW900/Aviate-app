import { Router } from "express";
import { AircraftController } from "../controllers/aircraftController";
import { validateRequest } from "../middleware/validation";
import { createAircraftSchema, editAircraftSchema, getAircraftSchema } from "../validations/aircraftValidations";
import { authenticate, authorize } from "../middleware/auth";

const router = Router();

router.post(
  "/create",
  authenticate,
  authorize("ADMIN"),
  validateRequest(createAircraftSchema),
  AircraftController.create,
);

router.patch(
  "/edit",
  authenticate,
  authorize("ADMIN"),
  validateRequest(editAircraftSchema),
  AircraftController.edit,
);

// Basically a get requisition
router.post(
  "/bulk",
  authenticate,
  validateRequest(getAircraftSchema),
  AircraftController.bulkGet,
);

router.get(
  "/list",
  authenticate,
  AircraftController.list,
)

export default router;
