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

            // Don't interfere if user is in a menu, dialog, or selecting from a dropdown
            const activeElement = document.activeElement;
            if (activeElement?.closest('[role="menu"], [role="listbox"], [role="dialog"], [data-radix-popper-content-wrapper]')) {
                return;
            }

            const searchInput = document.getElementById('search-input') as HTMLInputElement | null;
            const categoriesButton = document.getElementById('categories-button') as HTMLButtonElement | null;
            
            // Navigation keys logic
            let newIndex = focusIndex;
            switch (e.key) {
                case 'ArrowUp':
                    if (focusIndex < columns && focusIndex >= 0) { 
                        e.preventDefault();
                        // From the first row, go up to Categories button if it exists
                        newIndex = categoriesButton ? CATEGORIES_BUTTON_INDEX : SEARCH_INPUT_INDEX;
                    } else if (focusIndex >= columns) {
                        e.preventDefault();
                        newIndex = focusIndex - columns;
                    }
                    break;
                case 'ArrowDown':
                    if (focusIndex === SEARCH_INPUT_INDEX || focusIndex === CATEGORIES_BUTTON_INDEX) {
                        e.preventDefault();
                        newIndex = 0;
                    } else if (focusIndex + columns < itemCount) {
                        e.preventDefault();
                        newIndex = focusIndex + columns;
                    }
                    break;
                case 'ArrowLeft':
                    if (focusIndex >= 0 && focusIndex % columns !== 0) {
                        e.preventDefault();
                        newIndex = focusIndex - 1;
                    } else if (focusIndex === CATEGORIES_BUTTON_INDEX) {
                        e.preventDefault();
                        newIndex = SEARCH_INPUT_INDEX;
                    }
                    break;
                case 'ArrowRight':
                    if (focusIndex >= 0 && (focusIndex + 1) % columns !== 0 && focusIndex + 1 < itemCount) {
                        e.preventDefault();
                        newIndex = focusIndex + 1;
                    } else if (focusIndex === SEARCH_INPUT_INDEX && categoriesButton) {
                        e.preventDefault();
                        newIndex = CATEGORIES_BUTTON_INDEX;
                    }
                    break;
                case 'Enter':
                    if (focusIndex >= 0) {
                        e.preventDefault();
                        onEnter(focusIndex);
                    } else if (focusIndex === CATEGORIES_BUTTON_INDEX) {
                        // Dropdown handles its own keyboard enter if focused, 
                        // but we can trigger it for reliability
                        categoriesButton?.click();
                    }
                    break;
                default:
                    // Autofocus search on typing if not focused on another interactive element
                    if (searchInput && document.activeElement !== searchInput && 
                        e.key.length === 1 && !e.ctrlKey && !e.metaKey && 
                        !(activeElement instanceof HTMLButtonElement) &&
                        !(activeElement instanceof HTMLAnchorElement)) {
                        searchInput.focus();
                        setFocusIndex(SEARCH_INPUT_INDEX);
                    }
                    return;
            }

            if (newIndex !== focusIndex && newIndex >= -2 && newIndex < itemCount) {
                setFocusIndex(newIndex);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [focusIndex, setFocusIndex, itemCount, columns, onEnter, disable]);

    useEffect(() => {
        if (disable || lastInteraction.current === 'mouse') return;

        const searchInput = document.getElementById('search-input') as HTMLInputElement | null;
        const categoriesButton = document.getElementById('categories-button') as HTMLButtonElement | null;
        
        let elementToFocus: HTMLElement | null = null;

        if (focusIndex === SEARCH_INPUT_INDEX) {
            elementToFocus = searchInput;
        } else if (focusIndex === CATEGORIES_BUTTON_INDEX) {
            elementToFocus = categoriesButton;
        } else if (focusIndex >= 0) {
            const grid = gridRef.current;
            if (grid) {
                const itemContainer = grid.querySelector(`[data-focus-index="${focusIndex}"]`) as HTMLElement;
                if (itemContainer) {
                    elementToFocus = itemContainer.querySelector('a, button, input, [tabindex]:not([tabindex="-1"])') as HTMLElement;
                }
            }
        }

        if (elementToFocus) {
            elementToFocus.focus();
            // Use 'auto' behavior for snappier response on low-end keypad devices
            // 'center' ensures the item is clearly visible and not cut off by headers
            elementToFocus.scrollIntoView({ 
                behavior: 'auto', 
                block: 'center', 
                inline: 'nearest' 
            });
        }
    }, [focusIndex, gridRef, itemCount, disable]);

    const handleMouseOver = (index: number) => {
      if (disable) return;
      lastInteraction.current = 'mouse';
      setFocusIndex(index);
    };

    return { handleMouseOver };
}
