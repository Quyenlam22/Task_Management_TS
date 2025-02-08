import { Request, Response } from "express";
import Task from "../models/task.model";

//[GET] api/v1/tasks
export const index = async (req: Request, res: Response) => {
    let find = {
        deleted: false
    }

    if(req.query.status){
        find["status"] = req.query.status;
    }

    let sort = {};
    if(req.query.sortKey && req.query.sortValue) {
        sort[req.query.sortKey.toString()] = req.query.sortValue;
    }

    const tasks = await Task.find(find).sort(sort);
    
    res.json({
        code: "200",
        message: "Success!",
        tasks: tasks
    });
}

//[GET] api/v1/tasks/detail/:id
export const detail = async (req: Request, res: Response) => {
    const id: string = req.params.id;
    
    const task = await Task.findOne({
        _id: id,
        deleted: false
    });
    
    res.json({
        code: "200",
        message: "Success!",
        task: task
    });
}

