import React, { ReactNode } from 'react';
import { IntlProvider } from 'react-intl';
import { LOCALES, messages } from './locale';

/**
 * Wraps content with IntlProvider, to process languages
 * @param props Children and Locale
 * @returns
 */
export function WrapIntlProvider(props: { children: ReactNode; locale: string }): JSX.Element {
  const { children, locale } = props;
  const loc = locale || LOCALES.ENGLISH;

  return (
    <IntlProvider messages={messages[loc]} locale={loc} defaultLocale={LOCALES.ENGLISH}>
      {children}
    </IntlProvider>
  );
}
