const Notification = require("../models/notification.model.js");
const asyncHandler = require("express-async-handler");
const OneSignal = require("onesignal-node");
const dotenv = require("dotenv");
dotenv.config();

const client = new OneSignal.Client(
  process.env.ONE_SIGNAL_APP_ID,
  process.env.ONE_SIGNAL_REST_API_KEY
);

// Send notification
const SendNotification = asyncHandler(async (req, res) => {
  const { title, description, imageUrl } = req.body;

  const notificationBody = {
    contents: {
      en: description,
    },
    headings: {
      en: title,
    },
    included_segments: ["All"],
    ...(imageUrl && { big_picture: imageUrl }),
  };

  const response = await client.createNotification(notificationBody);
  const notificationId = response.body.id;
  console.log("Notification sent to all users:", notificationId);
  const notification = new Notification({
    notificationId,
    title,
    description,
    imageUrl,
  });
  const newNotification = await notification.save();
  res.json({
    success: true,
    message: "Notification sent successfully",
    data: null,
  });
});

module.exports = {
  SendNotification,
};
