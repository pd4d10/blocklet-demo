import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { LocaleProvider } from '@arcblock/ux/lib/Locale/context';
import { ThemeProvider } from '@arcblock/ux/lib/Theme';
import App from './app';
import { MyLocaleProvider, SessionProvider } from './context';

createRoot(document.getElementById('app')!).render(
  <StrictMode>
    <ThemeProvider>
      <SessionProvider>
        <LocaleProvider translations={{}}>
          <MyLocaleProvider>
            <App />
          </MyLocaleProvider>
        </LocaleProvider>
      </SessionProvider>
    </ThemeProvider>
  </StrictMode>
);
