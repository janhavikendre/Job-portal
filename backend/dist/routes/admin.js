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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = require("../model/db");
const adminMiddleware_1 = require("../middlewares/adminMiddleware");
const adminRouter = (0, express_1.Router)();
adminRouter.post('/create', adminMiddleware_1.adminMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.userId) !== null && _a !== void 0 ? _a : '';
        const { title, description, content, author, date, category, tags } = req.body;
        const admin = yield db_1.Admin.create({
            title,
            description,
            content,
            author,
            date,
            category,
            tags,
            user: userId,
        });
        if (admin) {
            res.status(201).json({
                message: "blog created successfully",
                admin,
                _id: admin._id,
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error,
        });
    }
}));
adminRouter.put('/update/:id', adminMiddleware_1.adminMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.userId) !== null && _a !== void 0 ? _a : '';
        const { id } = req.params;
        const { title, description, content, author, date, category, tags } = req.body;
        const admin = yield db_1.Admin.findOneAndUpdate({ _id: id,
            user: userId
        }, {
            title,
            description,
            content,
            author,
            date,
            category,
            tags,
        }, {
            new: true,
        });
        if (admin) {
            res.status(200).json({
                message: "blog updated successfully",
                admin,
                _id: admin._id
            });
        }
        else {
            res.status(404).json({
                message: "blog not found",
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error,
        });
    }
}));
adminRouter.delete('/delete/:id', adminMiddleware_1.adminMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.userId) !== null && _a !== void 0 ? _a : '';
        const { id } = req.params;
        const admin = yield db_1.Admin.findOneAndDelete({
            _id: id,
            user: userId,
        });
        if (admin) {
            res.status(200).json({
                message: "blog deleted successfully",
                admin,
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error,
        });
    }
}));
adminRouter.get('/all', adminMiddleware_1.adminMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.userId) !== null && _a !== void 0 ? _a : '';
        const allAdmins = yield db_1.Admin.find({
            user: userId,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error,
        });
    }
}));
exports.default = adminRouter;
