import { Router } from "express";
import { AuthController } from "../controllers/authController";
import { validateRequest } from "../middleware/validation";
import { authenticate, authorize } from "../middleware/auth";
import {
  createUserSchema,
  editUserSchema,
  loginSchema,
  registerSchema,
} from "../utils/validation";

const router = Router();

// Public routes
router.post(
  "/register",
  validateRequest(registerSchema),
  AuthController.register
);
router.post("/login", validateRequest(loginSchema), AuthController.login);

// Protected routes
router.get("/profile", authenticate, AuthController.getProfile);

router.post(
  "/create-user",
  authenticate,
  authorize("ADMIN"),
  validateRequest(createUserSchema),
  AuthController.createUser
);
router.get(
  "/list-users",
  authenticate,
  authorize("ADMIN"),
  AuthController.listUsers
);
router.patch(
  "/edit/:userId",
  authenticate,
  authorize("ADMIN"),
  validateRequest(editUserSchema),
  AuthController.editUser
);

export default router;
