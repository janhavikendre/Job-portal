import express from 'express';
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import jwt, { JwtPayload } from 'jsonwebtoken';

dotenv.config();                        
const JWT_SECRET = process.env.JWT_SECRET;

interface CustomRequest extends Request {
    userId?: string;
}

export function userMiddleware(req: CustomRequest, res: Response, next: NextFunction): void {
    const token = req.headers.token || "";

    if (!token) {
        res.status(401).json({
            message: "Unauthorized"
        });
    }   

    try {
        const decode = jwt.verify(token.toString(), JWT_SECRET || "") as JwtPayload;
        if (decode) {
            
        
        req.userId = decode.userId;
        next();   
        } else{
            res.status(401).json({
                message: "Unauthorized"
            });
        }  

    } catch (error) {
        res.status(403).json({
            message: "invalid token"
        });

    }                       

}  

