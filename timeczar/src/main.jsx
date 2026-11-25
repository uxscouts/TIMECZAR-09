import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './index.css';
import './App.css';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import Header from './components/Header.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <Header/>
      <App />
    </AuthProvider>
  </StrictMode>
);