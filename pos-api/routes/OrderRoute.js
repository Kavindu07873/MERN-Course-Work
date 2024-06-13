const express = require('express');
const orderController = require('../controller/OrderController');
const verifyUser =require('../middleware/AuthMiddleware')
const router =express.Router();
// router.post('/create/',orderController.create);
router.post('/create',verifyUser,orderController.create);
router.get('/find-by-id',verifyUser,orderController.findById);
router.delete('/delete-by-id',verifyUser,orderController.deleteById);
router.put('/update',verifyUser,orderController.update);
router.get('/find-all',verifyUser,orderController.findAll);
router.get('/find-all-count',verifyUser,orderController.findCount);
 router.get('/find-income',verifyUser,orderController.findAllIncome);
router.get('/find-by-id/:id',verifyUser,orderController.findById);

module.exports =router;