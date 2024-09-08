import React from 'react';

const Dashboard = ({ transactions }) => {
  // Calculate total income and expenses
  const totalIncome = transactions
    .filter((transaction) => transaction.type === 'income')
    .reduce((acc, transaction) => acc + (transaction.amount || 0), 0);

  const totalExpenses = transactions
    .filter((transaction) => transaction.type === 'expense')
    .reduce((acc, transaction) => acc + (transaction.amount || 0), 0);

  const balance = totalIncome - totalExpenses;

  // Ensure totalIncome, totalExpenses, and balance are numbers and handle potential edge cases
  const formattedIncome = isNaN(totalIncome) ? '0.00' : totalIncome.toFixed(2);
  const formattedExpenses = isNaN(totalExpenses) ? '0.00' : totalExpenses.toFixed(2);
  const formattedBalance = isNaN(balance) ? '0.00' : balance.toFixed(2);

  return (
    <div className="card dashboard-container">
      <h2 className="dashboard-title">Dashboard</h2>
      <div className="dashboard-summary">
        <div className="summary-item income">
          <h3>Total Income</h3>
          <p>${formattedIncome}</p>
        </div>
        <div className="summary-item expenses">
          <h3>Total Expenses</h3>
          <p>${formattedExpenses}</p>
        </div>
        <div className="summary-item balance">
          <h3>Balance</h3>
          <p>${formattedBalance}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;




