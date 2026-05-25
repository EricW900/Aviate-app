import { Router } from "express";
import { validateRequest } from "../middleware/validation";
import { authenticate } from "../middleware/auth";
import { flightController } from "../controllers/flightController";
import { createFlightSchema, getFlightSchema, bulkGetFlightSchema, editFlightSchema, createCrewSchema, getCrewSChema, editCrewSchema, flightsSchema } from "../validations/flightValidation";
import { ValidationError } from "../utils/errors";

const router = Router();

router.post("/create",
    authenticate,
    validateRequest(createFlightSchema),
    flightController.create
)

router.get("/get",
    authenticate,
    validateRequest(getFlightSchema),
    flightController.get,
)

router.post("/bulkGet",
    authenticate,
    validateRequest(bulkGetFlightSchema),
    flightController.bulkGet,
)

router.get("/flights",
    authenticate,
    validateRequest(flightsSchema),
    flightController.flights,

)

router.patch("/edit",
    authenticate,
    validateRequest(editFlightSchema),
    flightController.edit,
)

router.post("/crew",
    authenticate,
    validateRequest(createCrewSchema),
    flightController.createCrew,
)

router.get("/getCrew",
    authenticate,
    validateRequest(getCrewSChema),
    flightController.getCrew,
)

router.patch("/editCrew",
    authenticate,
    validateRequest(editCrewSchema),
    flightController.editCrew,
)

export default router;