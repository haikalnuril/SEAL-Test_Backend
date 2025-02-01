const router = require("express").Router();
const { authController } = require("../controllers");
const { protectedRoute } = require("../middlewares/auth.middleware");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/current", protectedRoute, authController.currentUser);

module.exports = router;