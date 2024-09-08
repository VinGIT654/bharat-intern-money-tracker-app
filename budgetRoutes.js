const express = require('express');
const router = express.Router();
const budgetController = require('../controllers/budgetController');

// Define routes and associate them with controller functions
router.get('/', budgetController.getAllBudgets);
router.post('/', budgetController.createBudget);
router.get('/:id', budgetController.getBudgetById);
router.put('/:id', budgetController.updateBudget);
router.delete('/:id', budgetController.deleteBudget);

module.exports = router;

