"use client";

import { useState, useEffect, useRef } from 'react';
import { channels } from '@/lib/channels';
import type { Channel } from '@/lib/channels';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Maximize, Tv, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type VideoPlayerProps = {
  channel: Channel;
};

export function VideoPlayer({ channel }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();
  const router = useRouter();
  const [isPlaying, setIsPlaying] = useState(true);

  const currentIndex = channels.findIndex(c => c.id === channel.id);

  const handlePrevChannel = () => {
    const prevIndex = (currentIndex - 1 + channels.length) % channels.length;
    router.push(`/channel/${channels[prevIndex].id}`);
  };

  const handleNextChannel = () => {
    const nextIndex = (currentIndex + 1) % channels.length;
    router.push(`/channel/${channels[nextIndex].id}`);
  };

  const handlePlayPause = () => {
    const video = videoRef.current;
    if (video) {
        if (video.paused) {
            video.play();
        } else {
            video.pause();
        }
    }
  };

  // Handle all keypad events and video state listeners in one place
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      // Don't interfere if user is typing in an input
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
        return;
      }

      switch (event.key) {
        case 'Backspace':
        case 'Escape':
          event.preventDefault();
          router.back();
          break;
        
        case 'ArrowLeft':
        case '3':
          event.preventDefault();
          handlePrevChannel();
          break;

        case 'ArrowRight':
        case '6':
          event.preventDefault();
          handleNextChannel();
          break;
        
        case '5':
        case ' ': // Space bar for play/pause
          event.preventDefault();
          handlePlayPause();
          break;
      }
    };

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    window.addEventListener('keydown', handleKeyDown);
    video.addEventListener('play', onPlay);
    video.addEventListener('pause', onPause);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      video.removeEventListener('play', onPlay);
      video.removeEventListener('pause', onPause);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, currentIndex]);
  
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
            maxBufferLength: 30,
            maxMaxBufferLength: 600,
            startLevel: -1, 
            autoStartLoad: true,
        });
        hls.loadSource(streamUrl);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          video.play().catch(error => {
            console.error("Autoplay was prevented:", error);
            setIsPlaying(false);
          });
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
          video.play().catch(error => {
            console.error("Autoplay was prevented:", error)
            setIsPlaying(false);
          });
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
        <Button variant="ghost" onClick={() => router.back()} className="text-lg hover:bg-primary-foreground/10 focus:ring-accent focus:ring-2">
          <ArrowLeft className="mr-2 h-6 w-6" />
          Back
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

      <main className="flex-1 flex items-center justify-center bg-black p-1 min-h-0 relative group">
          <video 
            ref={videoRef}
            onClick={handlePlayPause}
            autoPlay 
            playsInline 
            crossOrigin="anonymous" 
            className="w-full h-full max-w-full max-h-full" 
          />
          {/* Custom controls overlay */}
          <div className="absolute inset-0 flex items-center justify-between px-4 sm:px-8 transition-opacity opacity-0 group-hover:opacity-100 focus-within:opacity-100 bg-black/20">
            <Button aria-label="Previous Channel" variant="ghost" size="icon" onClick={handlePrevChannel} className="h-16 w-16 text-white rounded-full hover:bg-white/20 focus:bg-white/20 focus:ring-2 focus:ring-accent">
              <ChevronLeft className="h-12 w-12" />
            </Button>
            <Button aria-label={isPlaying ? "Pause" : "Play"} variant="ghost" size="icon" onClick={handlePlayPause} className="h-20 w-20 text-white rounded-full hover:bg-white/20 focus:bg-white/20 focus:ring-2 focus:ring-accent">
              {isPlaying ? <Pause className="h-16 w-16" /> : <Play className="h-16 w-16" />}
            </Button>
            <Button aria-label="Next Channel" variant="ghost" size="icon" onClick={handleNextChannel} className="h-16 w-16 text-white rounded-full hover:bg-white/20 focus:bg-white/20 focus:ring-2 focus:ring-accent">
              <ChevronRight className="h-12 w-12" />
            </Button>
          </div>
      </main>
    </div>
  );
}
