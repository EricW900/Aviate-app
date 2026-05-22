import { Router } from "express";
import { manufacturerController } from "../controllers/manufacturerController";
import { createManufacturerSchema, editManufacturerSchema } from "../validations/manufacturerValidations";
import { validateRequest } from "../middleware/validation";
import { authenticate } from "../middleware/auth";

const router = Router();

router.post(
    "/create",
    authenticate,
    validateRequest(createManufacturerSchema),
    manufacturerController.create,
)

// router.post(
//   "/create",
//   (req, res, next) => { console.log("1"); next(); },
// //   authenticate,
//   (req, res, next) => { console.log("2"); next(); },
//   validateRequest(createManufacturerSchema),
//   (req, res, next) => { console.log("3"); next(); },
//   manufacturerController.create,
// );

router.post(
    "/edit",
    authenticate,
    validateRequest(editManufacturerSchema),
    manufacturerController.edit,
)

export default router;