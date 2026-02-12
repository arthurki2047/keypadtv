"use client";

import { useSearchParams } from 'next/navigation';
import { ChannelGrid } from '@/components/channel-grid';
import { channels, filterChannels } from '@/lib/channels';

export function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  const filteredChannels = filterChannels(channels, query);

  return (
    <div>
        <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">
            Search Results for "{query}"
        </h2>
        <ChannelGrid channels={filteredChannels} isSearchResults={true} />
    </div>
  );
}
