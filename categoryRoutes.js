const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// Define routes and associate them with controller functions
router.get('/', categoryController.getAllCategories);
router.post('/', categoryController.createCategory);
router.get('/:id', categoryController.getCategoryById);
router.put('/:id', categoryController.updateCategory);
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;
