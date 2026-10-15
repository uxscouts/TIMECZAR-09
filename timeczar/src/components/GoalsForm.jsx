// Tomato.jsx
import React from 'react';
import { Form, FormGroup, Label, Input, Button, FormText, Container, Row, Col } from 'reactstrap';


const GoalForm= ({ formData, onFieldChange, onFormSubmit, goalList }) => {
 
 
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


  return(
    <Container className="py-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Form onSubmit={handleSubmit} className="p-4 border rounded bg-light">
            <FormGroup>
             {/* <Label for="userid">User ID</Label> */}
              <Input
                type="hidden"
                name="userid"
                id="userid"
               // value={formData.userid || ''}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label for="title">Goal</Label>
              <Input
                type="text"
                name="goal"
                id="goal"
                maxLength={100}
               //  value={formData.title || ''}
                onChange={handleChange}
              />
            </FormGroup>


            <FormGroup>
              <Label for="tomnato_count">Tomato Count</Label>
              <Input
                type="number"
                name="tomnato_count"
                id="tomnato_count"
                min={1}
                max={20}
               // value={formData.duration_mins ?? 25}
                onChange={handleChange}
                required
              />
            </FormGroup>


            <Button color="primary" type="submit">
              Create Goal
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
export default GoalForm;

