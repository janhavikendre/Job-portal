import { Request, Response, Router } from 'express';
import dotenv from 'dotenv';
import Zod from 'zod';
import jwt from 'jsonwebtoken';
import { User1 } from '../model/db';
dotenv.config();

const router = Router();

router.post('/signup', async (req: Request, res: Response) => {
    try {
        const user = Zod.object({
            email: Zod.string().email(),
            password: Zod.string().min(6).max(20),
            username: Zod.string().min(3).max(20),
            image: Zod.string().optional()

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

    const user1 = await User1.create({
        email,
        password,
        username,
        image,
    })

    const token = jwt.sign(
        { id: user1._id },
        process.env.JWT_SECRET!, // Add non-null assertion since we know JWT_SECRET is defined
        { expiresIn: '1d' }
    );

    res.status(201).json({
        message: "User created successfully",
        token,
        user1,
    });
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error,
        });
    }


    
})

router.post('/login', async (req: Request, res: Response) => {
    try {
        const user2 = Zod.object({
            email: Zod.string().email(),
            password: Zod.string().min(6).max(20),
        })

        const SafeParse = user2.safeParse(req.body);

        if (!SafeParse.success) {
            res.status(400).json({
                message: "Validation failed",
                error: SafeParse.error,
            });
            return;
        }

        const { email, password } = SafeParse.data;

        const user1 = await User1.findOne({
            email,
            password,
        })

        if (user1) {
            const token = jwt.sign({
                id: user1._id,
            }, process.env.JWT_SECRET!,
             { expiresIn: '1d' });

            res.status(200).json({
                message: "User logged in successfully",
                token,
                user1,
            });


        } else {
            res.status(400).json({
                message: "User not found",
            });
        }


    } catch(error) {
        res.status(500).json({
            message: "Something went wrong",
            error,
        });
    }
})

router.get('/update', async (req: Request, res: Response) => {
    
    const { email, password, username, image } = req.body;
    const user1 = await User1.findOne({ email: email });    
    if (!user1) {
        res.status(404).json({
            message: "User not found",
        });
    } else {
        const updatedUser = await User1.findOneAndUpdate({ email: email }, { password, username, image }, { new: true });
        res.status(200).json({
            message: "User updated successfully",
            updatedUser,
        });
    }
})

router.delete('/delete', async (req: Request, res: Response) => {
    const { email } = req.body;
    const user1 = await User1.findOne({ email: email });
    if (!user1) {
        res.status(404).json({
            message: "User not found",
        });
    } else {
        await User1.findByIdAndDelete(user1._id);
        res.status(200).json({
            message: "User deleted successfully",
        });
    }       
})  

export default router;