"use client";

import { useState, useEffect, useRef, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Channel } from '@/lib/channels';
import { useKeypadNavigation } from '@/hooks/use-keypad-navigation';
import { ChannelCard } from './channel-card';
import { CategoriesDropdown } from './categories-dropdown';

export type ChannelSection = {
  title: string;
  channels: Channel[];
};

type ChannelGridProps = {
  sections?: ChannelSection[];
  channels?: Channel[]; // Legacy support or single list
  isSearchResults?: boolean;
};

export function ChannelGrid({ sections: propsSections, channels: propsChannels, isSearchResults = false }: ChannelGridProps) {
  const [focusIndex, setFocusIndex] = useState(isSearchResults ? 0 : -1);
  const router = useRouter();
  const gridRef = useRef<HTMLDivElement>(null);
  const [columns, setColumns] = useState(4);

  // Normalize data into sections for unified handling
  const sections = useMemo(() => {
    if (propsSections) return propsSections;
    if (propsChannels) return [{ title: '', channels: propsChannels }];
    return [];
  }, [propsSections, propsChannels]);

  // Flatten channels for keypad navigation logic
  const flattenedChannels = useMemo(() => sections.flatMap(s => s.channels), [sections]);

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
    if (index >= 0 && index < flattenedChannels.length) {
      const channelId = flattenedChannels[index].id;
      router.push(`/channel/${channelId}`);
    }
  };

  const { handleMouseOver } = useKeypadNavigation({
    gridRef,
    itemCount: flattenedChannels.length,
    columns: columns,
    onEnter,
    focusIndex,
    setFocusIndex,
    disable: false
  });

  if (flattenedChannels.length === 0) {
    return isSearchResults ? (
      <div className="flex flex-col items-center justify-center h-[50vh] text-center p-8 bg-white/50 rounded-3xl border-2 border-dashed border-muted">
        <p className="text-2xl font-semibold text-muted-foreground">No channels found.</p>
        <p className="text-lg text-muted-foreground">Try a different search term.</p>
      </div>
    ) : null;
  }

  let globalCounter = 0;

  return (
    <div ref={gridRef} className="flex flex-col gap-10">
      {sections.map((section) => (
        <section key={section.title || 'default'} className="scroll-mt-24">
          <div className="flex items-center justify-between gap-4 mb-6 pb-2 border-b-2 border-primary/10">
            <div className="flex items-center gap-3">
              <div className="w-2 h-8 bg-accent rounded-full"></div>
              <h2 className="text-2xl md:text-3xl font-black text-primary uppercase tracking-tight">
                {section.title}
              </h2>
            </div>
            {section.title === 'All' && <CategoriesDropdown />}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-8">
            {section.channels.map((channel) => {
              const currentIndex = globalCounter++;
              return (
                <div key={`${section.title}-${channel.id}`} data-focus-index={currentIndex}>
                  <ChannelCard
                    channel={channel}
                    isFocused={currentIndex === focusIndex}
                    onMouseOver={() => handleMouseOver(currentIndex)}
                  />
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
