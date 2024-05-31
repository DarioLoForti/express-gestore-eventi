const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController.js');

router.get('/', eventController.index);
router.post('/', eventController.store);
router.put('/:event', eventController.update);

module.exports = router;