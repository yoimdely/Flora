import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { AnalyticsScripts } from "../components/AnalyticsScripts";

const manrope = Manrope({ subsets: ["latin", "cyrillic"], variable: "--font-manrope" });

export const metadata: Metadata = {
  metadataBase: new URL("https://сочи-в-аренду.рф"),
  title: "Flora Home — доверительное управление недвижимостью в Сочи",
  description:
    "Flora Home — управляющая компания премиум-класса. Запускаем аренду в Сочи, Адлере и Красной Поляне за 5 дней под ключ, с прозрачной аналитикой и динамическим ценообразованием.",
  openGraph: {
    title: "Flora Home",
    description:
      "Доверительное управление апартаментами в Сочи, Адлере и Красной Поляне. Высокая заполняемость, автоматизация и прозрачная отчётность.",
    url: "https://сочи-в-аренду.рф",
    siteName: "Flora Home",
    locale: "ru_RU",
    type: "website"
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={manrope.variable}>
      <head>
        <AnalyticsScripts />
      </head>
      <body className="font-sans bg-slate-950 text-white">
        {children}
      </body>
    </html>
  );
}
