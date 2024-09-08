const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

// Define routes and associate them with controller functions
router.get('/', transactionController.getAllTransactions);
router.post('/', transactionController.createTransaction);
router.get('/:id', transactionController.getTransactionById);
router.put('/:id', transactionController.updateTransaction);
router.delete('/:id', transactionController.deleteTransaction);

module.exports = router;

