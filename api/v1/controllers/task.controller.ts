import { Request, Response } from "express";
import Task from "../models/task.model";
import paginationHelper from "../helpers/pagination";
import searchHelper from "../helpers/search";

//[GET] api/v1/tasks
export const index = async (req: Request, res: Response) => {
    let find = {
        deleted: false
    }

    if (req.query.status) {
        find["status"] = req.query.status;
    }

    let sort = {};
    if (req.query.sortKey && req.query.sortValue) {
        sort[req.query.sortKey.toString()] = req.query.sortValue;
    }

    //Pagination
    const countRecords = await Task.countDocuments(find)
    let objectPagination = paginationHelper({
        currentPage: 1,
        limitItems: 2
    },
        req.query,
        countRecords
    )

    // Search
    const objectSearch = searchHelper(req.query)
    if (req.query.keyword) {
        find["title"] = objectSearch.regex
    }

    const tasks = await Task.find(find).sort(sort).limit(objectPagination.limitItems).skip(objectPagination.skip);

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

