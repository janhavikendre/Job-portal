import  express  from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import adminRouter from "./routes/adminJob";
import router from "./routes/user";
import cors from "cors";
const app = express();
import userJobRouter from "./routes/userJob";



app.use(cors());

app.use(express.json());

app.use('/user', router);
app.use('/admin', adminRouter);
app.use('/userJob', userJobRouter);

const Mongo = process.env.MONGO_URL;

async function main() {
  try{
    const connected = await mongoose.connect(Mongo || '');
    console.log("Connected to database");
  } catch (error) {
    console.log("Error connecting to database", error);
  }
}    

main();

app.listen(3000, () => {
    console.log("Server is running on port 3000");
    });