import { NextFunction, Request, Response } from "express";

export const create = (req: Request, res: Response, next: NextFunction): Promise<void> => {
    if(!req.body.title){
        res.json({
            code: 400,
            message: "Vui lòng nhập lại tiêu đề!"
        })
        return
    }
    if(!req.body.content){
        res.json({
            code: 400,
            message: "Vui lòng nhập lại nội dung!"
        })
        return
    }

    next()
}

export const edit = (req: Request, res: Response, next: NextFunction): Promise<void> => {
    if(!req.body.title){
        res.json({
            code: 400,
            message: "Vui lòng nhập lại tiêu đề!"
        })
        return
    }
    if(!req.body.content){
        res.json({
            code: 400,
            message: "Vui lòng nhập lại nội dung!"
        })
        return
    }

    next()
}