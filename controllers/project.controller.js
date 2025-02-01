const {project} = require("../models");

const createProject = async (req, res) => {
    try {
        const {name, description} = req.body;

        if(!name || !description) {
            return res.status(400).json({
                status: "Failed",
                message: "Name and description are required"
            });
        }

        const newProject = await project.create({
            name,
            description
        });
        return res.status(201).json({
            status: "Success",
            message: "Project created successfully",
            data: newProject
        })
    } catch (error) {
        return res.status(500).json({
            status: "Failed",
            message: error.message
        })
    }
}

const getProjects = async (req, res) => {
    try {
        const projects = await project.findAll();
        return res.status(200).json({
            status: "Success",
            message: "Projects retrieved successfully",
            data: projects
        })
    } catch (error) {
        return res.status(500).json({
            status: "Failed",
            message: error.message
        })
    }
}

const getProjectById = async (req, res) => {
    try {
        const {id} = req.params;
        const projectData = await project.findByPk(id);
        if (!projectData) {
            return res.status(404).json({
                status: "Failed",
                message: "Project not found"
            })
        }
        return res.status(200).json({
            status: "Success",
            message: "Project retrieved successfully",
            data: projectData
        })
    } catch (error) {
        return res.status(500).json({
            status: "Failed",
            message: error.message
        })
    }
}

const updateProject = async (req, res) => {
    try {
        const {id} = req.params;
        const {name, status, description} = req.body;

        const updateData = {};
        if (name) updateData.name = name;
        if (description) updateData.description = description;

        if (!Object.keys(updateData).length) {
            return res.status(400).json({
                status: "Failed",
                message: "Please provide data to update"
            })
        }

        const projectData = await project.findByPk(id);
        if (!projectData) {
            return res.status(404).json({
                status: "Failed",
                message: "Project not found"
            })
        }

        await projectData.update(updateData);
        return res.status(200).json({
            status: "Success",
            message: "Project updated successfully",
            data: projectData
        })
    } catch (error) {
        return res.status(500).json({
            status: "Failed",
            message: error.message
        })
    }
}

const deleteProject = async (req, res) => {
    try {
        const {id} = req.params;
        const projectData = await project.findByPk(id);
        if (!projectData) {
            return res.status(404).json({
                status: "Failed",
                message: "Project not found"
            })
        }
        await projectData.destroy();
        return res.status(200).json({
            status: "Success",
            message: "Project deleted successfully"
        })
    } catch (error) {
        return res.status(500).json({
            status: "Failed",
            message: error.message
        })
    }
}

module.exports = {
    createProject,
    getProjects,
    getProjectById,
    updateProject,
    deleteProject
}