import { Request, Response } from "express";
import Task from "../models/task.model";
import paginationHelper from "../helpers/pagination";
import searchHelper from "../helpers/search";

//[GET] api/v1/tasks
export const index = async (req: Request, res: Response) => {
    try {
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
    } catch (error) {
        res.json({
            code: "400",
            message: "Error!"
        });
    }
}

//[GET] api/v1/tasks/detail/:id
export const detail = async (req: Request, res: Response) => {
    try {
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
    } catch (error) {
        res.json({
            code: "400",
            message: "Error!"
        });
    }
}

//[PATCH] api/v1/tasks/change-status/:id
export const changeStatus = async (req: Request, res: Response) => {
    try {
        const id: string = req.params.id;

        await Task.updateOne({
            _id: id
        }, {
            status: req.body.status
        });

        res.json({
            code: "200",
            message: "Success!"
        });
    } catch (error) {
        res.json({
            code: "400",
            message: "Error!"
        });
    }
}

//[PATCH] api/v1/tasks/change-multi
export const changeMulti = async (req: Request, res: Response) => {
    try {
        const ids: string[] = req.body.ids;
        const key: string = req.body.key;
        const value: string = req.body.value;

        switch (key) {
            case "status":
                await Task.updateMany({
                    _id: { $in: ids }
                }, {
                    status: value
                });
                res.json({
                    code: "200",
                    message: "Success!"
                });
                break;
            case "delete":
                await Task.updateMany({
                    _id: { $in: ids }
                }, {
                    deleted: true
                });
                res.json({
                    code: "200",
                    message: "Success!"
                });
                break;
            default:
                res.json({
                    code: "400",
                    message: "Error!"
                });
                break;
        }
    } catch (error) {
        res.json({
            code: "400",
            message: "Error!"
        });
    }
}

//[POST] api/v1/tasks/create
export const create = async (req: Request, res: Response) => {
    try {
        const task = new Task(req.body);
        await task.save();

        res.json({
            code: "200",
            message: "Success!",
            task: task
        });
    } catch (error) {
        res.json({
            code: "400",
            message: "Error!"
        });
    }
}

//[PATCH] api/v1/tasks/edit/:id
export const edit = async (req: Request, res: Response) => {
    try {
        await Task.updateOne({
            _id: req.params.id
        }, req.body);

        res.json({
            code: "200",
            message: "Success!"
        });
    } catch (error) {
        res.json({
            code: "400",
            message: "Error!"
        });
    }
}

//[PATCH] api/v1/tasks/delete/:id
export const deleteTask = async (req: Request, res: Response) => {
    try {
        await Task.updateOne({
            _id: req.params.id
        }, {
            deleted: true,
            deletedAt: new Date()
        });

        res.json({
            code: "200",
            message: "Success!"
        });
    } catch (error) {
        res.json({
            code: "400",
            message: "Error!"
        });
    }
}

