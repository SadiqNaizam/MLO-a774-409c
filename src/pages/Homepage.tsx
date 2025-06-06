import React, { useState } from 'react';
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
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"; // For mobile sidebar
import MediaCard from '@/components/MediaCard';
import PersistentPlaybackBar from '@/components/PersistentPlaybackBar';
import { Home, Search, Library, User, Settings, LogOut, Menu, PlayCircle, ListMusic, ChevronsUpDown } from 'lucide-react';

const placeholderMediaItems = [
  { id: 'album1', title: 'Melodic Horizons', subtitle: 'Chill Vibes', imageUrl: 'https://picsum.photos/seed/album1/200/200', type: 'album' as const },
  { id: 'playlist1', title: 'Focus Flow', subtitle: 'Instrumental Beats', imageUrl: 'https://picsum.photos/seed/playlist1/200/200', type: 'playlist' as const },
  { id: 'album2', title: 'Synthwave Dreams', subtitle: 'Retro Futurism', imageUrl: 'https://picsum.photos/seed/album2/200/200', type: 'album' as const },
  { id: 'artist1', title: 'The Echoes', subtitle: 'Artist', imageUrl: 'https://picsum.photos/seed/artist1/200/200', type: 'artist' as const },
  { id: 'album3', title: 'Acoustic Mornings', subtitle: 'Soft Sounds', imageUrl: 'https://picsum.photos/seed/album3/200/200', type: 'album' as const },
  { id: 'playlist2', title: 'Workout Power', subtitle: 'High Energy', imageUrl: 'https://picsum.photos/seed/playlist2/200/200', type: 'playlist' as const },
];

const initialTrack = {
  id: 'track001',
  title: 'Ocean Drive',
  artist: 'Duke Dumont',
  albumArtUrl: 'https://picsum.photos/seed/track001/100/100',
  duration: 206, // seconds
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
          <Button variant="ghost" size="sm" className="justify-start w-full">Chill Mix</Button>
          <Button variant="ghost" size="sm" className="justify-start w-full">Workout</Button>
        </CollapsibleContent>
      </Collapsible>
    </div>
  </div>
);

const Homepage = () => {
  console.log('Homepage loaded');
  const [currentTrack, setCurrentTrack] = useState<any>(initialTrack);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(30);
  const [volume, setVolume] = useState(70);

  const handlePlayPause = () => setIsPlaying(!isPlaying);
  const handleSeek = (newProgress: number) => setProgress(newProgress);
  const handleVolumeChange = (newVolume: number) => setVolume(newVolume);
  const handlePlayMedia = (id: string | number) => {
    console.log('Play media item:', id);
    const item = placeholderMediaItems.find(m => m.id === id);
    if (item) {
      setCurrentTrack({
        id: String(id),
        title: item.title,
        artist: item.subtitle || 'Various Artists',
        albumArtUrl: item.imageUrl,
        duration: 180 + Math.floor(Math.random() * 120) // Random duration
      });
      setIsPlaying(true);
      setProgress(0);
    }
  };

  return (
    <div className="flex h-screen bg-neutral-900 text-white">
      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-64 bg-neutral-950 p-4">
        <div className="text-2xl font-bold mb-8 text-green-500">AscendionPlay</div>
        <SidebarContent />
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-neutral-800/80 backdrop-blur-md p-4 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-4">
            {/* Mobile Sidebar Trigger */}
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon"><Menu /></Button>
              </SheetTrigger>
              <SheetContent side="left" className="bg-neutral-950 p-0 w-64 border-r-0">
                <div className="text-2xl font-bold p-4 text-green-500">AscendionPlay</div>
                <SidebarContent />
              </SheetContent>
            </Sheet>
            <Input type="search" placeholder="Search songs, artists, albums..." className="w-64 bg-neutral-700 border-neutral-600 placeholder:text-neutral-400" />
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
              <DropdownMenuItem className="hover:bg-neutral-700 focus:bg-neutral-700"><User className="mr-2 h-4 w-4" /> Profile</DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-neutral-700 focus:bg-neutral-700"><Settings className="mr-2 h-4 w-4" /> Settings</DropdownMenuItem>
              <DropdownMenuSeparator className="bg-neutral-700"/>
              <DropdownMenuItem className="hover:bg-neutral-700 focus:bg-neutral-700"><LogOut className="mr-2 h-4 w-4" /> Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6 space-y-8" style={{ paddingBottom: '100px' }}>
          <section>
            <h1 className="text-3xl font-bold mb-4">Welcome Back!</h1>
            <h2 className="text-xl text-neutral-300 mb-6">Discover your next favorite tune.</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {placeholderMediaItems.slice(0,6).map(item => (
                <MediaCard key={item.id} {...item} onPlayClick={handlePlayMedia} onPrimaryActionClick={handlePlayMedia}/>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Recently Played</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {placeholderMediaItems.slice(3,5).map(item => (
                <MediaCard key={item.id} {...item} onPlayClick={handlePlayMedia} onPrimaryActionClick={handlePlayMedia}/>
              ))}
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Made For You</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {placeholderMediaItems.filter(item => item.type === 'playlist').map(item => (
                <MediaCard key={item.id} {...item} onPlayClick={handlePlayMedia} onPrimaryActionClick={handlePlayMedia}/>
              ))}
            </div>
          </section>
        </main>

        {/* Playback Bar */}
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
          onToggleQueue={() => console.log('Toggle queue')}
        />
      </div>
    </div>
  );
};

export default Homepage;