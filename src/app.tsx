import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { LocaleProvider } from '@arcblock/ux/lib/Locale/context';
import { ThemeProvider } from '@arcblock/ux/lib/Theme';
import Layout from './components/layout';
import { SessionProvider } from './contexts/session';
import Info from './pages/info';

export default function WrappedApp() {
  // While the blocklet is deploy to a sub path, this will be work properly.
  const basename = window.blocklet?.prefix ?? '/';

  return (
    <ThemeProvider>
      <SessionProvider>
        <LocaleProvider translations={{}}>
          <BrowserRouter basename={basename}>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route path="" element={<Info />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </LocaleProvider>
      </SessionProvider>
    </ThemeProvider>
  );
}
