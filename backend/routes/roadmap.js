const express = require('express');
const router = express.Router();
const roadmapController = require('../controllers/roadmapController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/generate', authMiddleware, roadmapController.generateRoadmap);
router.get('/:id', authMiddleware, roadmapController.getRoadmapById);

module.exports = router;
