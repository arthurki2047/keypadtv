"use client";

import { Suspense } from 'react';
import Link from 'next/link';
import { ChevronDown, Tv } from 'lucide-react';
import { SearchBar } from './search-bar';
import { Skeleton } from './ui/skeleton';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getSortedCategories } from '@/lib/channels';

function SearchBarFallback() {
    return (
        <div className="flex flex-col items-center w-full max-w-sm gap-2">
            <div className="relative w-full">
                <Skeleton className="w-full rounded-full h-12 bg-white/20" />
            </div>
        </div>
    )
}

function CategoriesDropdown() {
    const sortedCategories = getSortedCategories();

    return (
        <div className="hidden md:block">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="text-primary-foreground hover:bg-primary-foreground/10 focus:ring-accent focus:ring-2">
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
        </div>
    );
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
        <div className="flex items-center gap-2">
            <Suspense fallback={<SearchBarFallback />}>
              <SearchBar />
            </Suspense>
            <CategoriesDropdown />
        </div>
      </div>
    </header>
  );
}
