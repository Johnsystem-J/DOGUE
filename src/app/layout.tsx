// File: src/app/layout.tsx
import type { Metadata } from 'next';
import { Sora } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import AuthProvider from '@/components/AuthProvider'; // 1. Import AuthProvider

const sora = Sora({ subsets: ['latin'], weight: ['400', '600', '700'] });

export const metadata: Metadata = {
  title: 'DOGUE - Premium Pet Care',
  description: 'The future of pet wellness and care.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${sora.className} bg-gray-50 text-gray-800`}>
        <AuthProvider> {/* 2. ครอบด้วย AuthProvider */}
          <Header />
          <main className="container mx-auto px-6 py-10">
            {children}
          </main>
        </AuthProvider> {/* 2. ครอบด้วย AuthProvider */}
      </body>
    </html>
  );
}