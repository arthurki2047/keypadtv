import Image from 'next/image';
import Link from 'next/link';
import type { Channel } from '@/lib/channels';
import { Card, CardContent } from '@/components/ui/card';
import { PlayCircle } from 'lucide-react';

type ChannelCardProps = {
  channel: Channel;
  isFocused: boolean;
  onMouseOver: () => void;
};

export function ChannelCard({ channel, isFocused, onMouseOver }: ChannelCardProps) {
  return (
    <div onMouseOver={onMouseOver}>
      <Link href={`/channel/${channel.id}`} className="block group rounded-lg focus:outline-none focus:ring-4 focus:ring-accent" aria-label={`Watch ${channel.name}`}>
        <Card className={`transition-all duration-200 ease-in-out border-4 ${isFocused ? 'transform scale-105 shadow-2xl bg-card border-primary' : 'shadow-lg border-transparent'} hover:transform hover:scale-105 hover:shadow-2xl overflow-hidden`}>
          <CardContent className="relative aspect-square flex flex-col items-center justify-center p-4 bg-card">
            <Image
              src={channel.logo}
              alt={`${channel.name} logo`}
              width={150}
              height={150}
              className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
              data-ai-hint={channel.logoHint}
            />
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity">
              <PlayCircle className="h-16 w-16 text-accent" />
            </div>
          </CardContent>
        </Card>
        <p className={`mt-2 text-center text-lg font-bold text-foreground truncate transition-colors ${isFocused ? 'text-primary' : ''}`}>
          {channel.name}
        </p>
      </Link>
    </div>
  );
}
