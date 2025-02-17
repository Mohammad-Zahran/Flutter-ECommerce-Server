const express = require("express");
const router = express.Router();

const notificationController = require("../controllers/notification.controller.js");

router.post("/send-notification", notificationController.SendNotification);

module.exports = router;
