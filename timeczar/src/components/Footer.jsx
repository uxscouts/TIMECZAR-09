// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-light text-light border-top border-secondary py-4 mt-auto">
      <Container fluid="lg">
        <Row className="align-items-center gy-3">
          {/* Copyright Section */}
          <Col md={6} className="text-center text-md-start">
            <span className="text-muted small">
              &copy; {currentYear} TIMECZAR. All rights reserved.
            </span>
          </Col>

          {/* Utility Navigation Links */}
          <Col md={6} className="text-center text-md-end">
            <Link to="/about" className="text-muted text-decoration-none mx-2 small hover-white">
              About
            </Link>
            <span className="text-muted">|</span>
            <Link to="/contact" className="text-muted text-decoration-none mx-2 small hover-white">
              Contact
            </Link>
            <span className="text-muted">|</span>
            <Link to="/privacy" className="text-muted text-decoration-none mx-2 small hover-white">
              Privacy Policy
            </Link>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
