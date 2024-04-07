import { FC, PropsWithChildren, createContext, useMemo } from 'react';
import { useLocaleContext } from '@arcblock/ux/lib/Locale/context';
import { createAuthServiceSessionContext } from '@arcblock/did-connect/lib/Session';

import { locales } from './utils';

export const { SessionProvider, SessionContext } = createAuthServiceSessionContext();

type LocaleContextValue = {
  t: typeof locales.en;
  locale: keyof typeof locales;
};

export const MyLocaleContext = createContext<LocaleContextValue>({
  t: locales.en,
  locale: 'en',
});

export const MyLocaleProvider: FC<PropsWithChildren> = function LocaleProvider({ children }) {
  const locale = useLocaleContext().locale as LocaleContextValue['locale'];
  const value: LocaleContextValue = useMemo(() => {
    return {
      t: locales[locale] ?? locales.en,
      locale,
    };
  }, [locale]);

  return <MyLocaleContext.Provider value={value}>{children}</MyLocaleContext.Provider>;
};
