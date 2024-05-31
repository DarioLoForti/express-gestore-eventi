const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController.js');
const reservationController = require('../controllers/reservationController.js');

router.get('/', eventController.index);
router.post('/', eventController.store);
router.put('/:event', eventController.update);


router.get('/:event/reservations', reservationController.index);
router.post('/:event/reservations', reservationController.store);
router.delete('/:event/reservations/:reservation', reservationController.destroy);

module.exports = router;