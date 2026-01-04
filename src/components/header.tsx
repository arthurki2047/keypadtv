"use client";

import { useState, useEffect, ChangeEvent } from 'react';
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

  // Syncs the input field with the URL query parameter
  useEffect(() => {
    const query = searchParams.get('q') || '';
    setSearchTerm(query);
  }, [searchParams]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    
    if (newSearchTerm.trim()) {
      // If there's a search term, navigate to the search page
      router.push(`/search?q=${encodeURIComponent(newSearchTerm)}`);
    } else if (pathname === '/search') {
      // If the search term is cleared and we are on the search page, go back to the homepage
      router.push('/');
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    // Prevent default form submission to avoid a full page reload.
    // The navigation is already handled by handleSearchChange.
    e.preventDefault();
    const searchInput = document.getElementById('search-input');
    if (searchInput instanceof HTMLElement) {
      searchInput.blur();
    }
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
            <form onSubmit={handleFormSubmit} className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground" />
              <Input
                id="search-input"
                type="text"
                placeholder="Search channels..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full rounded-full bg-background text-foreground placeholder:text-muted-foreground border-2 border-input focus:border-accent focus:ring-accent pl-12 h-12 text-lg"
                aria-label="Search for TV channels"
              />
              <Button type="submit" id="search-button" className="sr-only" aria-label="Submit search">Search</Button>
            </form>
        </div>
      </div>
    </header>
  );
}
