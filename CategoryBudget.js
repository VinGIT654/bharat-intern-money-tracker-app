import React, { useState } from 'react';

const CategoryBudget = ({ categories, setCategoryBudget }) => {
  const [newCategory, setNewCategory] = useState({ name: '', budget: '' });

  const handleChange = (e) => {
    setNewCategory({
      ...newCategory,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCategoryBudget((prevCategories) => [
      ...prevCategories,
      { name: newCategory.name, budget: parseFloat(newCategory.budget) },
    ]);
    setNewCategory({ name: '', budget: '' });
  };

  const deleteCategory = (name) => {
    setCategoryBudget(categories.filter((category) => category.name !== name));
  };

  return (
    <div className="card">
      <h2>Category Budget</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={newCategory.name}
          onChange={handleChange}
          placeholder="Category Name"
          required
        />
        <input
          type="number"
          name="budget"
          value={newCategory.budget}
          onChange={handleChange}
          placeholder="Budget"
          required
        />
        <button type="submit">Add Budget</button>
      </form>

      <ul>
        {categories.map((category, index) => (
          <li key={index}>
            {category.name}: ${category.budget}
            <button onClick={() => deleteCategory(category.name)}>Delete</button> {/* Delete Button */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryBudget;

