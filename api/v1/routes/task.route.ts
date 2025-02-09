import { Router } from "express";
import * as controller from "../controllers/task.controller";
import * as validate from "../validates/task.validate";
const router: Router = Router();

router.get("/", controller.index);

router.get("/detail/:id", controller.detail);

router.patch("/change-status/:id", controller.changeStatus);

router.patch("/change-multi", controller.changeMulti);

router.post("/create", validate.create, controller.create);

router.patch("/edit/:id", validate.edit, controller.edit);

router.delete("/delete/:id", controller.deleteTask);

export const taskRoutes: Router = router;