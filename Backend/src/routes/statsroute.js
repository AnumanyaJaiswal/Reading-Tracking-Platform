const express = require("express");
const router = express.Router();

const authmiddleware = require('../middlewares/authmiddleware')
const { getStatsController } = require('../controllers/statscontroller')

router.get('/' , authmiddleware , getStatsController);

module.exports = router;