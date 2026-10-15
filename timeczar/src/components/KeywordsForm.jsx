// Tomato.jsx
import React from 'react';
import { Form, FormGroup, Label, Input, Button, FormText, Container, Row, Col } from 'reactstrap';


const KeywordForm= ({ formData, onFieldChange, onFormSubmit, keywordList }) => {
 
 
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
              <Label for="title">Keyword</Label>
              <Input
                type="text"
                name="keyword"
                id="keyword"
                maxLength={100}
               //  value={formData.title || ''}
                onChange={handleChange}
              />
            </FormGroup>
            <Button color="primary" type="submit">
              Create Keyword
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
export default KeywordForm;

