const Transaction = require('../models/Transaction');

// Get all transactions
exports.getAllTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find();
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new transaction
exports.createTransaction = async (req, res) => {
    const transaction = new Transaction({
        date: req.body.date,
        description: req.body.description,
        amount: req.body.amount,
        category: req.body.category,
        type: req.body.type
    });

    try {
        const newTransaction = await transaction.save();
        res.status(201).json(newTransaction);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get a single transaction by ID
exports.getTransactionById = async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);
        if (transaction == null) {
            return res.status(404).json({ message: 'Transaction not found' });
        }
        res.json(transaction);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a transaction
exports.updateTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);
        if (transaction == null) {
            return res.status(404).json({ message: 'Transaction not found' });
        }

        if (req.body.date != null) {
            transaction.date = req.body.date;
        }
        if (req.body.description != null) {
            transaction.description = req.body.description;
        }
        if (req.body.amount != null) {
            transaction.amount = req.body.amount;
        }
        if (req.body.category != null) {
            transaction.category = req.body.category;
        }
        if (req.body.type != null) {
            transaction.type = req.body.type;
        }

        const updatedTransaction = await transaction.save();
        res.json(updatedTransaction);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a transaction
exports.deleteTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);
        if (transaction == null) {
            return res.status(404).json({ message: 'Transaction not found' });
        }

        await transaction.remove();
        res.json({ message: 'Transaction deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

