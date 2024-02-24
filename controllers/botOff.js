const User = require("../Models/user");
const bot = require("../others/connectBot");

const botOff = bot.onText(/\/logout/, async (msg) => {
    const chatId = msg.chat.id;

    try {
        // Delete user data from MongoDB
        await User.findOneAndDelete({ id: chatId });
        bot.sendMessage(chatId, 'You have been logged out successfully.');
    } catch (error) {
        console.error('Error logging out user:', error);
        bot.sendMessage(chatId, 'An error occurred while logging out. Please try again later.');
    }
});

module.exports = botOff;