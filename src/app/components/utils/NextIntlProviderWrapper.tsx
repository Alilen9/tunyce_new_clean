'use client';

import {NextIntlClientProvider} from 'next-intl';

export default function NextIntlProviderWrapper({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <NextIntlClientProvider>
      {children}
    </NextIntlClientProvider>
  );
}