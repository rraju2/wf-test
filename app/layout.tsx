import './globals.css'; // Assuming you have a global CSS file
import React from 'react';
import Link from 'next/link';
import { MegaMenu } from './components/Megamenu';
// We will create this component

export const metadata = {
  title: 'Dynamic Layouts App',
  description: 'An application demonstrating dynamic layouts in Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <MegaMenu />
        <div style={{ padding: '0 20px' }}>{children}</div>
      </body>
    </html>
  );
}