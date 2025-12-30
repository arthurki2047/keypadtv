"use client";

import { Tv, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

type HeaderProps = {
  searchTerm: string;
  onSearchChange: (term: string) => void;
};

export function Header({ searchTerm, onSearchChange }: HeaderProps) {
  return (
    <header className="sticky top-0 z-20 bg-primary/80 backdrop-blur-sm shadow-md">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 gap-4">
        <div className="flex items-center gap-3 shrink-0">
          <Tv className="h-8 w-8 md:h-10 md:w-10 text-accent" />
          <h1 className="text-xl md:text-2xl font-bold tracking-wider text-primary-foreground font-headline">
            Keypad TV
          </h1>
        </div>
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-6 w-6 text-primary-foreground/60" />
          <Input
            id="search-input"
            type="text"
            placeholder="Search channels..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full rounded-full bg-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60 border-2 border-transparent focus:border-accent focus:ring-accent pl-12 h-12 text-lg"
            aria-label="Search for TV channels"
          />
        </div>
      </div>
    </header>
  );
}
