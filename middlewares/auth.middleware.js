const jwt = require("jsonwebtoken");
const { user } = require("../models");

const protectedRoute = async (req, res, next) => {
    try {
        try {
            const bearerToken = req.headers.authorization;
            if (!bearerToken) {
                return res.status(401).json({
                    status: "Failed",
                    message: "Your token is missing!",
                    isSuccess: false,
                });
            }

            const token = bearerToken.split("Bearer ")[1];

            const payload = jwt.verify(token, process.env.JWT_SECRET);
            const User = await user.findByPk(payload.userId);
            if (!User) {
                return res.status(404).json({
                    status: "Failed",
                    message: "User not found",
                    isSuccess: false,
                });
            }
            req.user = User;
            next();
        } catch (err) {
            return res.status(500).json({
                status: "Failed",
                message: err.message,
                isSuccess: false,
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: "Failed",
            message: "Not Authorized, no token",
        });
    }
};

module.exports = { protectedRoute };