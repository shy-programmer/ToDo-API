const TaskModel = require('./tasks.model');

// Create a new task
const createTask = async (req, res) => {
    const {content } = req.body;
    const userId = req.user.id;
    if (!userId || !content) {
        return res.status(400).json({ message: 'User ID and content are required' });
    }
    try{
    const newTask = await TaskModel.create({ userId, content });
    res.render("create", { 
        message: 'Task created successfully',
        newTask,
        user: req.user
    });}
    catch (error) {
        res.status(500).json({ 
            message: 'Server error', 
            error: error.message 
        });
    }
}

// Get all tasks for a user
const getUserTasks = async (req, res) => {
    const userId = req.user.id;
    const { state, limit = 10, page = 1 } = req.query;
    const query = {};

    if (!userId) {
        return res.status(400).json({ message: 'Please login!' });
    }
    if (state) {
        if (state === "deleted") {
            return res.status(400).json({ message: 'Check recycle bin: feature coming soon...' });
        }
        query.state = state;
    } else {
        query.state = { $ne: "deleted" };
    }
    const skip = (Number(page) - 1) * Number(limit);
    query.userId = userId;
    try{
    const tasks = await TaskModel.find(query).skip(skip).limit(limit).sort({ createdAt: -1 });
    res.render('index', {
        message: 'Tasks retrieved successfully',
        tasks,
        query,
        user: req.user
    })
}
    catch (error) {
        res.status(500).json({ 
            message: 'Server error',
            error: error.message 
        });
    }
}

// Update a task's content or state
const updateTaskState = async (req, res) => {
    const { taskId } = req.params; 
    const { state } = req.body;
    const updatedData = {};
    const validStates = ['pending', 'completed', 'deleted'];
     if (state) {
        if (!validStates.includes(state)) {
            return res.status(400).json({ message: `Invalid state. Must be one of: ${validStates.join(', ')}` });
        }
        updatedData.state = state;
    }
    if (!state) {
        return res.status(400).json({ message: 'New state is required to update' });
    }

    try{
    const updatedTask = await TaskModel.findOneAndUpdate({ _id: taskId, }, updatedData, { new: true });
    if
    (!updatedTask) {
        return res.status(404).json({ message: 'Task not found' });
    }
    res.render('update', { 
        message: 'Task updated successfully',
        updatedTask,
        user: req.user
    });}
    catch (error) {
        res.status(500).json({ 
            message: 'Server error',
            error: error.message 
        });
    }
}

module.exports = {
    createTask,
    getUserTasks,
    updateTaskState
};