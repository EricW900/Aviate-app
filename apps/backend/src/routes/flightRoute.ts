import { Router } from "express";
import { validateRequest } from "../middleware/validation";
import { authenticate, authorize } from "../middleware/auth";
import { flightController } from "../controllers/flightController";
import { createFlightSchema, getFlightSchema, bulkGetFlightSchema, editFlightSchema, createCrewSchema, getCrewSChema, editCrewSchema } from "../validations/flightValidation";

const router = Router();

router.post("/create",
    authenticate,
    authorize("ADMIN"),
    validateRequest(createFlightSchema),
    flightController.create
)

router.get("/get/:flightId",
    authenticate,
    validateRequest(getFlightSchema, "params"),
    flightController.get,
)

router.post("/bulkGet",
    authenticate,
    validateRequest(bulkGetFlightSchema),
    flightController.bulkGet,
)

router.get("/flights",
    authenticate,
    flightController.flights,

)

router.patch("/edit",
    authenticate,
    authorize("ADMIN"),
    validateRequest(editFlightSchema),
    flightController.edit,
)

router.post("/crew",
    authenticate,
    authorize("ADMIN"),
    validateRequest(createCrewSchema),
    flightController.createCrew,
)

router.get("/getCrew/:flightId",
    authenticate,
    validateRequest(getCrewSChema, "params"),
    flightController.getCrew,
)

router.patch("/editCrew",
    authenticate,
    authorize("ADMIN"),
    validateRequest(editCrewSchema),
    flightController.editCrew,
)

export default router;
