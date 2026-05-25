import { Router } from "express";
import { validateRequest } from "../middleware/validation";
import { authenticate } from "../middleware/auth";
import { createRouteSchema, editRouteSchema, getRouteSchema, listRouteSchema } from "../validations/routeValidation";
import { routeController } from "../controllers/routeController";

const router = Router();

router.post("/create",
    authenticate,
    validateRequest(createRouteSchema),
    routeController.create,
)

router.post("/edit",
    authenticate,
    validateRequest(editRouteSchema),
    routeController.edit,
)

router.get("/get",
    authenticate,
    validateRequest(getRouteSchema),
    routeController.get,
)

router.get("/list",
    authenticate,
    validateRequest(listRouteSchema),
    routeController.list,
)

export default router;