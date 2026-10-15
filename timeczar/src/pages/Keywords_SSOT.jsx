// src/pages/Keywords_SSOT.jsx
import React, { useState, useEffect } from 'react';
import KeywordForm from '../components/KeywordsForm';
import KeywordList from '../components/KeywordsList';
import { Container } from 'reactstrap';

const Keywords_SSOT = () => {
  const [keywords, setKeywords] = useState([]);
  const [editingKeyword, setEditingKeyword] = useState(null); // Tracks if we are editing an item

  // 1. Fetch categories from backend database on page load
  useEffect(() => {
    // fetch('/api/categories').then(res => res.json()).then(data => setCategories(data))
  }, []);

  // 2. Handle creating a brand new category
  const handleCreateKeyword = (newKeywordData) => {
    console.log('Sending NEW keyword to DB:', newKeywordData);
    // After DB success, append to state: setCategories([...categories, savedItem])
  };

  // 3. Handle updating an existing category
  const handleUpdateKeyword = (updatedData) => {
    console.log('Sending UPDATED keyword to DB:', updatedData);
    // After DB success, map state to match
  };

  // 4. Handle deleting a category
  const handleDeleteKeyword = (keywordId) => {
    console.log('Deleting keyword ID from DB:', keywordId);
    // After DB success, filter out of state: setCategories(categories.filter(c => c.id !== categoryId))
  };

  return (
    <>
    <Container>
      <div className="container py-5">
        <h2>Manage Keyword</h2>
        
        {/* Visual Form Component */}
        <KeywordForm 
          onSubmit={editingKeyword ? handleUpdateKeyword : handleCreateKeyword}
          initialData={editingKeyword} 
        />

        {/* Visual List Component */}
        <KeywordList 
          keywords={keywords} 
          onEditClick={setEditingKeyword} 
          onDeleteClick={handleDeleteKeyword} 
        />
      </div>
    </Container>
    </>
  );
};

export default Keywords_SSOT;

