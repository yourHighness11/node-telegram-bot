const express = require("express");
const { getAllUsers, deleteUser, blockOrUnblockUser, getUser } = require("../controllers/userController");
const router = express.Router();

router.get("/", getAllUsers)
    .get('/:id', getUser)
    .put("/block-or-unblock/:id", blockOrUnblockUser)
    .delete("/delete/:id", deleteUser);

module.exports = router;