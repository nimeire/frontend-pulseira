import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ConfirmacaoProvider } from './context/ConfirmacaoContext';
import { NotificacaoProvider } from './context/NotificacaoContext';
import { ThemeProvider } from './context/ThemeContext';
import App from './App.tsx';
import './styles/global.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ThemeProvider>
        <AuthProvider>
          <NotificacaoProvider>
            <ConfirmacaoProvider>
              <App />
            </ConfirmacaoProvider>
          </NotificacaoProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
);
