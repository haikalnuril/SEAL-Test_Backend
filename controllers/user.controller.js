const { user } = require("../models");
const imagekit = require("../lib/imagekit");

const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if(!name || !email || !password) {
            return res.status(400).json({
                status: "Failed",
                message: "Name, email, and password are required",
            });
        }

        let imageUrl = null;

        if (req.file) {
            const file = req.file;

            const split = file.originalname.split(".");
            const ext = split[split.length - 1];
            const filename = split[0];
            const fileBuffer = file.buffer;
            const fileName = `${name}-${filename}-${Date.now()}.${ext}`;

            const uploadedFile = await imagekit.upload({
                file: fileBuffer,
                fileName: fileName,
            });

            imageUrl = uploadedFile.url;
        }

        const newUser = await user.create({
            name,
            email,
            password,
            photo: imageUrl,
        });
        return res.status(201).json({
            status: "Success",
            message: "User created successfully",
            data: newUser,
        });
    } catch (error) {
        return res.status(500).json({
            status: "Failed",
            message: error.message,
        });
    }
};

const getUsers = async (req, res) => {
    try {
        const users = await user.findAll({
            paranoid: false,
        });
        return res.status(200).json({
            status: "Success",
            message: "Users retrieved successfully",
            data: users,
        });
    } catch (error) {
        return res.status(500).json({
            status: "Failed",
            message: error.message,
        });
    }
};

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const userData = await user.findByPk(id, { paranoid: false });
        if (!userData) {
            return res.status(404).json({
                status: "Failed",
                message: "User not found",
            });
        }
        return res.status(200).json({
            status: "Success",
            message: "User retrieved successfully",
            data: userData,
        });
    } catch (error) {
        return res.status(500).json({
            status: "Failed",
            message: error.message,
        });
    }
};

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, password } = req.body;

        const updateData = {};
        if (name) updateData.name = name;
        if (email) updateData.email = email;
        if (password) updateData.password = password;

        if (req.file) {
            const file = req.file;

            const split = file.originalname.split(".");
            const ext = split[split.length - 1];
            const filename = split[0];
            const fileBuffer = file.buffer;
            const fileName = `Product-${filename}-${Date.now()}.${ext}`;

            const uploadedFile = await imagekit.upload({
                file: fileBuffer,
                fileName: fileName,
            });

            updateData.photo = uploadedFile.url;
        }
        const userData = await user.findByPk(id);
        if (!userData) {
            return res.status(404).json({
                status: "Failed",
                message: "User not found",
            });
        }

        if (!Object.keys(updateData).length) {
            return res.status(400).json({
            status: "Failed",
            message: "Please provide data to update",
            });
        }
        await userData.update(updateData);
        return res.status(200).json({
            status: "Success",
            message: "User updated successfully",
            data: userData,
        });
    } catch (error) {
        return res.status(500).json({
            status: "Failed",
            message: error.message,
        });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const userData = await user.findByPk(id);
        if (!userData) {
            return res.status(404).json({
                status: "Failed",
                message: "User not found",
            });
        }
        await userData.destroy();
        return res.status(200).json({
            status: "Success",
            message: "User deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            status: "Failed",
            message: error.message,
        });
    }
};

module.exports = { createUser, getUsers, getUserById, updateUser, deleteUser };
