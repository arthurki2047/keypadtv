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

export function CategoriesDropdown() {
    const sortedCategories = getSortedCategories();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button id="categories-button" variant="outline" className="focus:ring-accent focus:ring-2 rounded-full px-4 text-base">
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
