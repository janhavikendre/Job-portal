"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminMiddleware = adminMiddleware;
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const cors = require('cors');
dotenv_1.default.config();
const JWT_SECRET = process.env.JWT_SECRET_ADMIN;
function adminMiddleware(req, res, next) {
    const token = req.headers.token || "";
    if (!token) {
        res.status(401).json({
            message: "Unauthorized"
        });
    }
    try {
        const decode = jsonwebtoken_1.default.verify(token.toString(), JWT_SECRET || "");
        if (decode && decode.id) {
            req.userId = decode.id;
            next();
        }
        else {
            res.status(401).json({
                message: "Unauthorized"
            });
        }
    }
    catch (e) {
        res.status(403).json({
            message: "Invalid token"
        });
    }
}
