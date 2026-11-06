import { Router } from "express";
import { validateRequest } from "../middleware/validation";
import { authenticate, authorize } from "../middleware/auth";
import { createRouteSchema, editRouteSchema, getRouteSchema } from "../validations/routeValidation";
import { routeController } from "../controllers/routeController";

const router = Router();

router.post("/create",
    authenticate,
    authorize("ADMIN"),
    validateRequest(createRouteSchema),
    routeController.create,
)

router.patch("/edit",
    authenticate,
    authorize("ADMIN"),
    validateRequest(editRouteSchema),
    routeController.edit,
)

router.get("/get/:routeId",
    authenticate,
    validateRequest(getRouteSchema, "params"),
    routeController.get,
)

router.get("/list",
    authenticate,
    routeController.list,
)

export default router;
