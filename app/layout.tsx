import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ProvidersWrapper from './Provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FerrumCapital.az - Payment',
  description: ' ',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fc-store.s3.eu-north-1.amazonaws.com/site/apple-icon.png"
          rel="shortcut icon"
          type="image/x-icon"
        />
        <link
          href="https://fc-store.s3.eu-north-1.amazonaws.com/site/favicon.svg"
          rel="apple-touch-icon"
        />
      </head>
      <body className={inter.className}>
        <ProvidersWrapper>{children}</ProvidersWrapper>
      </body>
    </html>
  );
}
