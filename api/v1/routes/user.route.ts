import { Router } from "express";
import * as controller from "../controllers/user.controller";
import * as authMiddleware from "../middlewares/auth.middleware";
import * as validate from "../validates/user.validate";
const router: Router = Router();

router.post("/register", validate.register, controller.register);

router.post("/login", validate.login, controller.login);

router.get("/detail", authMiddleware.requireAuth, controller.detail);

export const userRoutes: Router = router;