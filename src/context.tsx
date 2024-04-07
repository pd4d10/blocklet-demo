import { FC, PropsWithChildren, createContext, useMemo } from 'react';
import { useLocaleContext } from '@arcblock/ux/lib/Locale/context';
import { locales } from './utils';

type ContextValue = {
  t: typeof locales.en;
  locale: keyof typeof locales;
};

export const MyLocaleContext = createContext<ContextValue>({
  t: locales.en,
  locale: 'en',
});

export const MyLocaleProvider: FC<PropsWithChildren> = function LocaleProvider({ children }) {
  const locale = useLocaleContext().locale as ContextValue['locale'];
  const value: ContextValue = useMemo(() => {
    return {
      t: locales[locale] ?? locales.en,
      locale,
    };
  }, [locale]);

  return <MyLocaleContext.Provider value={value}>{children}</MyLocaleContext.Provider>;
};
