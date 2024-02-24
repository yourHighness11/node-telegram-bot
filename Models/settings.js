const { default: mongoose } = require("mongoose");
const SettingsSchema = new mongoose.Schema({
    weatherApiKey: String,
    messageFrequency: { default: 86400, type: Number }
});

module.exports = mongoose.model("Setting", SettingsSchema);
