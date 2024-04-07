import Button from '@arcblock/ux/lib/Button';
import { FC, useContext } from 'react';
import Result from '@arcblock/ux/lib/Result';
import { MyLocaleContext, SessionContext } from './context';

const AuthGuard: FC = function AuthGuard() {
  const { t } = useContext(MyLocaleContext);
  const { session } = useContext<any>(SessionContext);

  return (
    <Result
      status="info"
      title={t.connectInfo}
      extra={
        <Button
          onClick={() => {
            session.login();
          }}
          variant="contained">
          {t.connect}
        </Button>
      }
    />
  );
};

export default AuthGuard;
