const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

// Create an Express app
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Import routes
const transactionRoutes = require('./routes/transactionRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const budgetRoutes = require('./routes/budgetRoutes');

// Use routes
app.use('/api/transactions', transactionRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/budgets', budgetRoutes);

// Serve static files (e.g., CSS)
app.use(express.static(path.join(__dirname, 'public')));

// Define routes for rendering EJS templates
app.get('/dashboard', async (req, res) => {
    try {
        const transactions = await Transaction.find().sort({ date: -1 });
        const totalIncome = await Transaction.aggregate([{ $match: { type: 'income' } }, { $group: { _id: null, total: { $sum: '$amount' } } }]);
        const totalExpenses = await Transaction.aggregate([{ $match: { type: 'expense' } }, { $group: { _id: null, total: { $sum: '$amount' } } }]);
        const remainingBalance = (totalIncome[0]?.total || 0) - (totalExpenses[0]?.total || 0);
        
        res.render('dashboard', {
            title: 'Dashboard',
            transactions,
            totalIncome: totalIncome[0]?.total || 0,
            totalExpenses: totalExpenses[0]?.total || 0,
            remainingBalance
        });
    } catch (error) {
        res.status(500).send('Server Error');
    }
});

app.get('/add-transaction', async (req, res) => {
    try {
        const categories = await Category.find();
        res.render('transactionForm', { title: 'Add Transaction', categories });
    } catch (error) {
        res.status(500).send('Server Error');
    }
});

app.get('/edit-transaction/:id', async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);
        const categories = await Category.find();
        res.render('transactionForm', { title: 'Edit Transaction', transaction, categories });
    } catch (error) {
        res.status(500).send('Server Error');
    }
});

app.get('/reports', (req, res) => {
    // For simplicity, assume reports generation is handled directly in the controller
    res.render('reports', { title: 'Reports' });
});

app.get('/graphs', async (req, res) => {
    try {
        const incomeTotal = await Transaction.aggregate([{ $match: { type: 'income' } }, { $group: { _id: null, total: { $sum: '$amount' } } }]);
        const expenseTotal = await Transaction.aggregate([{ $match: { type: 'expense' } }, { $group: { _id: null, total: { $sum: '$amount' } } }]);
        const categories = await Category.find();
        const categoryData = await Transaction.aggregate([
            { $group: { _id: '$category', total: { $sum: '$amount' } } }
        ]);
        
        const categoryLabels = categories.map(cat => cat.name);
        const categoryExpenses = categoryData.map(cat => cat.total);
        
        res.render('graphs', {
            title: 'Graphs',
            incomeTotal: incomeTotal[0]?.total || 0,
            expenseTotal: expenseTotal[0]?.total || 0,
            categoryLabels,
            categoryData: categoryExpenses
        });
    } catch (error) {
        res.status(500).send('Server Error');
    }
});

// Connect to MongoDB
const db = process.env.MONGO_URI;
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
