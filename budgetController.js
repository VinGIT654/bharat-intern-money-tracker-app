const Budget = require('../models/Budget');

// Get all budgets
exports.getAllBudgets = async (req, res) => {
    try {
        const budgets = await Budget.find();
        res.json(budgets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new budget
exports.createBudget = async (req, res) => {
    const budget = new Budget({
        category: req.body.category,
        amount: req.body.amount
    });

    try {
        const newBudget = await budget.save();
        res.status(201).json(newBudget);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get a single budget by ID
exports.getBudgetById = async (req, res) => {
    try {
        const budget = await Budget.findById(req.params.id);
        if (budget == null) {
            return res.status(404).json({ message: 'Budget not found' });
        }
        res.json(budget);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a budget
exports.updateBudget = async (req, res) => {
    try {
        const budget = await Budget.findById(req.params.id);
        if (budget == null) {
            return res.status(404).json({ message: 'Budget not found' });
        }

        if (req.body.category != null) {
            budget.category = req.body.category;
        }
        if (req.body.amount != null) {
            budget.amount = req.body.amount;
        }

        const updatedBudget = await budget.save();
        res.json(updatedBudget);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a budget
exports.deleteBudget = async (req, res) => {
    try {
        const budget = await Budget.findById(req.params.id);
        if (budget == null) {
            return res.status(404).json({ message: 'Budget not found' });
        }

        await budget.remove();
        res.json({ message: 'Budget deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

