const express = require('express');
const router = express.Router();
const controller = require('../controllers/controllers.js');
const authSecurity = require('../middlewares/middleware.js');

router.get('/items', controller.getAllItems);
router.get('/items/:id', controller.getItemById);

router.post('/items', authSecurity, controller.createItem);

module.exports = router;