const User = require("../Models/user");
const bot = require("../others/connectBot");
const getBot = require("../others/connectBot");



//find all users
const getAllUsers = async (req, res) => {
    try {

        const users = await User.find();
        res.send(users);
    } catch (error) {
        console.error('Error', error);
        res.status(500).send('Internal server error');
    }
}

const getUser = async (req, res) => {
    const userId = req.params.id;
    try {
        const userStatus = await User.findOne({ id: userId });
        res.send(userStatus);
    } catch (error) {
        console.error('Error', error);
        res.status(500).send('Internal server error');
    }
}

// block or unblock user
const blockOrUnblockUser = async (req, res) => {
    // Delete a user by ID
    const userId = req.params.id;
    try {
        const userStatus = await User.findOne({ id: userId });
        if (userStatus.isBlocked === true) {
            bot.sendMessage(userId, 'Account unblocked! by admin.');
            await User.findOneAndUpdate({ id: userId }, { isBlocked: false })
            res.send('unblocked');
        } if (userStatus.isBlocked === false) {
            await User.findOneAndUpdate({ id: userId }, { isBlocked: true })
            bot.sendMessage(userId, 'Account blocked! by admin.');
            res.send('Blocked');
        }

    } catch (error) {
        console.error('Error', error);
        res.status(500).send('Internal server error');
    }
}

//delete user
const deleteUser = async (req, res) => {
    // Delete a user by ID
    const userId = req.params.id;
    const bot = await getBot();
    try {
        bot.sendMessage(userId, 'Account deleted! by admin.');
        await User.findOneAndDelete({ id: userId });
        res.send('User deleted successfully');
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).send('Internal server error');
    }
}


module.exports = { getUser, getAllUsers, blockOrUnblockUser, deleteUser }