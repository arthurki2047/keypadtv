import { channels } from '@/lib/channels';
import { ChannelGrid } from '@/components/channel-grid';

export default function Home() {
  // In a real app, this data would likely be fetched from an API
  const allChannels = channels;

  return <ChannelGrid allChannels={allChannels} />;
}
