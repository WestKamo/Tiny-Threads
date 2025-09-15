'use client';

import Link from 'next/link';
import { Heart, Menu, ShoppingCart, User, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TeddyBear } from '@/components/icons';
import { useCart } from '@/hooks/use-cart';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '#categories', label: 'Categories' },
  { href: '/sell', label: 'Sell' },
  { href: '#about', label: 'About Us' },
];

export function Header() {
  const { cartCount, toggleCart } = useCart();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [logoClickCount, setLogoClickCount] = useState(0);
  const router = useRouter();

  const handleLogoClick = () => {
    const newClickCount = logoClickCount + 1;
    setLogoClickCount(newClickCount);
    if (newClickCount >= 5) {
      router.push('/admin/approve');
      setLogoClickCount(0);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <div onClick={handleLogoClick} className="cursor-pointer">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <TeddyBear className="h-6 w-6 text-primary-foreground fill-primary" />
              <span className="hidden font-bold sm:inline-block">Tiny Threads</span>
            </Link>
          </div>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navLinks.slice(0, 2).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <Sheet open={isMenuOpen} onOpenChange={setMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between border-b pb-4">
                 <Link href="/" className="flex items-center space-x-2" onClick={() => setMenuOpen(false)}>
                  <TeddyBear className="h-6 w-6 text-primary-foreground fill-primary" />
                  <span className="font-bold">Tiny Threads</span>
                </Link>
              </div>
              <nav className="flex flex-col gap-4 mt-6">
                {navLinks.map((link) => (
                   <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="text-lg font-medium transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          </SheetContent>
        </Sheet>
        
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div onClick={handleLogoClick} className="cursor-pointer md:hidden">
            <Link href="/" className="flex items-center gap-2">
              <TeddyBear className="h-6 w-6 text-primary-foreground fill-primary" />
              <span className="font-bold text-lg">Tiny Threads</span>
            </Link>
          </div>
          <div className="flex items-center">
             <Button variant="ghost" size="icon" asChild>
                <Link href="/favorites">
                  <Heart className="h-5 w-5" />
                  <span className="sr-only">Favorites</span>
                </Link>
              </Button>
             <Button variant="ghost" size="icon" className="relative" onClick={toggleCart}>
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {cartCount}
                </span>
              )}
              <span className="sr-only">Shopping Cart</span>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="/login">
                <User className="h-5 w-5" />
                <span className="sr-only">User Profile</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
