const express = require('express')
const router = express.Router();
const authmiddleware = require('../middlewares/authmiddleware')
const {
    addToListController,
    getUserListsController,
    updateStatusListController,
    deleteBookController
} = require('../controllers/listcontrollers')

router.post('/', authmiddleware, addToListController)
router.get('/', authmiddleware, getUserListsController)
router.patch('/:id', authmiddleware, updateStatusListController)
router.delete('/:id' , authmiddleware , deleteBookController);

module.exports = router;