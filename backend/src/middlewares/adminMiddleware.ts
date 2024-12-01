import express from 'express';
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import jwt, { JwtPayload } from 'jsonwebtoken';
const cors = require('cors');


dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET_ADMIN;

interface CustomRequest extends Request {
    userId?: string;
}    

export function adminMiddleware(req: CustomRequest, res: Response, next: NextFunction): void {
    const token = req.headers.token || "";
    
    if (!token) {
         res.status(401).json({
            message: "Unauthorized"
        });
    }

    try {
        const decode = jwt.verify(token.toString(), JWT_SECRET || "") as JwtPayload;


        if (decode && decode.id) {
            req.userId = decode.id;
            next();
        } else {
             res.status(401).json({
                message: "Unauthorized"
            });
        }
    } catch (e) {

        res.status(403).json({
            message: "Invalid token"
        })
    }
}

