const router = require("express").Router();

const User = require("./user.route");
const Task = require("./task.route");
const Project = require("./project.route");
const Auth = require("./auth.route");

router.use("/users", User);
router.use("/tasks", Task);
router.use("/projects", Project);
router.use("/auth", Auth);

module.exports = router;