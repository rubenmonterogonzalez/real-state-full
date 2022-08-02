const express = require('express');
const propertyController = require('../controllers/propertyController');

const router = express.Router();

router.param('id', propertyController.checkID);

router
  .route('/')
  .get(propertyController.getAllProperties)
  .post(propertyController.checkBody, propertyController.createProperty);

router
  .route('/:id')
  .get(propertyController.getProperty)
  .patch(propertyController.updateProperty)
  .delete(propertyController.deleteProperty);

module.exports = router;