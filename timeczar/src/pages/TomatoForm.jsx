import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Button, FormText } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const TomatoForm = ({ formData, onChange, onSubmit, categories = [] }) => {
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    // Parse numeric fields appropriately
    const parsedValue = type === 'number' && value !== '' ? parseInt(value, 10) : value;
    onChange(name, parsedValue);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Form onSubmit={handleFormSubmit} className="p-4 border rounded bg-light">
      <h4 className="mb-3">Tomato Entry Form</h4>

      {/* User ID (Foreign Key to users) */}
      <FormGroup>
        <Label for="userid">User ID</Label>
        <Input
          type="number"
          name="userid"
          id="userid"
          value={formData.userid || ''}
          onChange={handleChange}
          required
          placeholder="Enter user ID"
        />
      </FormGroup>

      {/* Category ID (Foreign Key to category, nullable) */}
      <FormGroup>
        <Label for="categoryid">Category</Label>
        <Input
          type="select"
          name="categoryid"
          id="categoryid"
          value={formData.categoryid ?? ''}
          onChange={handleChange}
        >
          <option value="">-- No Category (NULL) --</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name || `Category #${cat.id}`}
            </option>
          ))}
        </Input>
        <FormText color="muted">Optional category reference</FormText>
      </FormGroup>

      {/* Title (varchar 100) */}
      <FormGroup>
        <Label for="title">Title</Label>
        <Input
          type="text"
          name="title"
          id="title"
          maxLength={100}
          value={formData.title || ''}
          onChange={handleChange}
          placeholder="Enter tomato/task title"
        />
      </FormGroup>

      {/* Duration in Minutes (default 25) */}
      <FormGroup>
        <Label for="duration_mins">Duration (Minutes)</Label>
        <Input
          type="number"
          name="duration_mins"
          id="duration_mins"
          min={1}
          value={formData.duration_mins ?? 25}
          onChange={handleChange}
          required
        />
      </FormGroup>

      {/* Notes (text) */}
      <FormGroup>
        <Label for="notes">Notes</Label>
        <Input
          type="textarea"
          name="notes"
          id="notes"
          rows={3}
          value={formData.notes || ''}
          onChange={handleChange}
          placeholder="Add any extra notes..."
        />
      </FormGroup>

      <Button color="primary" type="submit">
        Save Tomato
      </Button>
    </Form>
  );
};

export default TomatoForm;
