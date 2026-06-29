const express = require('express')

const router = express.Router();
const { SearchBookController , GetBookController } = require('../controllers/bookcontrolers')

router.get('/search' , SearchBookController);

router.get('/:id' , GetBookController)

module.exports = router;
