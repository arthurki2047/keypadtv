"use client";

import { useEffect, useRef } from 'react';

type UseKeypadNavigationProps = {
  gridRef: React.RefObject<HTMLElement>;
  itemCount: number;
  columns: number;
  onEnter: (index: number) => void;
  focusIndex: number;
  setFocusIndex: (index: number) => void;
  loop?: boolean;
  disable?: boolean;
};

// Focus constants
const SEARCH_INPUT_INDEX = -1;
const SEARCH_BUTTON_INDEX = -2;

export function useKeypadNavigation({
  gridRef,
  itemCount,
  columns,
  onEnter,
  focusIndex,
  setFocusIndex,
  loop = true,
  disable = false,
}: UseKeypadNavigationProps) {
    const lastInteraction = useRef<'key' | 'mouse'>('mouse');

    useEffect(() => {
        if (disable) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            lastInteraction.current = 'key';
            let newIndex = focusIndex;

            const searchInput = document.getElementById('search-input') as HTMLInputElement | null;
            const searchButton = document.getElementById('search-button') as HTMLButtonElement | null;
            const isSearchActive = document.activeElement === searchInput || document.activeElement === searchButton;

            if (document.activeElement === searchInput && !['ArrowDown', 'Enter'].includes(e.key)) {
                return; // Allow typing in search
            }
             if (e.target instanceof HTMLInputElement && e.key !== 'Enter') {
                if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
                    (e.target as HTMLElement).blur();
                } else {
                     return;
                }
            }


            switch (e.key) {
                case 'ArrowUp':
                    e.preventDefault();
                    if (focusIndex < columns) { // Top row of grid
                        newIndex = SEARCH_INPUT_INDEX;
                    } else if (focusIndex === SEARCH_BUTTON_INDEX) {
                        newIndex = SEARCH_INPUT_INDEX;
                    } else {
                        newIndex = focusIndex - columns;
                    }
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    if (focusIndex === SEARCH_INPUT_INDEX) {
                        if (searchButton) newIndex = SEARCH_BUTTON_INDEX;
                        else newIndex = 0;
                    } else if (focusIndex === SEARCH_BUTTON_INDEX) {
                        newIndex = 0; // Go to first grid item
                    } else {
                        newIndex = focusIndex + columns;
                    }
                    break;
                case 'ArrowLeft':
                    e.preventDefault();
                    if (focusIndex >= 0 && focusIndex % columns !== 0) {
                        newIndex = focusIndex - 1;
                    }
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    if (focusIndex >= 0 && (focusIndex + 1) % columns !== 0 && focusIndex + 1 < itemCount) {
                        newIndex = focusIndex + 1;
                    }
                    break;
                case 'Enter':
                    e.preventDefault();
                    if (focusIndex >= 0) {
                      onEnter(focusIndex);
                    } else if (focusIndex === SEARCH_INPUT_INDEX && searchButton) {
                        searchButton.click();
                    } else if (focusIndex === SEARCH_BUTTON_INDEX && searchButton) {
                        searchButton.click();
                    }
                    return;
                default:
                    return;
            }

            if (newIndex >= -2 && newIndex < itemCount) {
                setFocusIndex(newIndex);
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [focusIndex, setFocusIndex, itemCount, columns, onEnter, gridRef, loop, disable]);

    useEffect(() => {
        if (disable || lastInteraction.current === 'mouse') return;

        const searchInput = document.getElementById('search-input') as HTMLInputElement | null;
        const searchButton = document.getElementById('search-button') as HTMLButtonElement | null;

        if (focusIndex === SEARCH_INPUT_INDEX) {
            searchInput?.focus();
            return;
        }
        if (focusIndex === SEARCH_BUTTON_INDEX) {
            searchButton?.focus();
            return;
        }
        
        if (focusIndex < 0) return;

        const grid = gridRef.current;
        if (!grid) return;
        
        const itemContainer = grid.children[focusIndex] as HTMLElement;
        if (itemContainer) {
            const focusableElement = itemContainer.querySelector('a, button, input, [tabindex]:not([tabindex="-1"])') as HTMLElement;
            if(focusableElement) {
                focusableElement.focus();
            }
        }
    }, [focusIndex, gridRef, itemCount, disable]);

    const handleMouseOver = (index: number) => {
      if (disable) return;
      lastInteraction.current = 'mouse';
      setFocusIndex(index);
    };

    return { handleMouseOver };
}
