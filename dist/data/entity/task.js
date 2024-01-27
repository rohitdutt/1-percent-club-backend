"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
const constant_1 = require("../../constant");
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
        enum: constant_1.PRIORITY,
        default: constant_1.PRIORITY.MAJOR,
        required: true,
    },
    status: {
        type: String,
        enum: constant_1.TASK_STATUS,
        default: constant_1.TASK_STATUS.PENDING,
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
exports.Task = mongoose.model('Tasks', TaskSchema);
