import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import ArtworkImage from '@/components/ArtworkImage';
import SongListItem from '@/components/SongListItem';
import PersistentPlaybackBar from '@/components/PersistentPlaybackBar';
import { Home, Search, Library, User, Settings, LogOut, Menu, Play, Heart, PlusCircle, ChevronsUpDown } from 'lucide-react';

const sampleAlbumData = {
  id: 'albumXyz',
  type: 'album',
  title: 'Echoes of the Past',
  artist: 'The Timeless Travelers',
  releaseDate: '2023-03-15',
  description: 'A journey through soundscapes that blend classic rock with futuristic synth melodies. Each track tells a story of time, memory, and the search for meaning.',
  imageUrl: 'https://picsum.photos/seed/albumXyz/400/400',
  tracks: [
    { id: 'trackA1', title: 'Chronos Overture', artist: 'The Timeless Travelers', album: 'Echoes of the Past', duration: '2:15', imageUrl: 'https://picsum.photos/seed/trackA1/50/50' },
    { id: 'trackA2', title: 'Future\'s Reflection', artist: 'The Timeless Travelers', album: 'Echoes of the Past', duration: '4:30', imageUrl: 'https://picsum.photos/seed/trackA2/50/50', isExplicit: true },
    { id: 'trackA3', title: 'Forgotten Melody', artist: 'The Timeless Travelers', album: 'Echoes of the Past', duration: '3:50', imageUrl: 'https://picsum.photos/seed/trackA3/50/50' },
    { id: 'trackA4', title: 'The Portal', artist: 'The Timeless Travelers', album: 'Echoes of the Past', duration: '5:10', imageUrl: 'https://picsum.photos/seed/trackA4/50/50' },
  ]
};
const sampleArtistData = {
  id: 'artistAbc',
  type: 'artist',
  title: 'Aurora Bloom',
  genre: 'Indie Pop / Dream Pop',
  description: 'Aurora Bloom crafts ethereal soundscapes that transport listeners to otherworldly realms. Known for haunting vocals and lush instrumentation.',
  imageUrl: 'https://picsum.photos/seed/artistAbc/400/400',
  topTracks: [
    { id: 'trackB1', title: 'Stardust Lullaby', artist: 'Aurora Bloom', album: 'Celestial Dreams', duration: '3:45', imageUrl: 'https://picsum.photos/seed/trackB1/50/50' },
    { id: 'trackB2', title: 'Moonlit Wanderer', artist: 'Aurora Bloom', album: 'Nightshade EP', duration: '4:12', imageUrl: 'https://picsum.photos/seed/trackB2/50/50' },
  ],
  albums: [ /* Could list MediaCards here */ ]
};

// Simplified initial track for playback bar
const initialTrack = {
  id: 'track004',
  title: 'Loading Content...',
  artist: 'System',
  albumArtUrl: 'https://picsum.photos/seed/track004/100/100',
  duration: 180,
};

const SidebarContent = () => (
  <div className="flex flex-col gap-2 p-4 text-white">
    <Button variant="ghost" className="justify-start gap-2 text-lg"><Home className="h-5 w-5" /> Home</Button>
    <Button variant="ghost" className="justify-start gap-2 text-lg"><Search className="h-5 w-5" /> Search</Button>
    <Button variant="ghost" className="justify-start gap-2 text-lg"><Library className="h-5 w-5" /> Your Library</Button>
     <div className="mt-auto">
      <Collapsible>
        <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-neutral-700 rounded-md text-sm">
          <span>My Playlists</span>
          <ChevronsUpDown className="h-4 w-4" />
        </CollapsibleTrigger>
        <CollapsibleContent className="pl-4 pt-2">
          <Button variant="ghost" size="sm" className="justify-start w-full">Liked Songs</Button>
        </CollapsibleContent>
      </Collapsible>
    </div>
  </div>
);


const ContentDetailPage = () => {
  const { type, id } = useParams<{ type: string, id: string }>();
  const [contentData, setContentData] = useState<any>(null);
  
  console.log(`ContentDetailPage loaded for type: ${type}, id: ${id}`);

  useEffect(() => {
    // Simulate API call
    if (type === 'album') setContentData(sampleAlbumData);
    else if (type === 'artist') setContentData(sampleArtistData);
    else setContentData({ id, type, title: 'Generic Content ' + id, description: 'Details about this content.', imageUrl: `https://picsum.photos/seed/${id}/400/400`, tracks: [] });
  }, [type, id]);

  const [currentTrack, setCurrentTrack] = useState<any>(initialTrack);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(20);
  const [volume, setVolume] = useState(75);

  const handlePlayPause = () => setIsPlaying(!isPlaying);
  const handleSeek = (newProgress: number) => setProgress(newProgress);
  const handleVolumeChange = (newVolume: number) => setVolume(newVolume);

  const handlePlaySong = (songId: string | number) => {
    console.log('Play song:', songId);
    const song = contentData?.tracks?.find((s:any) => s.id === songId) || contentData?.topTracks?.find((s:any) => s.id === songId);
    if (song) {
      setCurrentTrack({
        id: String(songId),
        title: song.title,
        artist: song.artist,
        albumArtUrl: song.imageUrl || contentData.imageUrl,
        duration: parseInt(song.duration.split(':')[0]) * 60 + parseInt(song.duration.split(':')[1])
      });
      setIsPlaying(true);
      setProgress(0);
    }
  };

  const handlePlayAll = () => {
    const firstTrack = contentData?.tracks?.[0] || contentData?.topTracks?.[0];
    if (firstTrack) {
        handlePlaySong(firstTrack.id);
    }
  }

  if (!contentData) return <div className="flex h-screen items-center justify-center bg-neutral-900 text-white">Loading content...</div>;

  return (
    <div className="flex h-screen bg-neutral-900 text-white">
      <aside className="hidden md:block w-64 bg-neutral-950 p-4">
        <div className="text-2xl font-bold mb-8 text-green-500">AscendionPlay</div>
        <SidebarContent />
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
         <header className="bg-neutral-800/80 backdrop-blur-md p-4 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-4">
             <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon"><Menu /></Button>
              </SheetTrigger>
              <SheetContent side="left" className="bg-neutral-950 p-0 w-64 border-r-0">
                 <div className="text-2xl font-bold p-4 text-green-500">AscendionPlay</div>
                <SidebarContent />
              </SheetContent>
            </Sheet>
            <Input type="search" placeholder="Search..." className="w-64 bg-neutral-700 border-neutral-600 placeholder:text-neutral-400" />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage src="https://picsum.photos/seed/avatar/40/40" alt="@shadcn" />
                <AvatarFallback>AP</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-neutral-800 border-neutral-700 text-white">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-neutral-700"/>
              <DropdownMenuItem className="hover:bg-neutral-700 focus:bg-neutral-700">Profile</DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-neutral-700 focus:bg-neutral-700">Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        <main className="flex-1 overflow-y-auto p-6" style={{ paddingBottom: '150px' }}> {/* Extra padding for tall content */}
          <div className="md:flex md:gap-8 mb-8">
            <div className="w-full md:w-1/3 lg:w-1/4 mb-6 md:mb-0">
              <ArtworkImage src={contentData.imageUrl} alt={contentData.title} className="rounded-lg shadow-xl" aspectRatio={1} />
            </div>
            <div className="flex-1">
              <p className="text-xs uppercase text-neutral-400 mb-1">{contentData.type}</p>
              <h1 className="text-4xl lg:text-5xl font-bold mb-2">{contentData.title}</h1>
              {contentData.artist && <h2 className="text-2xl text-neutral-300 mb-1">{contentData.artist}</h2>}
              {contentData.genre && <p className="text-md text-neutral-400 mb-3">{contentData.genre}</p>}
              <p className="text-neutral-300 mb-6 text-sm">{contentData.description}</p>
              <div className="flex gap-3 items-center">
                <Button size="lg" className="bg-green-500 hover:bg-green-600 text-black px-8" onClick={handlePlayAll}>
                  <Play className="mr-2 h-5 w-5 fill-black" /> Play All
                </Button>
                <Button variant="outline" size="icon" className="text-white border-neutral-500 hover:bg-neutral-700">
                  <Heart className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="icon" className="text-white border-neutral-500 hover:bg-neutral-700">
                  <PlusCircle className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
          
          {(contentData.tracks || contentData.topTracks) && (
            <section>
              <h2 className="text-2xl font-semibold mb-4">
                {contentData.type === 'album' ? 'Tracklist' : 'Top Tracks'}
              </h2>
              <div className="space-y-1">
                {(contentData.tracks || contentData.topTracks).map((song: any, index: number) => (
                  <SongListItem
                    key={song.id}
                    {...song}
                    onPlayClick={handlePlaySong}
                    isPlaying={currentTrack?.id === song.id && isPlaying}
                  />
                ))}
              </div>
            </section>
          )}
        </main>

        <PersistentPlaybackBar
          currentTrack={currentTrack}
          isPlaying={isPlaying}
          progress={progress}
          volume={volume}
          onPlayPauseToggle={handlePlayPause}
          onSkipNext={() => console.log('Skip next')}
          onSkipPrevious={() => console.log('Skip previous')}
          onSeek={handleSeek}
          onVolumeChange={handleVolumeChange}
        />
      </div>
    </div>
  );
};

export default ContentDetailPage;