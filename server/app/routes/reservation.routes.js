const Router = require('express');
const router = new Router;
const ReservationController = require('../controllers/reservation.controller');

router.post('/reservation', ReservationController.createReservation);
router.get('/reservation', ReservationController.getReservations);
router.delete('/reservation/:id', ReservationController.deleteReservation);

module.exports = router;