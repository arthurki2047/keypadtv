import { channels } from '@/lib/channels';
import { ChannelGrid } from '@/components/channel-grid';

export default function Home() {
  const allChannels = channels;

  const categories = allChannels.reduce((acc, channel) => {
    if (!acc[channel.category]) {
      acc[channel.category] = [];
    }
    acc[channel.category].push(channel);
    return acc;
  }, {} as Record<string, typeof allChannels>);

  const newsChannels = categories['News'] || [];
  const otherChannels = Object.entries(categories)
    .filter(([category]) => category !== 'News')
    .flatMap(([, channels]) => channels);


  return (
    <div className="flex flex-col gap-8">
      {newsChannels.length > 0 && (
        <section>
          <h2 className="container mx-auto px-4 md:px-8 text-2xl md:text-3xl font-bold text-primary mb-4">
            News
          </h2>
          <ChannelGrid allChannels={newsChannels} />
        </section>
      )}

      {otherChannels.length > 0 && (
        <section>
           <h2 className="container mx-auto px-4 md:px-8 text-2xl md:text-3xl font-bold text-primary mb-4">
            All Channels
          </h2>
          <ChannelGrid allChannels={otherChannels} />
        </section>
      )}
    </div>
  );
}
