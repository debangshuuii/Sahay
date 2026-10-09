import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'JibonSathi AI - Understand the paperwork. Know your next step.',
  description: 'Multilingual personal life-administration assistant that helps ordinary people understand complicated official documents, government procedures, bills, notices, and applications in Bengali, Hindi, and English.',
  keywords: [
    'JibonSathi AI',
    'Sahay',
    'government document assistant',
    'Bengali document AI',
    'Hindi document AI',
    'WBSEDCL bill notice',
    'Ration card e-KYC',
    'Income certificate procedure',
    'citizen paperwork helper'
  ],
  authors: [{ name: 'JibonSathi AI Team' }],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0F4C3A',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
