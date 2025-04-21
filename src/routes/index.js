const express = require('express');
const router = express.Router();
const { handleStage } = require('../controllers/handleStageEntry');

router.post('/stage-event', handleStage);

module.exports = router;
