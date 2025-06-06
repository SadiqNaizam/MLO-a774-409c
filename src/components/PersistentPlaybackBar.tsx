import React, { useState, useEffect } from 'react';
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Maximize2, ListMusic } from 'lucide-react';

interface CurrentTrack {
  id: string;
  title: string;
  artist: string;
  albumArtUrl: string;
  duration: number; // in seconds
}

interface PersistentPlaybackBarProps {
  currentTrack: CurrentTrack | null;
  isPlaying: boolean;
  progress: number; // 0-100
  volume: number; // 0-100
  onPlayPauseToggle: () => void;
  onSkipNext: () => void;
  onSkipPrevious: () => void;
  onSeek: (value: number) => void; // value 0-100
  onVolumeChange: (value: number) => void;
  onToggleQueue?: () => void; // Optional: to show/hide a track queue
  onToggleFullScreen?: () => void; // Optional: for a full-screen player view
}

const PersistentPlaybackBar: React.FC<PersistentPlaybackBarProps> = ({
  currentTrack,
  isPlaying,
  progress,
  volume,
  onPlayPauseToggle,
  onSkipNext,
  onSkipPrevious,
  onSeek,
  onVolumeChange,
  onToggleQueue,
  onToggleFullScreen,
}) => {
  const [isMuted, setIsMuted] = useState(false);
  const [previousVolume, setPreviousVolume] = useState(volume);

  useEffect(() => {
    console.log("PersistentPlaybackBar updated. Track:", currentTrack?.title, "Playing:", isPlaying, "Progress:", progress);
  }, [currentTrack, isPlaying, progress]);

  if (!currentTrack) {
    // Optionally render a placeholder or nothing if no track is active
    // For now, let's render a minimal bar if there's no track to show it exists.
    // return null;
    return (
        <div className="fixed bottom-0 left-0 right-0 h-20 bg-neutral-800 border-t border-neutral-700 text-white flex items-center justify-center px-4 z-50">
            <p className="text-sm text-neutral-400">No music playing.</p>
        </div>
    );
  }

  const formatTime = (seconds: number): string => {
    const roundedSeconds = Math.floor(seconds);
    const min = Math.floor(roundedSeconds / 60);
    const sec = roundedSeconds % 60;
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  };

  const currentTime = (progress / 100) * currentTrack.duration;

  const handleVolumeToggleMute = () => {
    if (isMuted) {
      onVolumeChange(previousVolume);
      setIsMuted(false);
    } else {
      setPreviousVolume(volume);
      onVolumeChange(0);
      setIsMuted(true);
    }
  };

  const handleVolumeSliderChange = (value: number[]) => {
    onVolumeChange(value[0]);
    if (value[0] > 0 && isMuted) {
        setIsMuted(false);
    } else if (value[0] === 0 && !isMuted) {
        setIsMuted(true);
        setPreviousVolume(volume > 0 ? volume : 50); // Store last non-zero volume
    }
  };


  return (
    <div className="fixed bottom-0 left-0 right-0 h-[90px] bg-neutral-900 border-t border-neutral-700 text-white flex items-center px-4 z-50">
      {/* Left: Track Info */}
      <div className="flex items-center gap-3 w-1/4 min-w-[200px]">
        <div className="w-14 h-14 rounded overflow-hidden bg-neutral-700">
          <AspectRatio ratio={1/1}>
            <img
              src={currentTrack.albumArtUrl || '/placeholder.svg'}
              alt={currentTrack.title}
              className="w-full h-full object-cover"
              onError={(e) => (e.currentTarget.src = '/placeholder.svg')}
            />
          </AspectRatio>
        </div>
        <div>
          <p className="text-sm font-medium truncate" title={currentTrack.title}>{currentTrack.title}</p>
          <p className="text-xs text-neutral-400 truncate" title={currentTrack.artist}>{currentTrack.artist}</p>
        </div>
      </div>

      {/* Center: Playback Controls & Progress */}
      <div className="flex-grow flex flex-col items-center justify-center mx-4 w-1/2">
        <div className="flex items-center gap-2 mb-1">
          <Button variant="ghost" size="icon" onClick={onSkipPrevious} aria-label="Previous track">
            <SkipBack className="h-5 w-5 fill-white" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onPlayPauseToggle}
            className="bg-white text-black hover:bg-neutral-200 rounded-full h-9 w-9"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause className="h-5 w-5 fill-black" /> : <Play className="h-5 w-5 fill-black" />}
          </Button>
          <Button variant="ghost" size="icon" onClick={onSkipNext} aria-label="Next track">
            <SkipForward className="h-5 w-5 fill-white" />
          </Button>
        </div>
        <div className="flex items-center w-full max-w-xl gap-2">
          <span className="text-xs text-neutral-400 w-10 text-right">{formatTime(currentTime)}</span>
          <Slider
            defaultValue={[progress]}
            value={[progress]}
            max={100}
            step={1}
            onValueChange={(value) => onSeek(value[0])}
            className="flex-grow"
            aria-label="Song progress"
          />
          <span className="text-xs text-neutral-400 w-10 text-left">{formatTime(currentTrack.duration)}</span>
        </div>
      </div>

      {/* Right: Volume & Other Controls */}
      <div className="flex items-center gap-2 w-1/4 min-w-[150px] justify-end">
        {onToggleQueue && (
            <Button variant="ghost" size="icon" onClick={onToggleQueue} aria-label="Toggle queue">
                <ListMusic className="h-5 w-5" />
            </Button>
        )}
        <Button variant="ghost" size="icon" onClick={handleVolumeToggleMute} aria-label={isMuted ? "Unmute" : "Mute"}>
          {volume === 0 || isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
        </Button>
        <Slider
          defaultValue={[volume]}
          value={[volume]}
          max={100}
          step={1}
          onValueChange={handleVolumeSliderChange}
          className="w-24"
          aria-label="Volume"
        />
        {onToggleFullScreen && (
            <Button variant="ghost" size="icon" onClick={onToggleFullScreen} aria-label="Toggle full screen player">
                <Maximize2 className="h-5 w-5" />
            </Button>
        )}
      </div>
    </div>
  );
};

export default PersistentPlaybackBar;