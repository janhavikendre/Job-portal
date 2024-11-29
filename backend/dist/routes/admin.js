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
const zod_1 = require("zod");
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = require("../model/db");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key';
const adminRouter1 = (0, express_1.Router)();
const adminJob_1 = __importDefault(require("./adminJob"));
adminRouter1.use('/job', adminJob_1.default);
adminRouter1.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const requiredbody = zod_1.z.object({
            name: zod_1.z.string().min(1),
            email: zod_1.z.string().email(),
            password: zod_1.z.string().min(8),
            image: zod_1.z.string().optional(),
        });
        const parsedbody = yield requiredbody.safeParse(req.body);
        if (!parsedbody.success) {
            res.status(400).json({
                message: "Invalid request body",
                error: parsedbody.error,
            });
        }
        const { name, email, password, image } = req.body;
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const admin = yield db_1.Admin1.create({
            name: name,
            email: email,
            password: hashedPassword,
            image: image,
        });
        if (admin) {
            res.status(201).json({
                message: "Admin created successfully",
                admin,
                _id: admin._id,
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error,
        });
    }
}));
adminRouter1.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const requiredbody = zod_1.z.object({
            email: zod_1.z.string().email(),
            password: zod_1.z.string().min(8),
        });
        const parsedbody = yield requiredbody.safeParse(req.body);
        if (!parsedbody.success) {
            res.status(400).json({
                message: "Invalid request body",
                error: parsedbody.error,
            });
        }
        const { email, password } = req.body;
        const admin = yield db_1.Admin1.findOne({ email: email });
        if (!admin) {
            res.status(401).json({
                message: "Invalid email or password",
            });
        }
        else {
            const token = yield jsonwebtoken_1.default.sign({
                id: admin._id,
            }, JWT_SECRET, { expiresIn: '1h' });
            res.status(200).json({
                message: "Login successful",
                token: token,
                admin,
                _id: admin._id,
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error,
        });
    }
}));
adminRouter1.put('/update', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, email, password, image } = req.body;
            const admin = yield db_1.Admin1.findOne({ email: email });
            if (!admin) {
                res.status(404).json({
                    message: "Admin not found",
                });
            }
            else {
                const updatedAdmin = yield db_1.Admin1.findByIdAndUpdate(admin._id, { name, email, password, image }, { new: true });
                res.status(200).json({
                    message: "Admin updated successfully",
                    admin: updatedAdmin,
                });
            }
        }
        catch (error) {
            res.status(500).json({
                message: "Internal server error",
                error: error,
            });
        }
    });
});
adminRouter1.delete('/delete', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email } = req.body;
            const admin = yield db_1.Admin1.findOne({ email: email });
            if (!admin) {
                res.status(404).json({
                    message: "Admin not found",
                });
            }
            else {
                yield db_1.Admin1.findByIdAndDelete(admin._id);
                res.status(200).json({
                    message: "Admin deleted successfully",
                });
            }
        }
        catch (error) {
            res.status(500).json({
                message: "Internal server error",
                error: error,
            });
        }
    });
});
exports.default = adminRouter1;
