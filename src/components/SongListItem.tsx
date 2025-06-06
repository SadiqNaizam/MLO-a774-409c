import React from 'react';
import { Button } from "@/components/ui/button";
import { Play, PlusCircle, MoreHorizontal, Heart } from 'lucide-react'; // Example icons
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"; // For more options

interface SongListItemProps {
  id: string | number;
  title: string;
  artist: string;
  album?: string;
  duration: string; // e.g., "3:45"
  imageUrl?: string; // Optional album art for the song
  isExplicit?: boolean;
  isPlaying?: boolean; // To show a playing indicator
  isLiked?: boolean;
  onPlayClick: (id: string | number) => void;
  onLikeClick?: (id: string | number) => void;
  onAddToPlaylistClick?: (id: string | number) => void;
  // onMoreOptionsClick?: (id: string | number, event: React.MouseEvent) => void;
}

const SongListItem: React.FC<SongListItemProps> = ({
  id,
  title,
  artist,
  album,
  duration,
  imageUrl,
  isExplicit = false,
  isPlaying = false,
  isLiked = false,
  onPlayClick,
  onLikeClick,
  onAddToPlaylistClick,
}) => {
  console.log(`Rendering SongListItem: ${title} (ID: ${id}), Playing: ${isPlaying}`);

  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log(`Play clicked on SongListItem: ${id}`);
    onPlayClick(id);
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log(`Like clicked on SongListItem: ${id}`);
    onLikeClick?.(id);
  };
  
  const handleAddToPlaylist = (e: React.MouseEvent) => {
    // This is for the dropdown menu item
    e.stopPropagation(); 
    console.log(`Add to playlist action for SongListItem: ${id}`);
    onAddToPlaylistClick?.(id);
  };


  return (
    <div
      className={`flex items-center p-2 pr-4 hover:bg-neutral-700/50 rounded-md group cursor-pointer ${isPlaying ? 'bg-neutral-700/70 text-green-400' : ''}`}
      onClick={handlePlay} // Default action: play song on row click
    >
      {/* Optional: Play button / Track number */}
      <div className="w-8 text-center mr-3">
        <Button
            variant="ghost"
            size="icon"
            onClick={handlePlay}
            className={`h-8 w-8 ${isPlaying ? 'text-green-400' : 'text-neutral-400 group-hover:text-white' }`}
            aria-label={isPlaying ? `Pause ${title}` : `Play ${title}`}
        >
            <Play className={`h-5 w-5 ${isPlaying ? 'fill-green-400' : 'fill-current'}`} />
        </Button>
      </div>

      {imageUrl && (
        <div className="w-10 h-10 rounded overflow-hidden mr-3 flex-shrink-0 bg-neutral-600">
          <img src={imageUrl} alt={album || title} className="w-full h-full object-cover" onError={(e) => e.currentTarget.style.display = 'none'}/>
        </div>
      )}

      {/* Title and Artist */}
      <div className="flex-grow truncate">
        <p className={`text-sm font-medium ${isPlaying ? 'text-green-400' : 'text-white'}`} title={title}>{title}</p>
        <p className="text-xs text-neutral-400 truncate" title={artist}>
          {isExplicit && <span className="inline-flex items-center justify-center w-3 h-3 mr-1 text-[8px] bg-neutral-500 text-neutral-800 font-bold rounded-sm">E</span>}
          {artist}
        </p>
      </div>

      {/* Optional: Album (show on wider screens) */}
      {album && <p className="text-xs text-neutral-400 truncate hidden md:block mx-4 w-1/4" title={album}>{album}</p>}

      {/* Actions & Duration */}
      <div className="flex items-center gap-2 ml-auto text-neutral-400 flex-shrink-0">
        {onLikeClick && (
            <Button variant="ghost" size="icon" onClick={handleLike} className={`h-8 w-8 ${isLiked ? 'text-green-500' : 'opacity-0 group-hover:opacity-100'}`} aria-label={isLiked ? "Unlike" : "Like"}>
                <Heart className={`h-4 w-4 ${isLiked ? 'fill-green-500' : ''}`} />
            </Button>
        )}
        <span className="text-xs w-10 text-right">{duration}</span>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" onClick={(e) => e.stopPropagation()} className="h-8 w-8 opacity-0 group-hover:opacity-100" aria-label="More options">
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent onClick={(e) => e.stopPropagation()}>
                {onAddToPlaylistClick && <DropdownMenuItem onClick={handleAddToPlaylist}>
                    <PlusCircle className="mr-2 h-4 w-4" /> Add to Playlist
                </DropdownMenuItem>}
                {/* Add other options like "Add to Queue", "Go to Album", "Go to Artist" */}
                <DropdownMenuItem>View Album</DropdownMenuItem>
                <DropdownMenuItem>View Artist</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default SongListItem;