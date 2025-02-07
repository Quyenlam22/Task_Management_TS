import express, { Express, Request, Response } from "express";
import * as database from "./config/database";
import dotenv from "dotenv";
import Task from "./api/v1/models/task.model";

dotenv.config()

const app: Express = express();
const port: number | string = process.env.PORT || 3000;

database.connect();

app.get("/tasks", async (req: Request, res: Response) => {
    const tasks = await Task.find({
    })
    
    res.json({
        code: "200",
        message: "Success!",
        tasks: tasks
    });
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})