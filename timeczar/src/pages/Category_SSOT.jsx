
// src/pages/Category_SSOT.jsx
import React, { useState, useEffect } from 'react';
import CategoryForm from '../components/CategoryForm';
import CategoryList from '../components/CategoryList';

const Category_SSOT = () => {
  const [categories, setCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null); // Tracks if we are editing an item

  // 1. Fetch categories from backend database on page load
  useEffect(() => {
    // fetch('/api/categories').then(res => res.json()).then(data => setCategories(data))
  }, []);

  // 2. Handle creating a brand new category
  const handleCreateCategory = (newCategoryData) => {
    console.log('Sending NEW category to DB:', newCategoryData);
    // After DB success, append to state: setCategories([...categories, savedItem])
  };

  // 3. Handle updating an existing category
  const handleUpdateCategory = (updatedData) => {
    console.log('Sending UPDATED category to DB:', updatedData);
    // After DB success, map state to match
  };

  // 4. Handle deleting a category
  const handleDeleteCategory = (categoryId) => {
    console.log('Deleting category ID from DB:', categoryId);
    // After DB success, filter out of state: setCategories(categories.filter(c => c.id !== categoryId))
  };

  return (
    <div className="container py-5">
      <h2>Manage Categories</h2>
      
      {/* Visual Form Component */}
      <CategoryForm 
        onSubmit={editingCategory ? handleUpdateCategory : handleCreateCategory}
        initialData={editingCategory} 
      />

      {/* Visual List Component */}
      <CategoryList 
        categories={categories} 
        onEditClick={setEditingCategory} 
        onDeleteClick={handleDeleteCategory} 
      />
    </div>
  );
};

export default Category_SSOT;
