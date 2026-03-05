"use client";

import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getSortedCategories } from '@/lib/channels';
import { useSearchParams } from 'next/navigation';

export function CategoriesDropdown() {
    const sortedCategories = getSortedCategories();
    const searchParams = useSearchParams();
    const activeCat = searchParams.get('cat');

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button 
                    id="categories-button" 
                    variant="outline" 
                    size="sm" 
                    className="focus:ring-accent focus:ring-2 rounded-full px-3 text-sm h-9"
                >
                    {activeCat ? activeCat.charAt(0).toUpperCase() + activeCat.slice(1) : 'Categories'}
                    <ChevronDown className="ml-1.5 h-4 w-4 opacity-70" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem asChild>
                    <Link href="/">Reset All</Link>
                </DropdownMenuItem>
                {sortedCategories.map(([category]) => (
                    <DropdownMenuItem key={category} asChild>
                        <Link href={`/?cat=${category.toLowerCase()}`}>{category}</Link>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
