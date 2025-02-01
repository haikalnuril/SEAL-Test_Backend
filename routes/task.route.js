const router = require("express").Router();
const { taskController } = require("../controllers");
const { protectedRoute } = require("../middlewares/auth.middleware");

router.get("", protectedRoute, taskController.getTasks);
router.get("/:id", protectedRoute, taskController.getTaskById);
router.post("", protectedRoute, taskController.createTask);
router.put("/:id", protectedRoute, taskController.updateTask);
router.delete("/:id", protectedRoute, taskController.deleteTask);

module.exports = router;