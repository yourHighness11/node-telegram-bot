const User = require("../Models/user");
const bot = require("../others/connectBot");


const botOn = bot.onText(/\/start/, async (msg) => {
    const chatId = msg.chat.id;
    try {
        const existingUser = await User.findOne({ id: chatId });
        if (!existingUser) {
            bot.sendMessage(chatId, 'Welcome! Enter your name');
            bot.once('message', async (nameMsg) => {
                const name = nameMsg.text;

                bot.sendMessage(chatId, 'Enter city');
                bot.once('message', async (cityMsg) => {
                    const city = cityMsg.text;

                    bot.sendMessage(chatId, 'Enter country');
                    bot.once('message', async (countryMsg) => {
                        const country = countryMsg.text;

                        // Save user data to MongoDB
                        const newUser = new User({ id: chatId, name, city, country });
                        await newUser.save();

                        bot.sendMessage(chatId, 'You will now receive daily weather updates.Type "/logout" to cancel subscription');
                    });
                });
            });
        } else {
            bot.sendMessage(chatId, 'Welcome back! You are already registered.');
        }
    } catch (error) {
        console.log(error);
    }
});

module.exports = botOn;