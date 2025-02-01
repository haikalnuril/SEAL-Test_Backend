const {task, project, user} = require('../models')

const createTask = async (req, res) => {
    try {
        const {name, description, status, projectId, deadline, userId} = req.body;
        if (!name || !description || !projectId || !deadline || !userId) {
            return res.status(400).json({
                status: "Failed",
                message: "Name, description, projectId, deadline, and userId are required"
            });
        }

        const newTask = await task.create({
            name,
            description,
            status,
            deadline,
            projectId,
            userId
        });
        return res.status(201).json({
            status: "Success",
            message: "Task created successfully",
            data: newTask
        })
    } catch (error) {
        return res.status(500).json({
            status: "Failed",
            message: error.message
        })
    }
}

const getTasks = async (req, res) => {
    try {
        const tasks = await task.findAll({
            include: [
                {
                    model: project,
                    as: "project",
                    attributes: ["id", "name", "description"]
                },
                {
                    model: user,
                    as: "user",
                    attributes: ["id", "name", "email"]
                }
            ]
        });
        return res.status(200).json({
            status: "Success",
            message: "Tasks retrieved successfully",
            data: tasks
        })
    } catch (error) {
        return res.status(500).json({
            status: "Failed",
            message: error.message
        })
    }
}

const getTaskById = async (req, res) => {
    try {
        const {id} = req.params;
        const taskData = await task.findByPk(id, {
            include: [
                {
                    model: project,
                    as: "project",
                    attributes: ["id", "name", "description"]
                },
                {
                    model: user,
                    as: "user",
                    attributes: ["id", "name", "email"]
                }
            ]
        });
        if (!taskData) {
            return res.status(404).json({
                status: "Failed",
                message: "Task not found"
            })
        }
        return res.status(200).json({
            status: "Success",
            message: "Task retrieved successfully",
            data: taskData
        })
    } catch (error) {
        return res.status(500).json({
            status: "Failed",
            message: error.message
        })
    }
}

const updateTask = async (req, res) => {
    try {
        const {id} = req.params;
        const {name, status, description, projectId, deadline, userId} = req.body;

        const updateData = {};
        if (name) updateData.name = name;
        if (status) updateData.status = status;
        if (description) updateData.description = description;
        if (deadline) updateData.deadline = deadline;

        if (projectId) {
            const projectData = await project.findByPk(projectId);
            if (!projectData) {
            return res.status(404).json({
                status: "Failed",
                message: "Project not found"
            });
            }
            updateData.projectId = projectId;
        }

        if (userId) {
            const userData = await user.findByPk(userId);
            if (!userData) {
            return res.status(404).json({
                status: "Failed",
                message: "User not found"
            });
            }
            updateData.userId = userId;
        }




        const taskData = await task.findByPk(id);
        if (!taskData) {
            return res.status(404).json({
                status: "Failed",
                message: "Task not found"
            })
        }
        await taskData.update({
            name,
            status,
            description,
            deadline,
            projectId,
            userId
        });
        return res.status(200).json({
            status: "Success",
            message: "Task updated successfully",
            data: taskData
        })
    } catch (error) {
        return res.status(500).json({
            status: "Failed",
            message: error.message
        })
    }
}

const deleteTask = async (req, res) => {
    try {
        const {id} = req.params;
        const taskData = await task.findByPk(id);
        if (!taskData) {
            return res.status(404).json({
                status: "Failed",
                message: "Task not found"
            })
        }
        await taskData.destroy();
        return res.status(200).json({
            status: "Success",
            message: "Task deleted successfully"
        })
    } catch (error) {
        return res.status(500).json({
            status: "Failed",
            message: error.message
        })
    }
}

module.exports = { createTask, getTasks, getTaskById, updateTask, deleteTask }