import React, { useState } from 'react';
import TomatoFormPage from '../components/TomatoForm'; // Importing your form layout page

const Tomato_SSOT = () => {
  // 1. Single Source of Truth for the form inputs
  const [tomatoData, setTomatoData] = useState({
    userid: '',
    categoryid: null,
    title: '',
    duration_mins: 25,
    notes: '',
  });

  // 2. Single Source of Truth for the category dropdown choices
  const [categories] = useState([
    { id: 1, name: 'Work' },
    { id: 2, name: 'Study' },
    { id: 3, name: 'Personal' },
  ]);

  // 3. Central handler to update state when a user types
  const handleFieldChange = (field, value) => {
    setTomatoData((prev) => ({
      ...prev,
      [field]: value === '' && field === 'categoryid' ? null : value,
    }));
  };

  // 4. Central handler to save data (e.g., Axios/Fetch API call)
  const handleTomatoSubmit = (data) => {
    console.log('Saving SSOT Data to Database:', data);
    // Your backend API call will go here
  };

  // 5. Connect them by passing the SSOT data and handlers down as props
  return (
    <TomatoFormPage
      formData={tomatoData}
      onFieldChange={handleFieldChange}
      onFormSubmit={handleTomatoSubmit}
      categoriesList={categories}
    />
  );
};

export default Tomato_SSOT;
