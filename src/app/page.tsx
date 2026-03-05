import { ChannelGrid, type ChannelSection } from '@/components/channel-grid';
import { channels } from '@/lib/channels';
import { Tv, Sparkles } from 'lucide-react';

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
      {/* Hero Section Graphics */}
      <section className="relative overflow-hidden rounded-3xl hero-gradient p-8 md:p-12 text-primary-foreground shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-accent/20 text-accent px-3 py-1 rounded-full text-sm font-bold mb-4 border border-accent/30">
              <Sparkles className="h-4 w-4" />
              <span>LIVE NOW</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
              Watch Your Favorite <span className="text-accent underline decoration-accent/30 decoration-wavy">Bangla</span> Channels
            </h2>
            <p className="text-lg text-primary-foreground/80 font-medium">
              Stream news, movies, and music directly on your keypad device or smartphone.
            </p>
          </div>
          <div className="shrink-0">
            <div className="relative">
              <div className="absolute inset-0 bg-accent/20 blur-3xl rounded-full"></div>
              <Tv className="h-32 w-32 md:h-48 md:w-48 text-accent relative z-10 drop-shadow-[0_0_25px_rgba(163,230,53,0.5)]" />
            </div>
          </div>
        </div>
        
        {/* Decorative Circles */}
        <div className="absolute top-[-10%] right-[-5%] w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-20%] left-[-5%] w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      </section>

      <ChannelGrid sections={sections} />
    </div>
  );
}
