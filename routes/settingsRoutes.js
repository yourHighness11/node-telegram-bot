const express = require("express");
const { updateMessageFrequency, addApiKeys, getMessageFrequency } = require("../controllers/settingsControllers");
const router = express.Router();

router.get("/getTime", getMessageFrequency)
    .put("/change-time", updateMessageFrequency)
    .post("/change-keys", addApiKeys);

module.exports = router;