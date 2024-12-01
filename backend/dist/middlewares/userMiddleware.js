"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMiddleware = userMiddleware;
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const JWT_SECRET = process.env.JWT_USER_SECRET;
function userMiddleware(req, res, next) {
    const token = req.headers.token || "";
    if (!token) {
        res.status(401).json({
            message: "Unauthorized"
        });
    }
    try {
        const decode = jsonwebtoken_1.default.verify(token.toString(), JWT_SECRET || "");
        if (decode) {
            req.userId = decode.userId;
            next();
        }
        else {
            res.status(401).json({
                message: "Unauthorized"
            });
        }
    }
    catch (error) {
        res.status(403).json({
            message: "invalid token"
        });
    }
}
