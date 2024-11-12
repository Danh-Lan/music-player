import React from 'react';

const CategorySelector = ({ categories, selectedCategory, handleCategoryChange }) => (
  <div className="category-selector">
    <select value={selectedCategory} onChange={handleCategoryChange}>
      {categories.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </select>
  </div>
);

export default CategorySelector;