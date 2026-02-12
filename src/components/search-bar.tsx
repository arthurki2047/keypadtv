"use client";

import { useState, useEffect, ChangeEvent } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Search, ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getSortedCategories } from '@/lib/channels';
import Link from 'next/link';

function CategoriesDropdown() {
    const sortedCategories = getSortedCategories();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-muted-foreground hover:bg-accent/10 focus:ring-accent focus:ring-2 rounded-full px-4">
                    Categories
                    <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {sortedCategories.map(([category]) => (
                    <DropdownMenuItem key={category} asChild>
                        <Link href={`/#${category.toLowerCase()}`}>{category}</Link>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

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
    <div className="w-full max-w-lg">
        <form onSubmit={handleFormSubmit} className="relative flex items-center w-full bg-background rounded-full border-2 border-input focus-within:border-accent focus-within:ring-2 focus-within:ring-accent">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground" />
          <Input
            id="search-input"
            type="text"
            placeholder="Search channels..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full bg-transparent text-foreground placeholder:text-muted-foreground border-0 focus:ring-0 pl-12 h-11 text-lg"
            aria-label="Search for TV channels"
          />
          <div className="pr-2 hidden md:block">
            <CategoriesDropdown />
          </div>
          <Button type="submit" id="search-button" className="sr-only" aria-label="Submit search">Search</Button>
        </form>
    </div>
  );
}
