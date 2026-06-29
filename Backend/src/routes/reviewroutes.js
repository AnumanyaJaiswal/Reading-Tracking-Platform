const express = require('express')
const router = express.Router();

const authmiddleware  = require('../middlewares/authmiddleware');
const { addReviewContoller, getMyReviewsController, getAllReviewsController } = require('../controllers/reviewcontrollers')

// Add reviews
router.patch('/:id' , authmiddleware , addReviewContoller);

// See my reviews
router.get('/me' , authmiddleware, getMyReviewsController)

// Can see all the reviews...api for home screen
router.get('/', getAllReviewsController);

module.exports = router;