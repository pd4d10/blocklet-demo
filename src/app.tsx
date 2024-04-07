import { Footer, Header } from '@blocklet/ui-react';
import { FC, useContext } from 'react';
import ProfileEditor from './profile-editor';
import { MyLocaleContext } from './context';

const App: FC = function App() {
  const { t } = useContext(MyLocaleContext);

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
      <ProfileEditor />
      <Footer
        // no meaning, for TS types
        meta={undefined}
        theme={undefined}
      />
    </>
  );
};

export default App;
