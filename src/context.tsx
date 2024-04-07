import { FC, PropsWithChildren, createContext, useMemo } from 'react';
import { useLocaleContext } from '@arcblock/ux/lib/Locale/context';

import { locales } from './utils';

export const MyLocaleContext = createContext({
  t: {} as typeof locales.en,
});

export const MyLocaleProvider: FC<PropsWithChildren> = function LocaleProvider({ children }) {
  const { locale } = useLocaleContext();
  const value = useMemo(() => {
    return {
      t: locales[locale as keyof typeof locales] ?? locales.en,
    };
  }, [locale]);

  return <MyLocaleContext.Provider value={value}>{children}</MyLocaleContext.Provider>;
};
