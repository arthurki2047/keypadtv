
"use client";

import { useEffect, useRef } from 'react';
import type { Channel } from '@/lib/channels';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Maximize, Tv } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type VideoPlayerProps = {
  channel: Channel;
};

export function VideoPlayer({ channel }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();
  
  // Dynamically import hls.js only on the client-side
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hls: any;

    async function initializePlayer() {
      const Hls = (await import('hls.js')).default;
      const streamUrl = channel.streamUrl;

      if (Hls.isSupported()) {
        hls = new Hls({
            // More robust error handling
            maxBufferLength: 30,
            maxMaxBufferLength: 600,
            startLevel: -1, 
            autoStartLoad: true,
        });
        hls.loadSource(streamUrl);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          video.play().catch(error => console.error("Autoplay was prevented:", error));
        });
        hls.on(Hls.Events.ERROR, function (event, data) {
            if (data.fatal) {
              switch(data.type) {
                case Hls.ErrorTypes.NETWORK_ERROR:
                  console.warn('Fatal network error encountered, trying to recover', data);
                  toast({
                    variant: "destructive",
                    title: "Network Issue",
                    description: "The stream is unstable. Attempting to reconnect...",
                  });
                  hls.startLoad();
                  break;
                case Hls.ErrorTypes.MEDIA_ERROR:
                  console.warn('Fatal media error encountered, trying to recover', data);
                   toast({
                    variant: "destructive",
                    title: "Playback Error",
                    description: "A media error occurred. Attempting to recover the stream...",
                  });
                  hls.recoverMediaError();
                  break;
                default:
                  // cannot recover
                  console.error('Fatal HLS.js error, cannot recover', data);
                   toast({
                    variant: "destructive",
                    title: "Stream Unavailable",
                    description: "This channel could not be loaded. Please try again later.",
                  });
                  hls.destroy();
                  break;
              }
            } else {
                console.warn('Non-fatal HLS.js error:', data);
            }
        });
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = streamUrl;
        video.addEventListener('loadedmetadata', () => {
          video.play().catch(error => console.error("Autoplay was prevented:", error));
        });
      }
    }

    initializePlayer();

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, [channel.streamUrl, toast]);

  const handleFullScreen = () => {
    if (videoRef.current) {
        if (videoRef.current.requestFullscreen) {
            videoRef.current.requestFullscreen();
        } else if ((videoRef.current as any).webkitRequestFullscreen) { /* Safari */
            (videoRef.current as any).webkitRequestFullscreen();
        }
    }
  }

  return (
    <div className="flex flex-col h-screen bg-black">
      <header className="flex items-center justify-between p-2 bg-primary text-primary-foreground shadow-lg z-10 shrink-0">
        <Button asChild variant="ghost" className="text-lg hover:bg-primary-foreground/10 focus:ring-accent focus:ring-2">
          <Link href="/">
            <ArrowLeft className="mr-2 h-6 w-6" />
            Back
          </Link>
        </Button>
        <div className="flex items-center gap-2 text-center min-w-0">
            <Tv className="h-6 w-6 shrink-0" />
            <h1 className="text-xl font-bold truncate">{channel.name}</h1>
        </div>
        <Button variant="ghost" onClick={handleFullScreen} className="text-lg hover:bg-primary-foreground/10 focus:ring-accent focus:ring-2">
            <Maximize className="mr-2 h-6 w-6" />
            Full
        </Button>
      </header>

      <main className="flex-1 flex items-center justify-center bg-black p-1 min-h-0">
          <video ref={videoRef} controls autoPlay playsInline crossOrigin="anonymous" className="w-full h-full max-w-full max-h-full" />
      </main>
    </div>
  );
}
