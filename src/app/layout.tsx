import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Sahay (सहाय) — AI Citizen Grievance & Document Assistant',
  description: 'Understand complicated official paperwork, notices, court orders, bills, and government procedures in Bengali, Hindi, and English without confusion or intermediaries.',
  keywords: [
    'Sahay',
    'AI citizen assistant',
    'government document assistant',
    'RTI application generator',
    'Bengali document AI',
    'Hindi document AI',
    'WBSEDCL bill notice',
    'Ration card e-KYC',
    'CPGRAMS grievance',
    'citizen paperwork helper'
  ],
  manifest: '/manifest.json',
  authors: [{ name: 'Sahay Team' }],
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
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/icon.svg" />
      </head>
      <body>
        {children}
        <script
          dangerouslySetInnerHTML={{
            __html: `if('serviceWorker' in navigator){window.addEventListener('load',function(){navigator.serviceWorker.register('/sw.js').catch(function(){})})}`,
          }}
        />
      </body>
    </html>
  );
}
