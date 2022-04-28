const router = require("express").Router();
const userController = require("../controllers/userController");

router.post("/login", userController.login);
router.post("/register", userController.register);
router.get("/allusers/:id", userController.getAllUsers);
router.post("/setavatar/:id", userController.SetAvatar);

module.exports = router;
