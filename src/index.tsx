import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { LocaleProvider } from '@arcblock/ux/lib/Locale/context';
import { ThemeProvider } from '@arcblock/ux/lib/Theme';
import { createAuthServiceSessionContext } from '@arcblock/did-connect/lib/Session';
import App from './app';
import { MyLocaleProvider } from './context';

const { SessionProvider } = createAuthServiceSessionContext();

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
