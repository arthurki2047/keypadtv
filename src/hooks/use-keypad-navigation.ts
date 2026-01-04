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

            const searchInput = document.getElementById('search-input') as HTMLInputElement | null;
            const searchButton = document.getElementById('search-button') as HTMLButtonElement | null;
            
            if (document.activeElement === searchInput) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    handleSearchSubmit();
                } else if (e.key === 'ArrowDown') {
                     e.preventDefault();
                     setFocusIndex(0);
                }
                return; 
            }
            
            if (e.target instanceof HTMLInputElement && e.key !== 'Enter' && !['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
                return;
            }
            
            if (e.target instanceof HTMLInputElement && ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
                (e.target as HTMLElement).blur();
            }


            let newIndex = focusIndex;
            switch (e.key) {
                case 'ArrowUp':
                    e.preventDefault();
                    if (focusIndex < columns) { 
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
                        newIndex = 0;
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
                        handleSearchSubmit();
                    } else if (focusIndex === SEARCH_BUTTON_INDEX && searchButton) {
                        handleSearchSubmit();
                    }
                    return;
                default:
                    // For any other key, if the search input is not focused, focus it and start typing.
                    if (searchInput && document.activeElement !== searchInput && e.key.length === 1) {
                        searchInput.focus();
                    }
                    return;
            }

            if (newIndex >= -2 && newIndex < itemCount) {
                setFocusIndex(newIndex);
            }
        };

        const handleSearchSubmit = () => {
            const searchInput = document.getElementById('search-input') as HTMLInputElement | null;
            const searchButton = document.getElementById('search-button') as HTMLButtonElement | null;
            if (searchButton && searchInput && searchInput.value.trim()) {
                searchButton.click();
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
        
        if (focusIndex === SEARCH_INPUT_INDEX) {
            searchInput?.focus();
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
