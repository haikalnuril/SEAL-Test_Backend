const { user } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                status: "Failed",
                message: "Email and password are required",
            });
        }

        const userData = await user.findOne({ where: { email } });
        console.log(user)
        if (!user) {
            return res.status(401).json({
                status: "Failed",
                message: "Email or Password is incorrect",
            });
        }

        if (!bcrypt.compareSync(password, userData.password)) {
            return res.status(401).json({
                status: "Failed",
                message: "Email or Password is incorrect",
            });
        } else {
            const token = jwt.sign(
                {
                    userId: userData.id,
                    name: userData.name,
                    email: userData.email,
                },
                process.env.JWT_SECRET,
                { expiresIn: `${process.env.JWT_EXPIRES_IN}` }
            );
            return res.status(200).json({
                status: "Success",
                message: "Login success",
                data: {
                    token,
                    userData,
                },
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: "Failed",
            message: error.message,
            data: null,
        });
    }
};

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                status: "Failed",
                message: "Name, Email and Password are required",
            });
        }

        const userExist = await user.findOne({ where: { email } });
        if (userExist) {
            return res.status(400).json({
                status: "Failed",
                message: "Email already registered",
            });
        }

        const newUser = await user.create({
            name,
            email,
            password
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

const currentUser = async (req, res) => {
    try {
        const userData = await user.findByPk(req.user.id);
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

module.exports = {
    login,
    register,
    currentUser,
};
