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
  const [submittedSearchTerm, setSubmittedSearchTerm] = useState('');

  const [focusIndex, setFocusIndex] = useState(0);
  const router = useRouter();
  const gridRef = useRef<HTMLDivElement>(null);

  const [columns, setColumns] = useState(4);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // This code now runs only on the client
    setIsStandalone(!document.querySelector('section'));
  }, []);

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
    if (!isStandalone) return allChannels;
    const termToFilter = submittedSearchTerm || searchTerm;
    return filterChannels(allChannels, termToFilter);
  }, [allChannels, searchTerm, submittedSearchTerm, isStandalone]);
  
  useEffect(() => {
    setFocusIndex(0);
  }, [searchTerm, submittedSearchTerm]);

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
    disable: !isStandalone
  });

  const handleSearchSubmit = () => {
    setSubmittedSearchTerm(searchTerm);
    // Move focus to the first item in the grid
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
      searchInput.blur();
    }
    setFocusIndex(0);
  };
  
  const content = (
    <>
      {isStandalone && <Header 
        searchTerm={searchTerm} 
        onSearchChange={(v) => {
          setSearchTerm(v);
          if (submittedSearchTerm) {
            setSubmittedSearchTerm('');
          }
        }}
        onSearchSubmit={handleSearchSubmit}
      />}
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
                isFocused={isStandalone && index === focusIndex}
                onMouseOver={() => handleMouseOver(index)}
              />
            ))}
          </div>
        ) : (
          isStandalone && <div className="flex flex-col items-center justify-center h-[50vh] text-center">
            <p className="text-2xl font-semibold text-muted-foreground">No channels found.</p>
            <p className="text-lg text-muted-foreground">Try a different search term.</p>
          </div>
        )}
      </main>
    </>
  );

  if (isStandalone) {
    return (
      <div className="min-h-screen flex flex-col">
        {content}
      </div>
    )
  }
  
  return content;
}
