import { taskRoutes } from "./task.route";
import { Express } from "express";
import Task from "../models/task.model";

const mainV1Routes = (app: Express): void => {
    const version = "/api/v1";

    app.use(version + "/tasks", taskRoutes);
}

export default mainV1Routes;