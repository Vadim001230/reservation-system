const Router = require('express');
const router = new Router;
const EstablishmentController = require('../controllers/establishment.controller');

router.post('/establishment', EstablishmentController.createEstablishment);
router.get('/establishment', EstablishmentController.getEstablishments);
router.patch('/establishment/:id', EstablishmentController.updateEstablishment);
router.delete('/establishment/:id', EstablishmentController.deleteEstablishment);

module.exports = router;