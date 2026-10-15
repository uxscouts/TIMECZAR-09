// src/App.jsx
import React, { useState } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
//import { FormProvider } from './context/FormContext';
//import { Container, Row, Col } from 'reactstrap';

// Layout wrappers
import RootLayout from './components/RootLayout';
import SettingsLayout from './pages/settings/SettingsLayout';

// Primary App Pages
import Home from './pages/Home';
import Tomato_SSOT from './pages/Tomato_SSOT'; 
import Stats from './pages/Stats';
import Goals from './pages/Goals_SSOT';
import Category_SSOT from './pages/Category_SSOT';
import Keywords_SSOT from './pages/Keywords_SSOT';
import Logout from './pages/Logout';

// NEW: Import the static utility content pages
import About from './pages/About';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';

// Settings Sub-Pages
import AccountSubPage from './pages/settings/AccountSubPage';
import SecuritySubPage from './pages/settings/SecuritySubPage';



const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />, 
    children: [
      { index: true, element: <Home /> },
      { path: "tomato_SSOT", element: <Tomato_SSOT /> },
      { path: "stats", element: <Stats /> },
      { path: "goals", element: <Goals /> },
      { path: "categories", element: <Category_SSOT /> },
      { path: "keywords", element: <Keywords_SSOT /> },
      { path: "logout", element: <Logout /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "privacy", element: <PrivacyPolicy /> },
      
      // Nested settings routing architecture
      {
        path: "settings",
        element: <SettingsLayout />,
        children: [
          { index: true, element: <AccountSubPage /> },
          { path: "security", element: <SecuritySubPage /> }
        ]
      }
    ]
  },
  {
    path: "*",
    element: <Navigate to="/" replace />
  }
]);

export default function App() {

  return( 
    <>
  <RouterProvider router={router} />
  </>
  );
}
