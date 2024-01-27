import { PRIORITY, TASK_STATUS } from "../../constant";

const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    priority: {
        type: Number,
        enum: PRIORITY,
        default: PRIORITY.MAJOR,
        required: true,
    },
    status: {
        type: String,
        enum: TASK_STATUS,
        default: TASK_STATUS.PENDING,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    },
    updatedAt: {
        type: Date,
        default: Date.now,
        required: true
    },
});

export const Task = mongoose.model('Tasks', TaskSchema);
