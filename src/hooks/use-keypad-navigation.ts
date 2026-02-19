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
const CATEGORIES_BUTTON_INDEX = -2;

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
            const categoriesButton = document.getElementById('categories-button') as HTMLButtonElement | null;
            const activeElement = document.activeElement;
            
            // Special handling when an element outside the grid is focused
            if (activeElement === searchInput) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    handleSearchSubmit();
                } else if (e.key === 'ArrowDown') {
                     e.preventDefault();
                     setFocusIndex(0);
                } else if (e.key === 'ArrowRight' && categoriesButton) {
                     e.preventDefault();
                     setFocusIndex(CATEGORIES_BUTTON_INDEX);
                } else if (e.key.length === 1 || e.key === 'Backspace' || e.key === 'Delete') {
                    return; // Allow typing
                }
            } else if (activeElement === categoriesButton) {
                if(e.key === 'ArrowLeft' && searchInput) {
                    e.preventDefault();
                    setFocusIndex(SEARCH_INPUT_INDEX);
                } else if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    setFocusIndex(0);
                }
                // Let dropdown handle its own open/close on Enter/Space
                return;
            }
            
            if (e.target instanceof HTMLInputElement && e.key !== 'Enter' && !['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
                return;
            }
            
            // Blur currently focused element if it's one of our keypad managed elements
            if ((activeElement === searchInput || activeElement === categoriesButton) && ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
                (activeElement as HTMLElement).blur();
            }


            let newIndex = focusIndex;
            switch (e.key) {
                case 'ArrowUp':
                    e.preventDefault();
                    if (focusIndex < columns && focusIndex >= 0) { 
                        newIndex = SEARCH_INPUT_INDEX;
                    } else if (focusIndex >= columns) {
                        newIndex = focusIndex - columns;
                    }
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    if (focusIndex === SEARCH_INPUT_INDEX || focusIndex === CATEGORIES_BUTTON_INDEX) {
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
                    } else if (focusIndex === SEARCH_INPUT_INDEX) {
                        handleSearchSubmit();
                    } else if (focusIndex === CATEGORIES_BUTTON_INDEX && categoriesButton) {
                        categoriesButton.click();
                    }
                    return;
                default:
                    // For any other key, if the search input is not focused, focus it and start typing.
                    if (searchInput && document.activeElement !== searchInput && e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
                        searchInput.focus();
                    }
                    return;
            }

            if (newIndex >= -2 && newIndex < itemCount) {
                setFocusIndex(newIndex);
            }
        };

        const handleSearchSubmit = () => {
            const searchButton = document.getElementById('search-button') as HTMLButtonElement | null;
            if (searchButton) {
                searchButton.form?.requestSubmit();
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
        const categoriesButton = document.getElementById('categories-button') as HTMLButtonElement | null;
        
        if (focusIndex === SEARCH_INPUT_INDEX) {
            searchInput?.focus();
            return;
        }

        if (focusIndex === CATEGORIES_BUTTON_INDEX) {
            categoriesButton?.focus();
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
                focusableElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
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
