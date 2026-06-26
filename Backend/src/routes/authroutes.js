const express = require('express')

const router = express.Router();
const { registerUser , loginUser , getCurrentUser , logoutUser} = require('../controllers/authcontrollers')
const authmiddleware = require('../middlewares/authmiddleware')

router.post('/signup' , registerUser);
router.post('/login' , loginUser);

router.get('/me' , authmiddleware , getCurrentUser);

router.post('/logout' , logoutUser);

module.exports = router;