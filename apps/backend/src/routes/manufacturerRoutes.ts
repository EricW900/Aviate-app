import { Router } from "express";
import { manufacturerController } from "../controllers/manufacturerController";
import { createManufacturerSchema, editManufacturerSchema } from "../validations/manufacturerValidations";
import { validateRequest } from "../middleware/validation";
import { authenticate, authorize } from "../middleware/auth";

const router = Router();

router.post(
    "/create",
    authenticate,
    authorize("ADMIN"),
    validateRequest(createManufacturerSchema),
    manufacturerController.create,
)

router.patch(
    "/edit",
    authenticate,
    authorize("ADMIN"),
    validateRequest(editManufacturerSchema),
    manufacturerController.edit,
)

router.get(
    "/list",
    authenticate,
    manufacturerController.list,
)

export default router;
