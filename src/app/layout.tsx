import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Header } from '@/components/layout/header';
import { CartProvider } from '@/contexts/cart-context';
import { CartSheet } from '@/components/cart-sheet';
import { AuthProvider } from '@/contexts/auth-context';

export const metadata: Metadata = {
  title: 'Tiny Threads',
  description: 'A modern, mobile-friendly e-commerce app for buying and selling baby clothes.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <AuthProvider>
          <CartProvider>
            <div className="flex flex-col min-h-screen bg-background">
              <Header />
              <main className="flex-1">{children}</main>
            </div>
            <CartSheet />
            <Toaster />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
