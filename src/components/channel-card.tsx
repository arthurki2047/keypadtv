"use client";

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
    <div onMouseOver={onMouseOver} className="w-full">
      <Link 
        href={`/channel/${channel.id}`} 
        className="block group focus:outline-none" 
        aria-label={`Watch ${channel.name}`}
      >
        <Card className={`
          relative transition-all duration-300 ease-out border-4 overflow-hidden
          ${isFocused 
            ? 'border-accent scale-105 shadow-[0_20px_40px_-15px_rgba(163,230,53,0.4)] ring-4 ring-accent/20 z-10' 
            : 'border-white shadow-md hover:shadow-xl hover:scale-102'}
        `}>
          <CardContent className="p-0 aspect-video relative">
            <Image
              src={channel.logo}
              alt={`${channel.name} logo`}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              data-ai-hint={channel.logoHint}
              quality={50}
            />
            {/* Play Overlay */}
            <div className={`
              absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300
              ${isFocused ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
            `}>
              <div className="bg-accent text-accent-foreground p-3 rounded-full shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                <PlayCircle className="h-10 w-10 fill-current" />
              </div>
            </div>
            
            {/* Category Badge on card */}
            <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/60 text-white text-[10px] font-bold rounded uppercase tracking-wider backdrop-blur-sm">
              {channel.category}
            </div>
          </CardContent>
        </Card>
        <p className={`
          mt-3 text-center text-sm md:text-base font-bold truncate px-2 transition-colors duration-200
          ${isFocused ? 'text-primary' : 'text-foreground/80'}
        `}>
          {channel.name}
        </p>
      </Link>
    </div>
  );
}
