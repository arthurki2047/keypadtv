import { ChannelGrid } from '@/components/channel-grid';
import { channels, getSortedCategories } from '@/lib/channels';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

type CategoryPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { id } = await params;
  const sortedCategories = getSortedCategories();
  const categoryEntry = sortedCategories.find(([name]) => name.toLowerCase() === id.toLowerCase());
  
  if (!categoryEntry) {
    return { title: 'Category Not Found' };
  }

  return {
    title: `${categoryEntry[0]} Channels | Keypad TV`,
    description: `Watch live ${categoryEntry[0].toLowerCase()} channels`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { id } = await params;
  const sortedCategories = getSortedCategories();
  const categoryEntry = sortedCategories.find(([name]) => name.toLowerCase() === id.toLowerCase());

  if (!categoryEntry) {
    notFound();
  }

  const [categoryName, categoryChannels] = categoryEntry;

  return (
    <div className="flex flex-col gap-8">
      <ChannelGrid 
        sections={[{
          title: categoryName,
          channels: categoryChannels.sort((a, b) => a.name.localeCompare(b.name))
        }]} 
      />
    </div>
  );
}

export async function generateStaticParams() {
  const sortedCategories = getSortedCategories();
  return sortedCategories.map(([name]) => ({
    id: name.toLowerCase(),
  }));
}
