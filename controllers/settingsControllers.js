const Settings = require("../Models/settings");
const User = require("../Models/user");
const { sendWeatherUpdate } = require("../others/sendWeatherUpdate");

const getTimeInterval = async () => {
    try {
        const settings = await Settings.find();
        return settings[0].messageFrequency;
    } catch (error) {
        console.error('Error fetching time interval:', error);
        return "Something is wrong";
    }
}


let timeInterval;
const setupInterval = async () => {
    const time = await getTimeInterval();
    // console.log(time);
    timeInterval = setInterval(async () => {
        const users = await User.find();
        users.forEach(user => sendWeatherUpdate(user.id));
    }, time * 1000);
}

async function updateInterval() {
    clearInterval(timeInterval);
    await setupInterval();
}


const getMessageFrequency = async (req, res) => {
    try {
        const response = await Settings.find();
        res.json({ timeInSeconds: response[0].messageFrequency });
    } catch (error) {
        console.log(error);
    }

}

//add API keys
const addApiKeys = async (req, res) => {
    const { weatherApiKey } = req.body;

    try {
        if (weatherApiKey) {
            const findSettings = await Settings.find();
            if (findSettings.length) {
                await Settings.findByIdAndUpdate(findSettings[0]._id, { weatherApiKey: weatherApiKey });
            } else {
                const newSettings = new Settings({ weatherApiKey: weatherApiKey });
                await newSettings.save();
            }

            res.send("Success");
        } else {
            res.send("Invalid input.");
        }

    } catch (error) {
        console.log(error);
    }

}


//update message time
const updateMessageFrequency = async (req, res, next) => {
    const { seconds } = req.body;

    try {
        const findSettings = await Settings.find();
        if (typeof seconds === 'number' && (seconds > 59 && seconds < 2000001)) {
            if (findSettings.length) {
                await Settings.findByIdAndUpdate(findSettings[0]._id, { messageFrequency: seconds });
                updateInterval();
                res.json({ message: "updated" });
            } else {
                next();
            }
        } else {
            res.json({ message: "Invalid input" })
        }
    } catch (error) {
        console.log(error);
    }

}

module.exports = { addApiKeys, updateMessageFrequency, setupInterval, getMessageFrequency }