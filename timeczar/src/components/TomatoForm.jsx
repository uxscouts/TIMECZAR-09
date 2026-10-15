// Tomato.jsx
import React from 'react';
import { Form, FormGroup, Label, Input, Button, FormText, Container, Row, Col } from 'reactstrap';

// This page accepts the SSOT tools through its parameters
const Tomato = ({ formData, onFieldChange, onFormSubmit, categoriesList }) => {
  
  // Local wrapper to intercept raw typing events
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const parsedValue = type === 'number' && value !== '' ? parseInt(value, 10) : value;
    // Sends the clean data back up to Tomato_SSOT
    onFieldChange(name, parsedValue); 
  };

  // Local wrapper to intercept form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onFormSubmit(formData); // Triggers the save function in Tomato_SSOT
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Form onSubmit={handleSubmit} className="p-4 border rounded bg-light">
            <h4 className="mb-3">Tomato Entry Form</h4>

            <FormGroup>
              <Label for="userid">User ID</Label>
              <Input
                type="number"
                name="userid"
                id="userid"
                value={formData.userid || ''}
                onChange={handleChange}
                required
              />
            </FormGroup>

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
                {categoriesList.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </Input>
            </FormGroup>

            <FormGroup>
              <Label for="title">Title</Label>
              <Input
                type="text"
                name="title"
                id="title"
                maxLength={100}
                value={formData.title || ''}
                onChange={handleChange}
              />
            </FormGroup>

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

            <FormGroup>
              <Label for="notes">Notes</Label>
              <Input
                type="textarea"
                name="notes"
                id="notes"
                rows={3}
                value={formData.notes || ''}
                onChange={handleChange}
              />
            </FormGroup>

            <Button color="primary" type="submit">
              Save Tomato
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Tomato;
