import React from 'react';

const Reports = ({ transactions }) => {
  const incomeTransactions = transactions.filter((t) => t.type === 'income');
  const expenseTransactions = transactions.filter((t) => t.type === 'expense');

  return (
    <div className="card">
      <h2>Reports</h2>
      <div>
        <h3>Income</h3>
        <ul>
          {incomeTransactions.map((t) => (
            <li key={t.id}>
              {t.date}: {t.description} - ${t.amount}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Expenses</h3>
        <ul>
          {expenseTransactions.map((t) => (
            <li key={t.id}>
              {t.date}: {t.description} - ${t.amount}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Reports;
