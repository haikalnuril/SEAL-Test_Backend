const router = require("express").Router();
const { projectController } = require("../controllers");
const { protectedRoute } = require("../middlewares/auth.middleware");

router.get("", protectedRoute, projectController.getProjects);
router.get("/:id", protectedRoute, projectController.getProjectById);
router.post("", protectedRoute, projectController.createProject);
router.put("/:id", protectedRoute, projectController.updateProject);
router.delete("/:id", protectedRoute, projectController.deleteProject);

module.exports = router;