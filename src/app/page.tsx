import { ChannelGrid, type ChannelSection } from '@/components/channel-grid';
import { channels } from '@/lib/channels';

export default async function Home() {
  const allChannels = [...channels].sort((a, b) => a.name.localeCompare(b.name));

  const sections: ChannelSection[] = [
    {
      title: 'All',
      channels: allChannels,
    },
  ];

  return (
    <div className="flex flex-col gap-10">
      <ChannelGrid sections={sections} />
    </div>
  );
}
