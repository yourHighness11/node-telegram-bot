require("dotenv").config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const botOn = require("./controllers/botOn");
const botOff = require("./controllers/botOff");

const connectDB = require('./config/dbConfig');
const path = require("path");
const bodyParser = require('body-parser');

const userRoutes = require("./routes/userRoutes");
const settingsRoutes = require("./routes/settingsRoutes");
const { setupInterval } = require('./controllers/settingsControllers');
const cors = require("cors");
connectDB();
app.use(cors());

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

//start bot
botOn;

//logout bot
botOff;


app.use("/users", userRoutes);
app.use("/settings", settingsRoutes);




setupInterval();
app.use((req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})


app.listen(PORT, () => {
    console.log(`running on port ${PORT}`);
});
