// src/app/[locale]/page.tsx
import { redirect } from 'next/navigation';

export default async function LocaleRedirectPage({ params }: { params: Promise<{locale: string}>; }) {
  // Wait for the params to resolve
  const { locale } = await params;
  return redirect(`/${ locale }/auth`);
}
