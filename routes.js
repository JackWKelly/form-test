const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.post('/add', controller.addPet);
router.get('/get/:name', controller.getPet);
//router.get('/add', controller.addPet);


module.exports = router;