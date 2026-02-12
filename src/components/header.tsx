"use client";

import { Suspense } from 'react';
import Link from 'next/link';
import { Tv, ChevronDown } from 'lucide-react';
import { SearchBar } from './search-bar';
import { Skeleton } from './ui/skeleton';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getSortedCategories } from '@/lib/channels';

function SearchBarFallback() {
    return (
        <div className="w-full max-w-sm">
            <Skeleton className="w-full rounded-full h-12 bg-primary-foreground/20" />
        </div>
    )
}

function CategoriesDropdown() {
    const sortedCategories = getSortedCategories();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-primary-foreground hover:bg-primary-foreground/10 focus:ring-accent focus:ring-2 rounded-full px-4 text-base">
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
        <div className="flex flex-1 justify-end items-center gap-4">
            <div className="w-full max-w-sm">
              <Suspense fallback={<SearchBarFallback />}>
                <SearchBar />
              </Suspense>
            </div>
            <div className="hidden md:block">
              <CategoriesDropdown />
            </div>
        </div>
      </div>
    </header>
  );
}
