import mongoose from 'mongoose';
import { ObjectId, Types } from "mongoose";

const UserSchema = new mongoose.Schema({
   email: { type: String, required: true, unique: true },
   password: { type: String, required: true },
    username: { type: String, required: true },
    image: { type: String },
})

export const User1 = mongoose.model('User1', UserSchema);

const AdminSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
      },
      description: {
        type: String,
        required: true,
      },
      company: {
        type: String,
        required: true,
        trim: true,
      },
      location: {
        type: String,
        required: true,
        trim: true,
      },
      salary: {
        type: Number,
        required: true,
      },
      jobType: {
        type: String, 
        required: true,
      },
      createdBy: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Admin',
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
      updatedAt: {
        type: Date,
        default: Date.now,
      },
})

export const Admin = mongoose.model('Admin', AdminSchema);

const admin1Schema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String },
})

export const Admin1 = mongoose.model('Admin1', admin1Schema);   
