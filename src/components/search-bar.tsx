"use client";

import { useState, useEffect, ChangeEvent } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function SearchBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');

  // Syncs the input field with the URL query parameter
  useEffect(() => {
    setSearchTerm(searchParams.get('q') || '');
  }, [searchParams]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    
    if (newSearchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(newSearchTerm)}`);
    } else if (pathname === '/search') {
      router.push('/');
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const searchInput = document.getElementById('search-input');
    if (searchInput instanceof HTMLElement) {
      searchInput.blur();
    }
  };
  
  return (
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
  );
}
