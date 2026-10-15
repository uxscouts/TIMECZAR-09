
// src/pages/Category_SSOT.jsx
import React, { useState, useEffect } from 'react';
import GoalsForm from '../components/GoalsForm';
import GoalsList from '../components/GoalsList';

const Goals_SSOT = () => {
  const [goals, setGoals] = useState([]);
  const [editingGoals, setEditingGoals] = useState(null); // Tracks if we are editing an item

  // 1. Fetch categories from backend database on page load
  useEffect(() => {
    // fetch('/api/categories').then(res => res.json()).then(data => setCategories(data))
  }, []);

  // 2. Handle creating a brand new goal
  const handleCreateGoal = (newGoalData) => {
    console.log('Sending NEW goal to DB:', newGoalData);
    // After DB success, append to state: setCategories([...categories, savedItem])
  };

  // 3. Handle updating an existing goal
  const handleUpdateGoal = (updatedData) => {
    console.log('Sending UPDATED goal to DB:', updatedData);
    // After DB success, map state to match
  };

  // 4. Handle deleting a goal
  const handleDeleteGoal = (goalId) => {
    console.log('Deleting goal ID from DB:', goalId);
    // After DB success, filter out of state: setCategories(categories.filter(c => c.id !== categoryId))
  };

  return (
    <div className="container py-5">
      <h2>Manage Goals</h2>
      
      {/* Visual Form Component */}
      <GoalsForm 
        onSubmit={editingGoals ? handleUpdateGoal : handleCreateGoal}
        initialData={editingGoals} 
      />

      {/* Visual List Component */}
      <GoalsList 
        goals={goals} 
        onEditClick={setEditingGoals} 
        onDeleteClick={handleDeleteGoal} 
      />
    </div>
  );
};

export default Goals_SSOT;
