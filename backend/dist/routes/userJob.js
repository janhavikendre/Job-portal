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
const db_1 = require("../model/db");
const db_2 = require("../model/db");
const db_3 = require("../model/db");
const express_1 = require("express");
const userMiddleware_1 = require("../middlewares/userMiddleware");
const userRouter1 = (0, express_1.Router)();
userRouter1.get('/all', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jobs = yield db_1.Admin.find();
        res.status(200).json({
            message: "All jobs",
            jobs,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error,
        });
    }
}));
userRouter1.post('/apply', userMiddleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.userId) !== null && _a !== void 0 ? _a : '';
        const { jobId } = req.body;
        const user = yield db_3.User1.findById(userId);
        const job = yield db_1.Admin.findById(jobId);
        if (!user || !job) {
            res.status(404).json({ message: 'User or Job not found' });
        }
        if (!job) {
            res.status(404).json({ message: 'Job not found' });
            return;
        }
        const updatedUser = yield db_2.Job1.findOneAndUpdate({ _id: userId }, {
            $push: {
                appliedJobs: {
                    jobId: job._id,
                },
            },
        }, { new: true });
        res.status(200).json({
            message: 'Job application submitted successfully',
            appliedJob: updatedUser,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error,
        });
    }
}));
exports.default = userRouter1;
