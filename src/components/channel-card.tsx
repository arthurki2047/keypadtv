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
        আকাশ ৮
        <p className={`mt-2 text-center text-lg font-bold text-foreground truncate transition-colors ${isFocused ? 'text-primary' : ''}`}>
          {channel.name}
        </p>
      </Link>
    </div>
  );
}
