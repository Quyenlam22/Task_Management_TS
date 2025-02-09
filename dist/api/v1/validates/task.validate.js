"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.edit = exports.create = void 0;
const create = (req, res, next) => {
    if (!req.body.title) {
        res.json({
            code: 400,
            message: "Vui lòng nhập lại tiêu đề!"
        });
        return;
    }
    if (!req.body.content) {
        res.json({
            code: 400,
            message: "Vui lòng nhập lại nội dung!"
        });
        return;
    }
    next();
};
exports.create = create;
const edit = (req, res, next) => {
    if (!req.body.title) {
        res.json({
            code: 400,
            message: "Vui lòng nhập lại tiêu đề!"
        });
        return;
    }
    if (!req.body.content) {
        res.json({
            code: 400,
            message: "Vui lòng nhập lại nội dung!"
        });
        return;
    }
    next();
};
exports.edit = edit;
