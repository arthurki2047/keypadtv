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
};

export function useKeypadNavigation({
  gridRef,
  itemCount,
  columns,
  onEnter,
  focusIndex,
  setFocusIndex,
  loop = true,
}: UseKeypadNavigationProps) {
    const lastInteraction = useRef<'key' | 'mouse'>('mouse');

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!gridRef.current || itemCount === 0) return;
            
            if (e.target instanceof HTMLInputElement) {
                if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Enter'].includes(e.key)) {
                    (e.target as HTMLElement).blur();
                } else {
                    return;
                }
            }
            
            lastInteraction.current = 'key';
            let newIndex = focusIndex;

            switch (e.key) {
                case 'ArrowUp':
                    e.preventDefault();
                    newIndex = focusIndex - columns;
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    newIndex = focusIndex + columns;
                    break;
                case 'ArrowLeft':
                    e.preventDefault();
                    if (focusIndex % columns !== 0) {
                        newIndex = focusIndex - 1;
                    }
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    if ((focusIndex + 1) % columns !== 0 && focusIndex + 1 < itemCount) {
                        newIndex = focusIndex + 1;
                    }
                    break;
                case 'Enter':
                    e.preventDefault();
                    onEnter(focusIndex);
                    return;
                default:
                    return;
            }

            if (newIndex >= 0 && newIndex < itemCount) {
                setFocusIndex(newIndex);
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [focusIndex, setFocusIndex, itemCount, columns, onEnter, gridRef, loop]);

    useEffect(() => {
        if (lastInteraction.current === 'mouse' || focusIndex < 0) return;
        const grid = gridRef.current;
        if (!grid) return;
        
        const itemContainer = grid.children[focusIndex] as HTMLElement;
        if (itemContainer) {
            const focusableElement = itemContainer.querySelector('a, button, input, [tabindex]:not([tabindex="-1"])') as HTMLElement;
            if(focusableElement) {
                focusableElement.focus();
            }
        }
    }, [focusIndex, gridRef, itemCount]); // Rerun on itemCount change to focus first item of new list

    const handleMouseOver = (index: number) => {
      lastInteraction.current = 'mouse';
      setFocusIndex(index);
    };

    return { handleMouseOver };
}
