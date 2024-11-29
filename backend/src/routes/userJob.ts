import { Router, Request, Response } from 'express';
import { Job1 } from '../model/db';
import { userMiddleware } from '../middlewares/userMiddleware';

const userJobRouter = Router();

userJobRouter.post('/purchase',userMiddleware, async (req: Request, res: Response) => {
    try{
        const { jobId } = req.body;
        const userId = req.userId;
        const job = await Job1.findById(jobId);
        if (!job) {
            res.status(404).json({
                message: "Job not found"
            });
        }

        const user = await User.findById(userId);
        if (!user) {
            res.status(404).json({
                message: "User not found"
            });
        }

        const 
    }
})  








export default userJobRouter;