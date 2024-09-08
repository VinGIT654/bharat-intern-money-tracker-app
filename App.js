import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import CategoryBudget from './components/CategoryBudget';
import Reports from './components/Reports';
import Graph from './components/Graph';

import './styles.css'; // Assuming you have a styles.css file for styling

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [categoryBudgets, setCategoryBudgets] = useState([]);

  // Load initial transactions and category budgets from API or mock data
  useEffect(() => {
    // Replace this with actual API calls if needed
    const initialTransactions = [
      { id: 1, date: '2024-09-01', description: 'Salary', amount: 3000, type: 'income', category: 'Salary' },
      { id: 2, date: '2024-09-02', description: 'Groceries', amount: 200, type: 'expense', category: 'Food' },
    ];

    const initialBudgets = [
      { name: 'Food', budget: 500 },
      { name: 'Transport', budget: 200 },
    ];

    setTransactions(initialTransactions);
    setCategoryBudgets(initialBudgets);
  }, []);

  const addTransaction = (transaction) => {
    setTransactions([...transactions, transaction]);
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter((transaction) => transaction.id !== id));
  };

  const editTransaction = (updatedTransaction) => {
    setTransactions(
      transactions.map((transaction) =>
        transaction.id === updatedTransaction.id ? updatedTransaction : transaction
      )
    );
  };

  return (
    <div className="app">
      <h1>Money Tracker</h1>
      <Dashboard transactions={transactions} />
      <TransactionForm addTransaction={addTransaction} />
      // src/App.js
<TransactionList
  transactions={transactions}
  onDelete={deleteTransaction}
  onEdit={editTransaction} // Pass onEdit prop
/>

      <CategoryBudget categories={categoryBudgets} setCategoryBudget={setCategoryBudgets} />
      <Reports transactions={transactions} />
      <Graph transactions={transactions} categoryBudgets={categoryBudgets} />
    </div>
  );
};

export default App;

