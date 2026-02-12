"use client";

import { Suspense } from 'react';
import { Tv } from 'lucide-react';
import { SearchBar } from './search-bar';
import { Skeleton } from './ui/skeleton';

function SearchBarFallback() {
    return (
        <div className="flex flex-col items-center w-full max-w-sm gap-2">
            <div className="relative w-full">
                <Skeleton className="w-full rounded-full h-12 bg-white/20" />
            </div>
        </div>
    )
}

export function Header() {
  return (
    <header className="sticky top-0 z-20 bg-primary/80 backdrop-blur-sm shadow-md">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 gap-4">
        <a href="/" className="flex items-center gap-3 shrink-0">
          <Tv className="h-8 w-8 md:h-10 md:w-10 text-accent" />
          <h1 className="text-xl md:text-2xl font-bold tracking-wider text-primary-foreground font-headline">
            Keypad TV
          </h1>
        </a>
        <Suspense fallback={<SearchBarFallback />}>
          <SearchBar />
        </Suspense>
      </div>
    </header>
  );
}
