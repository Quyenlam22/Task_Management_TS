"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.detail = exports.login = exports.register = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const md5_1 = __importDefault(require("md5"));
const generate_1 = require("../helpers/generate");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existUser = yield user_model_1.default.findOne({
            email: req.body.email,
            deleted: false
        });
        if (existUser) {
            res.json({
                code: 400,
                message: "Email existed!"
            });
        }
        else {
            req.body.password = (0, md5_1.default)(req.body.password);
            const user = new user_model_1.default({
                fullName: req.body.fullName,
                email: req.body.email,
                password: req.body.password,
                token: (0, generate_1.generateRandomString)(20)
            });
            yield user.save();
            res.json({
                code: "200",
                message: "Success!",
                token: user.token
            });
        }
    }
    catch (error) {
        res.json({
            code: "400",
            message: "Error!"
        });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.default.findOne({
            email: req.body.email,
            deleted: false
        });
        if (!user) {
            res.json({
                code: 400,
                message: "Not found account!"
            });
        }
        else {
            req.body.password = (0, md5_1.default)(req.body.password);
            if (user.password !== req.body.password) {
                res.json({
                    code: 400,
                    message: "Error password!"
                });
                return;
            }
            res.json({
                code: 200,
                message: "Success!",
                token: user.token
            });
        }
    }
    catch (error) {
        res.json({
            code: "400",
            message: "Error!"
        });
    }
});
exports.login = login;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json({
            code: 200,
            message: "Success!",
            info: req["user"]
        });
    }
    catch (error) {
        res.json({
            code: "400",
            message: "Error!"
        });
    }
});
exports.detail = detail;
