const router = require("express").Router();
const messageController = require("../controllers/messageCon");

router.post("/addmsg/", messageController.addMessage);
router.post("/getmsg/", messageController.getMessages);

module.exports = router;
