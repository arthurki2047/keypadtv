"use client";

import { useState, useEffect, FormEvent } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Tv, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import type { Channel } from '@/lib/channels';

type HeaderProps = {
  allChannels: Channel[];
};

export function Header({ allChannels }: HeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');

  useEffect(() => {
    const query = searchParams.get('q');
    if (pathname !== '/search' && query === null && searchTerm !== '') {
        setSearchTerm('');
    }
  }, [pathname, searchParams, searchTerm]);

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmedTerm = searchTerm.trim();
    if (trimmedTerm) {
      router.push(`/search?q=${encodeURIComponent(trimmedTerm)}`);
    } else {
      if (pathname === '/search') {
        router.push('/');
      }
    }
    const searchInput = document.getElementById('search-input');
    if (searchInput instanceof HTMLElement) {
      searchInput.blur();
    }
  };

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };
  
  return (
    <header className="sticky top-0 z-20 bg-primary/80 backdrop-blur-sm shadow-md">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 gap-4">
        <a href="/" className="flex items-center gap-3 shrink-0">
          <Tv className="h-8 w-8 md:h-10 md:w-10 text-accent" />
          <h1 className="text-xl md:text-2xl font-bold tracking-wider text-primary-foreground font-headline">
            Keypad TV
          </h1>
        </a>
        <div className="flex flex-col items-center w-full max-w-sm gap-2">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-6 w-6 text-primary-foreground/60" />
              <Input
                id="search-input"
                type="text"
                placeholder="Search channels..."
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full rounded-full bg-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60 border-2 border-transparent focus:border-accent focus:ring-accent pl-12 h-12 text-lg"
                aria-label="Search for TV channels"
              />
              <Button type="submit" id="search-button" className="sr-only" aria-label="Submit search">Search</Button>
            </form>
        </div>
      </div>
    </header>
  );
}
