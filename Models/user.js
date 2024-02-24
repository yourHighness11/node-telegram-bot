const { default: mongoose } = require("mongoose");
const UserSchema = new mongoose.Schema({
    id: Number,
    name: String,
    city: String,
    country: String,
    isBlocked: { type: Boolean, default: false }
});

module.exports = mongoose.model("User", UserSchema);
