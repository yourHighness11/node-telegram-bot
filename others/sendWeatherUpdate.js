const { default: axios } = require("axios");
const Settings = require("../Models/settings");
const User = require("../Models/user");
const bot = require("./connectBot");
// delay function
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}


// Weather API integration and user message logic
const sendWeatherUpdate = async (chatId) => {
    const existingUser = await User.find({ isBlocked: false })
    const apiKeys = await Settings.find()
    for (let i = 0; i < existingUser.length; i++) {
        const element = existingUser[i];
        await sleep(1500);

        //open weather api
        const response = await axios(`http://api.openweathermap.org/geo/1.0/direct?q=${element.city},${element.country}&appid=${apiKeys[0].weatherApiKey}`)
        const weatherReport = await axios(`https://api.openweathermap.org/data/2.5/weather?lat=${response.data[0].lat}&lon=${response.data[0].lon}&appid=${apiKeys[0].weatherApiKey}`)
        const weatherData = weatherReport.data;

        const userWeatherData = `Weather: ${weatherData.weather[0].main}\nDescription: ${weatherData.weather[0].description}\nWind Speed: ${weatherData.wind.speed}\nHumidity: ${weatherData.main.humidity}\nType "/logout" to stop recieving updates`;
        bot.sendMessage(chatId, userWeatherData);
    }
};

module.exports = { sendWeatherUpdate };