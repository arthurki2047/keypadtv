"use client";

import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { ChannelGrid } from '@/components/channel-grid';
import { channels, filterChannels } from '@/lib/channels';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  const filtered = useMemo(() => filterChannels(channels, query), [query]);

  return (
    <div>
        <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">
            Search Results for "{query}"
        </h2>
        <ChannelGrid channels={filtered} isSearchResults={true} />
    </div>
  );
}