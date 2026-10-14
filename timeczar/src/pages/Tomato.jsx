import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Button, FormText, Container, Row, Col } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// 1. THE FORM COMPONENT (Child)
// This receives state and handlers via props and handles the UI layout.
const TomatoForm = ({ formData, onChange, onSubmit, categories }) => {
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    // Parse numeric fields appropriately
    const parsedValue = type === 'number' && value !== '' ? parseInt(value, 10) : value;
    onChange(name, parsedValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents the browser from reloading the page
    onSubmit(formData);
  };

  return (
    <Form onSubmit={handleSubmit} className="p-4 border rounded bg-light">
      <h4 className="mb-3">Tomato Entry Form</h4>

      {/* User ID */}
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

      {/* Category ID */}
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

      {/* Title */}
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

      {/* Duration */}
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

      {/* Notes */}
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

// 2. THE CONTAINER COMPONENT (Parent)
// This holds the Single Source of Truth (SSOT) state and manages backend submissions.
const Tomato = () => {
  // State for the tomato record
  const [tomatoData, setTomatoData] = useState({
    userid: '',
    categoryid: null,
    title: '',
    duration_mins: 25,
    notes: '',
  });

  // State for categories list
  const [categories] = useState([
    { id: 1, name: 'Work' },
    { id: 2, name: 'Study' },
    { id: 3, name: 'Personal' },
  ]);

  const handleFieldChange = (field, value) => {
    setTomatoData((prev) => ({
      ...prev,
      [field]: value === '' && field === 'categoryid' ? null : value,
    }));
  };

  const handleTomatoSubmit = (data) => {
    console.log('SSOT Submitted Data:', data);
    // Send data to your backend API or SQL layer here
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <TomatoForm
            formData={tomatoData}
            onChange={handleFieldChange}
            onSubmit={handleTomatoSubmit}
            categories={categories}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Tomato;
