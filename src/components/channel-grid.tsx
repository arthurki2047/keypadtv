"use client";

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Channel } from '@/lib/channels';
import { useKeypadNavigation } from '@/hooks/use-keypad-navigation';
import { ChannelCard } from './channel-card';

type ChannelGridProps = {
  channels: Channel[];
  isSearchResults?: boolean;
};

export function ChannelGrid({ channels, isSearchResults = false }: ChannelGridProps) {
  const [focusIndex, setFocusIndex] = useState(isSearchResults ? 0 : -1);
  const router = useRouter();
  const gridRef = useRef<HTMLDivElement>(null);
  const [columns, setColumns] = useState(4);

  useEffect(() => {
    const updateColumns = () => {
        if (window.innerWidth < 640) setColumns(2);
        else if (window.innerWidth < 768) setColumns(3);
        else if (window.innerWidth < 1024) setColumns(4);
        else if (window.innerWidth < 1280) setColumns(5);
        else setColumns(6);
    };

    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  const onEnter = (index: number) => {
    if (index >= 0 && index < channels.length) {
      const channelId = channels[index].id;
      router.push(`/channel/${channelId}`);
    }
  };

  const { handleMouseOver } = useKeypadNavigation({
    gridRef,
    itemCount: channels.length,
    columns: columns,
    onEnter,
    focusIndex,
    setFocusIndex,
    disable: false // Always enable keypad nav
  });

  return (
    <>
      {channels.length > 0 ? (
        <div
          ref={gridRef}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6"
          role="grid"
        >
          {channels.map((channel, index) => (
            <ChannelCard
              key={channel.id}
              channel={channel}
              isFocused={index === focusIndex}
              onMouseOver={() => handleMouseOver(index)}
            />
          ))}
        </div>
      ) : (
        isSearchResults && <div className="flex flex-col items-center justify-center h-[50vh] text-center">
          <p className="text-2xl font-semibold text-muted-foreground">No channels found.</p>
          <p className="text-lg text-muted-foreground">Try a different search term.</p>
        </div>
      )}
    </>
  );
}
