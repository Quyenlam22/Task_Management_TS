"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const register = (req, res, next) => {
    if (!req.body.fullName) {
        res.json({
            code: 400,
            message: "Vui lòng nhập lại tên!"
        });
        return;
    }
    if (!req.body.email) {
        res.json({
            code: 400,
            message: "Vui lòng nhập lại email!"
        });
        return;
    }
    if (!req.body.password) {
        res.json({
            code: 400,
            message: "Vui lòng nhập lại mật khẩu!"
        });
        return;
    }
    next();
};
exports.register = register;
const login = (req, res, next) => {
    if (!req.body.email) {
        res.json({
            code: 400,
            message: "Vui lòng nhập lại email!"
        });
        return;
    }
    if (!req.body.password) {
        res.json({
            code: 400,
            message: "Vui lòng nhập lại mật khẩu!"
        });
        return;
    }
    next();
};
exports.login = login;
