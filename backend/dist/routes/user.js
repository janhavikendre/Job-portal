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
const express_1 = require("express");
const dotenv_1 = __importDefault(require("dotenv"));
const zod_1 = __importDefault(require("zod"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("../model/db");
dotenv_1.default.config();
const router = (0, express_1.Router)();
router.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = zod_1.default.object({
            email: zod_1.default.string().email(),
            password: zod_1.default.string().min(6).max(20),
            username: zod_1.default.string().min(3).max(20),
            image: zod_1.default.string().url().optional()
        });
        const SafeParse = user.safeParse(req.body);
        if (!SafeParse.success) {
            res.status(400).json({
                message: "Validation failed",
                error: SafeParse.error,
            });
            return;
        }
        const { email, password, username, image } = SafeParse.data;
        const user1 = yield db_1.User1.create({
            email,
            password,
            username,
            image,
        });
        const token = jsonwebtoken_1.default.sign({ id: user1._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.status(201).json({
            message: "User created successfully",
            token,
            user1,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error,
        });
    }
}));
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user2 = zod_1.default.object({
            email: zod_1.default.string().email(),
            password: zod_1.default.string().min(6).max(20),
        });
        const SafeParse = user2.safeParse(req.body);
        if (!SafeParse.success) {
            res.status(400).json({
                message: "Validation failed",
                error: SafeParse.error,
            });
            return;
        }
        const { email, password } = SafeParse.data;
        const user1 = yield db_1.User1.findOne({
            email,
            password,
        });
        if (user1) {
            const token = jsonwebtoken_1.default.sign({
                id: user1._id,
            }, process.env.JWT_SECRET, { expiresIn: '1d' });
            res.status(200).json({
                message: "User logged in successfully",
                token,
                user1,
            });
        }
        else {
            res.status(400).json({
                message: "User not found",
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
exports.default = router;
