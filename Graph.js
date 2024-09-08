import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register the necessary components for Chart.js v4.x
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Graph = ({ transactions, categoryBudgets }) => {
  // Prepare data for the graph
  const data = {
    labels: categoryBudgets.map((budget) => budget.name),
    datasets: [
      {
        label: 'Budget',
        data: categoryBudgets.map((budget) => budget.budget),
        backgroundColor: '#6C6AGA', // Dark blue color for Budget
        borderColor: '#4F4F9E',
        borderWidth: 1,
        hoverBackgroundColor: '#4F4F9E',
        hoverBorderColor: '#6C6AGA',
      },
      {
        label: 'Expenses',
        data: categoryBudgets.map((budget) => {
          const categoryExpenses = transactions
            .filter((transaction) => transaction.type === 'expense' && transaction.category === budget.name)
            .reduce((acc, transaction) => acc + transaction.amount, 0);
          return categoryExpenses;
        }),
        backgroundColor: '#F38699', // Pink color for Expenses
        borderColor: '#E74C3C',
        borderWidth: 1,
        hoverBackgroundColor: '#E74C3C',
        hoverBorderColor: '#F38699',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#333', // Legend text color
          font: {
            size: 14, // Font size
            family: 'Arial, sans-serif', // Font family
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.dataset.label}: $${tooltipItem.raw}`;
          },
        },
        backgroundColor: '#333', // Tooltip background color
        titleColor: '#fff', // Tooltip title color
        bodyColor: '#fff', // Tooltip body color
        borderColor: '#ccc', // Tooltip border color
        borderWidth: 1,
      },
      title: {
        display: true,
        text: 'Budget vs Expenses by Category',
        color: '#111822', // Title color
        font: {
          size: 18, // Title font size
          family: 'Arial, sans-serif', // Title font family
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Categories',
          color: '#111822', // Axis title color
          font: {
            size: 14, // Axis title font size
            family: 'Arial, sans-serif', // Axis title font family
          },
        },
        grid: {
          color: '#ddd', // Grid line color
        },
        ticks: {
          color: '#333', // Tick label color
        },
      },
      y: {
        title: {
          display: true,
          text: 'Amount',
          color: '#111822', // Axis title color
          font: {
            size: 14, // Axis title font size
            family: 'Arial, sans-serif', // Axis title font family
          },
        },
        grid: {
          color: '#ddd', // Grid line color
        },
        ticks: {
          color: '#333', // Tick label color
          beginAtZero: true,
        },
      },
    },
  };

  return (
    <div className="card graph-container">
      <h2>Budget vs Expenses</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default Graph;



