import { Footer, Header } from '@blocklet/ui-react';
import { FC } from 'react';
import { useLocaleContext } from '@arcblock/ux/lib/Locale/context';
import Info from './info';
import locales from './locales';

const App: FC = function App() {
  const { locale } = useLocaleContext();
  const t = locales[locale as keyof typeof locales] ?? locales.en;

  return (
    <>
      <Header
        brand={t.profile}
        maxWidth={false}
        // no meaning, for TS types
        meta={undefined}
        addons={undefined}
        sessionManagerProps={undefined}
        homeLink={undefined}
        theme={undefined}
        hideNavMenu={undefined}
      />
      <Info />
      <Footer
        // no meaning, for TS types
        meta={undefined}
        theme={undefined}
      />
    </>
  );
};

export default App;
