import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { StudyDataProvider } from './context/StudyDataContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <StudyDataProvider>
          <App />
        </StudyDataProvider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
