import { Footer, Header } from '@blocklet/ui-react';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <>
      <Header
        // brand={null}
        // description={null}
        // maxWidth={false}
        meta={undefined}
        addons={undefined}
        sessionManagerProps={undefined}
        homeLink={undefined}
        theme={undefined}
        hideNavMenu={undefined}
      />
      <Outlet />
      <Footer meta={undefined} theme={undefined} />
    </>
  );
}
