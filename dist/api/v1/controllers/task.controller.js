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
exports.deleteTask = exports.edit = exports.create = exports.changeMulti = exports.changeStatus = exports.detail = exports.index = void 0;
const task_model_1 = __importDefault(require("../models/task.model"));
const pagination_1 = __importDefault(require("../helpers/pagination"));
const search_1 = __importDefault(require("../helpers/search"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let find = {
            deleted: false
        };
        if (req.query.status) {
            find["status"] = req.query.status;
        }
        let sort = {};
        if (req.query.sortKey && req.query.sortValue) {
            sort[req.query.sortKey.toString()] = req.query.sortValue;
        }
        const countRecords = yield task_model_1.default.countDocuments(find);
        let objectPagination = (0, pagination_1.default)({
            currentPage: 1,
            limitItems: 2
        }, req.query, countRecords);
        const objectSearch = (0, search_1.default)(req.query);
        if (req.query.keyword) {
            find["title"] = objectSearch.regex;
        }
        const tasks = yield task_model_1.default.find(find).sort(sort).limit(objectPagination.limitItems).skip(objectPagination.skip);
        res.json({
            code: "200",
            message: "Success!",
            tasks: tasks
        });
    }
    catch (error) {
        res.json({
            code: "400",
            message: "Error!"
        });
    }
});
exports.index = index;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const task = yield task_model_1.default.findOne({
            _id: id,
            deleted: false
        });
        res.json({
            code: "200",
            message: "Success!",
            task: task
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
const changeStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        yield task_model_1.default.updateOne({
            _id: id
        }, {
            status: req.body.status
        });
        res.json({
            code: "200",
            message: "Success!"
        });
    }
    catch (error) {
        res.json({
            code: "400",
            message: "Error!"
        });
    }
});
exports.changeStatus = changeStatus;
const changeMulti = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ids = req.body.ids;
        const key = req.body.key;
        const value = req.body.value;
        switch (key) {
            case "status":
                yield task_model_1.default.updateMany({
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
                yield task_model_1.default.updateMany({
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
    }
    catch (error) {
        res.json({
            code: "400",
            message: "Error!"
        });
    }
});
exports.changeMulti = changeMulti;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task = new task_model_1.default(req.body);
        yield task.save();
        res.json({
            code: "200",
            message: "Success!",
            task: task
        });
    }
    catch (error) {
        res.json({
            code: "400",
            message: "Error!"
        });
    }
});
exports.create = create;
const edit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield task_model_1.default.updateOne({
            _id: req.params.id
        }, req.body);
        res.json({
            code: "200",
            message: "Success!"
        });
    }
    catch (error) {
        res.json({
            code: "400",
            message: "Error!"
        });
    }
});
exports.edit = edit;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield task_model_1.default.updateOne({
            _id: req.params.id
        }, {
            deleted: true,
            deletedAt: new Date()
        });
        res.json({
            code: "200",
            message: "Success!"
        });
    }
    catch (error) {
        res.json({
            code: "400",
            message: "Error!"
        });
    }
});
exports.deleteTask = deleteTask;
