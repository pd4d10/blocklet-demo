import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import App from './app';

createRoot(document.getElementById('app')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
