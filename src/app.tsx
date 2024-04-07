import { Footer, Header } from '@blocklet/ui-react';
import { FC, useContext } from 'react';
import { Container } from '@mui/material';
import ProfileEditor from './profile-editor';
import { MyLocaleContext, SessionContext } from './context';
import AuthGuard from './auth-guard';

const App: FC = function App() {
  const { t } = useContext(MyLocaleContext);
  const { session } = useContext<any>(SessionContext);

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
      <Container
        maxWidth="lg"
        style={{
          padding: 20,
          height: 'calc(100vh - 64px - 68px)', // exclude header and footer
        }}>
        {session.user ? <ProfileEditor /> : <AuthGuard />}
      </Container>

      <Footer
        // no meaning, for TS types
        meta={undefined}
        theme={undefined}
      />
    </>
  );
};

export default App;
