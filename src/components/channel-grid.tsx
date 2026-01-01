"use client";

import { useState, useMemo, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { type Channel, filterChannels } from '@/lib/channels';
import { useKeypadNavigation } from '@/hooks/use-keypad-navigation';
import { ChannelCard } from './channel-card';
import { Header } from './header';

type ChannelGridProps = {
  allChannels: Channel[];
};

export function ChannelGrid({ allChannels }: ChannelGridProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [focusIndex, setFocusIndex] = useState(0);
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

  const filteredChannels = useMemo(() => {
    return filterChannels(allChannels, searchTerm);
  }, [allChannels, searchTerm]);
  
  useEffect(() => {
    setFocusIndex(0);
  }, [searchTerm]);

  const onEnter = (index: number) => {
    if (index >= 0 && index < filteredChannels.length) {
      const channelId = filteredChannels[index].id;
      router.push(`/channel/${channelId}`);
    }
  };

  const { handleMouseOver } = useKeypadNavigation({
    gridRef,
    itemCount: filteredChannels.length,
    columns: columns,
    onEnter,
    focusIndex,
    setFocusIndex,
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <main className="flex-grow container mx-auto p-4 md:p-8">
        {filteredChannels.length > 0 ? (
          <div
            ref={gridRef}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6"
            role="grid"
          >
            {filteredChannels.map((channel, index) => (
              <ChannelCard 
                key={channel.id} 
                channel={channel} 
                isFocused={index === focusIndex}
                onMouseOver={() => handleMouseOver(index)}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-[50vh] text-center">
            <p className="text-2xl font-semibold text-muted-foreground">No channels found.</p>
            <p className="text-lg text-muted-foreground">Try a different search term.</p>
          </div>
        )}
      </main>
      <div className="fixed bottom-4 left-4 z-50">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-black text-white text-xs font-bold">
          N
        </div>
      </div>
    </div>
  );
}
