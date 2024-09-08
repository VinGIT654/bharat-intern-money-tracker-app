import React, { useState } from 'react';

const TransactionList = ({ transactions, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(null);
  const [editedTransaction, setEditedTransaction] = useState({
    id: '',
    date: '',
    description: '',
    amount: '',
    type: '',
    category: '',
  });

  const handleEditClick = (transaction) => {
    setIsEditing(transaction.id);
    setEditedTransaction(transaction); // Set the transaction to be edited
  };

  const handleCancelEdit = () => {
    setIsEditing(null);
    setEditedTransaction({
      id: '',
      date: '',
      description: '',
      amount: '',
      type: '',
      category: '',
    });
  };

  const handleSaveEdit = () => {
    onEdit(editedTransaction);  // This sends the edited transaction back to the parent
    setIsEditing(null);  // Exit edit mode after saving
  };

  const handleInputChange = (e) => {
    setEditedTransaction({
      ...editedTransaction,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="card">
      <h2>Transaction List</h2>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.id}>
            {isEditing === transaction.id ? (
              <div>
                <input
                  type="date"
                  name="date"
                  value={editedTransaction.date}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="description"
                  value={editedTransaction.description}
                  onChange={handleInputChange}
                />
                <input
                  type="number"
                  name="amount"
                  value={editedTransaction.amount}
                  onChange={handleInputChange}
                />
                <select
                  name="type"
                  value={editedTransaction.type}
                  onChange={handleInputChange}
                >
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>
                <input
                  type="text"
                  name="category"
                  value={editedTransaction.category}
                  onChange={handleInputChange}
                />
                <button onClick={handleSaveEdit}>Save</button>
                <button onClick={handleCancelEdit}>Cancel</button>
              </div>
            ) : (
              <div>
                <span>{transaction.date} - </span>
                <span>{transaction.description} - </span>
                <span>{transaction.amount} - </span>
                <span>{transaction.type} - </span>
                <span>{transaction.category}</span>
                <button onClick={() => handleEditClick(transaction)}>Edit</button>
                <button onClick={() => onDelete(transaction.id)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;



