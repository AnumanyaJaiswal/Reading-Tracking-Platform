const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authmiddleware");

const {
    createClubController,
    getAllClubsController,
    getMyClubsController,
    joinClubController,
    leaveClubController,
    getClubDetailsController,
    deleteClubController,
} = require("../controllers/clubcontrollers");

router.post("/", authMiddleware, createClubController);
router.get('/', authMiddleware, getAllClubsController);
router.get('/myclubs', authMiddleware, getMyClubsController);
router.post('/:clubId/join', authMiddleware, joinClubController);
router.delete('/:clubId/leave', authMiddleware, leaveClubController);
router.get('/:clubId', authMiddleware, getClubDetailsController);
router.delete('/:clubId', authMiddleware, deleteClubController);

module.exports = router;