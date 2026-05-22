import { Router } from "express";
import { AircraftController } from "../controllers/aircraftController";
import { validateRequest } from "../middleware/validation";
import { createAircraftSchema, editAircraftSchema, getAircraftSchema, listAircraftSchema } from "../validations/aircraftValidations";
import { authenticate } from "../middleware/auth";

const router = Router();

router.post(
  "/create",
  authenticate,
  validateRequest(createAircraftSchema),
  AircraftController.create,
);

// TODO: GET IS MISSING!

router.post(
  "/edit",
  authenticate,
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
  validateRequest(listAircraftSchema),
  AircraftController.list,
)

// Not necessary in this case because there's no delete, only status "DEACTIVATED"
// router.delete(
//   "/delete",
//   authenticate,
//   validateRequest(deleteAircraftSchema),
//   AircraftController.delete,
// )

export default router;