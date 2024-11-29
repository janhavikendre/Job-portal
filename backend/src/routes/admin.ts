import { Router } from 'express';
import type { Request, Response } from 'express';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import { Admin1 } from '../model/db';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key';

const adminRouter1 = Router();

import  adminRouter  from './adminJob';

adminRouter1.use('/job', adminRouter);

adminRouter1.post('/signup', async (req: Request, res: Response): Promise<void> => {
    try {
        const requiredbody = z.object({
            name: z.string().min(1),
            email: z.string().email(),
            password: z.string().min(8),
            image: z.string().optional(),
        });

        const parsedbody = await requiredbody.safeParse(req.body);

        if (!parsedbody.success) {
             res.status(400).json({
                message: "Invalid request body",
                error: parsedbody.error,
            });
        } 
        const { name, email, password, image } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const admin = await Admin1.create({
            name: name,
            email: email,
            password: hashedPassword,
            image: image,
        });

        const token = await jwt.sign({
            id: admin._id,
        }, JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({
            message: "Admin created successfully",
            admin,
            _id: admin._id,
            token: token,
        });

    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error,
        });
    }
})


adminRouter1.post('/login', async (req: Request, res: Response): Promise<void> => {
    try {
        const requiredbody = z.object({
            email: z.string().email(),
            password: z.string().min(8),
        });

        const parsedbody = await requiredbody.safeParse(req.body);

        if (!parsedbody.success) {
            res.status(400).json({
                message: "Invalid request body",
                error: parsedbody.error,
            });
        }
           const { email, password } = req.body;
           const admin = await Admin1.findOne({ email: email });

           if (!admin) {
            res.status(401).json({
                message: "Invalid email or password",
            });
           } else {

            const token = await jwt.sign({
                id: admin._id,
            }, JWT_SECRET, { expiresIn: '1h' });

            res.status(200).json({
                message: "Login successful",
                token: token,
                admin,
                _id: admin._id,
            });
           }
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error,
        });
    }
})

adminRouter1.put('/update', async function(req: Request, res: Response): Promise<void> {
        try {
           const { name, email, password, image } = req.body;
           const admin = await Admin1.findOne({ email: email });
           if (!admin) {
            res.status(404).json({
                message: "Admin not found",
            });
           } else {
            const updatedAdmin = await Admin1.findByIdAndUpdate(admin._id, { name, email, password, image }, { new: true });
            res.status(200).json({
                message: "Admin updated successfully",
                admin: updatedAdmin,
            });
           }    
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error,
        });
    }
})

adminRouter1.delete('/delete', async function(req: Request, res: Response): Promise<void> {
    try {
        const { email } = req.body;
        const admin = await Admin1.findOne({ email: email });
        if (!admin) {
            res.status(404).json({
                message: "Admin not found",
            });
        } else {    
            await Admin1.findByIdAndDelete(admin._id);
            res.status(200).json({
                message: "Admin deleted successfully",
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error,
        });
    }
})

export default adminRouter1;
