// src/pages/settings/SettingsLayout.jsx
import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Container, Row, Col, ListGroup, ListGroupItem } from 'reactstrap';

export default function SettingsLayout() {
  return (
    <Container className="py-4">
      <Row>
        {/* Left Sub-Navigation Sidebar */}
        <Col md={3} className="mb-4">
          <ListGroup>
            <ListGroupItem tag={NavLink} to="/settings" end action>
              ⚙️ Account Configuration
            </ListGroupItem>
            <ListGroupItem tag={NavLink} to="/settings/security" action>
              🔒 Security & Password
            </ListGroupItem>
          </ListGroup>
        </Col>

        {/* Right Dynamic Target Output Display Box */}
        <Col md={9}>
          <div className="p-4 border rounded bg-white shadow-sm">
            <Outlet />
          </div>
        </Col>
      </Row>
    </Container>
  );
}
