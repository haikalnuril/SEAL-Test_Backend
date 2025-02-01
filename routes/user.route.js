const router = require("express").Router();

const { userController } = require("../controllers");
const { protectedRoute } = require("../middlewares/auth.middleware");
const upload = require("../utils/photoUploadHandler");

router.get("", protectedRoute, userController.getUsers);
router.get("/:id", protectedRoute, userController.getUserById);
router.post("", protectedRoute, upload.single('photoProfile'), userController.createUser);
router.put("/:id", protectedRoute, upload.single('photoProfile'), userController.updateUser);
router.delete("/:id", protectedRoute, userController.deleteUser);

module.exports = router;