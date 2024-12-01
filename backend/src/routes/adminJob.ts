import { Router } from 'express';
import { Admin } from '../model/db';
import { Request, Response } from 'express';
import { adminMiddleware } from '../middlewares/adminMiddleware';

const adminRouter = Router();

interface CustomRequest extends Request {
    userId?: string;
}

adminRouter.post('/create', adminMiddleware, async (req: CustomRequest, res: Response) => {
    try {
        const userId = req.userId ?? '';
        const { title, description, company, location, salary, jobType } = req.body;
        const admin = await Admin.create({
        title,
        description,
        company,
        location,
        salary,
        jobType,
        createdBy: userId,
      });

      if (admin) {
          res.status(201).json({
              message: "Job created successfully",
              admin,
              _id: (admin as any)._id,
          });
      }
 }
    catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: (error as Error).message
        });
    }

})

adminRouter.put('/update/:id',adminMiddleware, async (req: CustomRequest, res: Response) => {
    try { 
        const userId = req.userId ?? '';
        const { id } = req.params;
        const { title, description, company, location, salary, jobType } = req.body;
        const admin = await Admin.findOneAndUpdate(
            { _id: id, createdBy: userId },
            { title, description, company, location, salary, jobType },
            { new: true }
)
        if (admin) {
            res.status(200).json({
                message: "blog updated successfully",
                admin,
                _id: (admin as any)._id
            });
        } else {
            res.status(404).json({
                message: "blog not found",
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error,
        });
    }

})

adminRouter.delete('/delete/:id',adminMiddleware, async (req: CustomRequest, res: Response) => {
    try {
        const userId = req.userId ?? '';
        const { id } = req.params;
        const admin = await Admin.findOneAndDelete({
            _id: id,
            createdBy: userId,
        });
        if (admin) {
            res.status(200).json({
                message: "blog deleted successfully",
                admin,
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error,
        });
    }
})

adminRouter.get('/all', adminMiddleware, async (req: CustomRequest, res: Response) => {
    try {
        const userId = req.userId ?? '';
        const allAdmins = await Admin.find({
            createdBy: userId,
        });
        res.status(200).json({
            message: "Admins fetched successfully",
            admins: allAdmins
        });
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error,
        });
    }
})

export default adminRouter;