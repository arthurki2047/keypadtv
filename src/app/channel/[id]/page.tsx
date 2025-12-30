import { channels } from '@/lib/channels';
import { VideoPlayer } from '@/components/video-player';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

type ChannelPageProps = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params }: ChannelPageProps): Promise<Metadata> {
  const channel = channels.find(c => c.id === params.id);
  if (!channel) {
    return {
      title: 'Channel Not Found',
    }
  }
  return {
    title: `Watching: ${channel.name} | Keypad TV`,
    description: `Live stream for ${channel.name}`,
  }
}

export default function ChannelPage({ params }: ChannelPageProps) {
  const channel = channels.find(c => c.id === params.id);

  if (!channel) {
    notFound();
  }

  return (
    <VideoPlayer channel={channel} />
  );
}

export async function generateStaticParams() {
    return channels.map((channel) => ({
      id: channel.id,
    }));
}
