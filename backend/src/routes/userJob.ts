import {Admin} from '../model/db';
import { Job1 } from '../model/db';
import { User1 } from '../model/db';
import { Router } from 'express';
import { Request, Response } from 'express';
import { userMiddleware } from '../middlewares/userMiddleware';

const userRouter1 = Router();

interface CustomRequest extends Request {
    userId?: string;
}

 userRouter1.get('/all', async (req: CustomRequest, res: Response) => {
    try{
      const jobs = await Admin.find();
      res.status(200).json({
          message: "All jobs",
          jobs,
      });
    }catch(error){
        res.status(500).json({
            message: "Something went wrong",
            error,
        });
    }
 })

 userRouter1.post('/apply',userMiddleware,async(req: CustomRequest, res: Response): Promise<void> => {
    try{
        const userId = req.userId ?? '';
        const { jobId } = req.body;
        const user = await User1.findById(userId);
        const job = await Admin.findById(jobId);
        if (!user || !job) {
            res.status(404).json({ message: 'User or Job not found' });
          }
    
          if (!job) {
            res.status(404).json({ message: 'Job not found' });
            return;
          }

          const updatedUser = await Job1.findOneAndUpdate(
            { _id: userId }, 
            {
              $push: {
                appliedJobs: {
                  jobId: job._id,
                },
              },
            },
            { new: true } 
          );
         res.status(200).json({
            message: 'Job application submitted successfully',
            appliedJob: updatedUser,
          });
      } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error,
        });
    }
 })

 export default userRouter1;