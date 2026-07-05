const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authmiddleware");

const {
    createClubController,
} = require("../controllers/clubcontrollers");

router.post("/", authMiddleware, createClubController);

module.exports = router;