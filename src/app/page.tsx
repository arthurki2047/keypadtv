import { ChannelGrid, type ChannelSection } from '@/components/channel-grid';
import { channels, getSortedCategories } from '@/lib/channels';

type Props = {
  searchParams: Promise<{ cat?: string }>;
};

export default async function Home({ searchParams }: Props) {
  const params = await searchParams;
  const selectedCatSlug = typeof params.cat === 'string' ? params.cat.toLowerCase() : undefined;
  
  const allChannels = [...channels].sort((a, b) => a.name.localeCompare(b.name));
  const sortedCategories = getSortedCategories();

  const sections: ChannelSection[] = [
    {
      title: 'All',
      channels: allChannels,
    },
  ];

  // If a category is selected via URL, show it below "All"
  if (selectedCatSlug) {
    const categoryEntry = sortedCategories.find(([name]) => name.toLowerCase() === selectedCatSlug);
    if (categoryEntry) {
      sections.push({
        title: categoryEntry[0],
        channels: categoryEntry[1].sort((a, b) => a.name.localeCompare(b.name)),
      });
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <ChannelGrid sections={sections} />
    </div>
  );
}
