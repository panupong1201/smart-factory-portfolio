import { LanguageProvider } from "../../components/LanguageProvider";

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<LocaleLayoutProps>) {
  const { locale = "en" } = await params;

  return (
    <LanguageProvider initialLang={locale}>{children}</LanguageProvider>
  );
}
