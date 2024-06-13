const express = require('express');
const productController = require('../controller/ProductsController');
const verifyUser =require('../middleware/AuthMiddleware')
const router =express.Router();
router.post('/create',verifyUser,productController.create);
router.get('/find-by-id',verifyUser,productController.findById);
router.delete('/delete-by-id',verifyUser,productController.deleteById);
router.put('/update',verifyUser,productController.update);
router.get('/find-all',verifyUser,productController.findAll);
// router.post('/create',productController.create);
// router.get('/find-by-id/:id',productController.findById);
// router.delete('/delete-by-id/:id',productController.deleteById);
// router.put('/update/:id',productController.update);
// router.get('/find-all',productController.findAll);
router.get('/find-all-min',verifyUser,productController.findAllMin);
router.get('/find-all-count',verifyUser,productController.findCount);

module.exports =router;