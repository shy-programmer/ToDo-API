const e = require('express');
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    state: { type: String, enum: ['pending', 'completed', 'deleted'], default: 'pending' },
}, { timestamps: true });

const TaskModel = mongoose.model('Task', taskSchema);

module.exports = TaskModel;

