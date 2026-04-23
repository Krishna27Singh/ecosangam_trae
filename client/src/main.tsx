import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { AuthProvider } from './context/AuthContext';
import { AnimatedBackground } from '@/components/AnimatedBackground';

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <div className="relative min-h-screen font-roboto-condensed overflow-hidden">
        {/* 🎨 Rendered only once here */}
        <AnimatedBackground />
        <div className="relative z-10">
          <App />
        </div>
      </div>
    </AuthProvider>
  </React.StrictMode>
);
