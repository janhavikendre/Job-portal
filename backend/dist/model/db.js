"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Admin1 = exports.Admin = exports.Job1 = exports.User1 = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String, required: true },
    image: { type: String },
});
exports.User1 = mongoose_1.default.model('User1', UserSchema);
const JobSchema = new mongoose_1.default.Schema({
    wishlist: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Job',
        }],
    appliedJobs: [{
            jobId: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: 'Job',
            },
            appliedAt: {
                type: Date,
                default: Date.now,
            },
            status: {
                type: String,
                enum: ['Pending', 'Interview', 'Rejected', 'Accepted'],
                default: 'Pending',
            },
        }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
exports.Job1 = mongoose_1.default.model('Job1', JobSchema);
const AdminSchema = new mongoose_1.default.Schema({
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
        type: mongoose_1.default.Schema.Types.ObjectId,
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
});
exports.Admin = mongoose_1.default.model('Admin', AdminSchema);
const admin1Schema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String },
});
exports.Admin1 = mongoose_1.default.model('Admin1', admin1Schema);
