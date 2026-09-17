import React, { useState } from 'react';
import { NavLink as RouterNavLink } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container
} from 'reactstrap';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  // Safely close the mobile drawer when clicking a link
  const closeMenu = () => { if (isOpen) setIsOpen(false); };

  return (
   <Navbar color="light" light expand="md" className="sticky-top shadow-sm py-2 bg-light">
      <Container fluid="lg">
        {/* Brand/Logo */}
        <NavbarBrand tag={RouterNavLink} to="/" onClick={closeMenu} className="fw-bold tracking-wide">
          ⏱️ TIMECZAR
        </NavbarBrand>

        {/* Mobile Hamburger */}
        <NavbarToggler onClick={toggle} />

        {/* Collapsible Content */}
        <Collapse isOpen={isOpen} navbar>
          {/* Main Application Links (Left-aligned) */}
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink tag={RouterNavLink} to="/" end onClick={closeMenu}>
                Home
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RouterNavLink} to="/tomato" onClick={closeMenu}>
                Tomato
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RouterNavLink} to="/stats" onClick={closeMenu}>
                Stats
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RouterNavLink} to="/goals" onClick={closeMenu}>
                Goals
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RouterNavLink} to="/categories" onClick={closeMenu}>
                Categories
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RouterNavLink} to="/keywords" onClick={closeMenu}>
                Keywords
              </NavLink>
            </NavItem>
          </Nav>

          {/* User Account Dropdown (Right-aligned) */}
          <Nav className="ms-auto align-items-center" navbar>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Profile
              </DropdownToggle>
              <DropdownMenu end className="shadow border-0 mt-2">
                <DropdownItem tag={RouterNavLink} to="/settings" onClick={closeMenu}>
                  Settings
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem tag={RouterNavLink} to="/logout" onClick={closeMenu} className="text-danger">
                  Logout
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
