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
  const musicChannels = categories['Music'] || [];
  const movieChannels = categories['Movies'] || [];
  const cartoonChannels = categories['Cartoon'] || [];
  const otherChannels = Object.entries(categories)
    .filter(([category]) => !['News', 'Music', 'Movies', 'Cartoon'].includes(category))
    .flatMap(([, channels]) => channels);


  return (
    <div className="flex flex-col gap-8">
      {newsChannels.length > 0 && (
        <section>
          <h2 className="container mx-auto px-4 md:px-8 text-2xl md:text-3xl font-bold text-primary mb-4">
            News
          </h2>
          <ChannelGrid channels={newsChannels} />
        </section>
      )}

      {musicChannels.length > 0 && (
        <section>
          <h2 className="container mx-auto px-4 md:px-8 text-2xl md:text-3xl font-bold text-primary mb-4">
            Music
          </h2>
          <ChannelGrid channels={musicChannels} />
        </section>
      )}

      {movieChannels.length > 0 && (
        <section>
          <h2 className="container mx-auto px-4 md:px-8 text-2xl md:text-3xl font-bold text-primary mb-4">
            Movies
          </h2>
          <ChannelGrid channels={movieChannels} />
        </section>
      )}

      {cartoonChannels.length > 0 && (
        <section>
          <h2 className="container mx-auto px-4 md:px-8 text-2xl md:text-3xl font-bold text-primary mb-4">
            Cartoon
          </h2>
          <ChannelGrid channels={cartoonChannels} />
        </section>
      )}

      {otherChannels.length > 0 && (
        <section>
           <h2 className="container mx-auto px-4 md_px-8 text-2xl md:text-3xl font-bold text-primary mb-4">
            All Channels
          </h2>
          <ChannelGrid channels={otherChannels} />
        </section>
      )}
    </div>
  );
}

    