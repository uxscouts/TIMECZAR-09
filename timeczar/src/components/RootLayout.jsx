// src/components/RootLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from './Navigation'; // Your Reactstrap nav
import Footer from './Footer'; // Import your new footer

export default function RootLayout() {
  return (
    <>
      <Navigation />
      {/* Outlet acts as a placeholder. Dynamic page components inject here */}
      <div className="app-main-content">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
