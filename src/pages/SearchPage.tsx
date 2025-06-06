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
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MediaCard from '@/components/MediaCard';
import SongListItem from '@/components/SongListItem';
import PersistentPlaybackBar from '@/components/PersistentPlaybackBar';
import { Home, Search, Library, User, Settings, LogOut, Menu, ChevronsUpDown } from 'lucide-react';

const placeholderSongs = [
  { id: 'song1', title: 'Sunset Cruise', artist: 'Synthwave Kid', album: 'Night Drives', duration: '3:45', imageUrl: 'https://picsum.photos/seed/song1/50/50', isExplicit: false },
  { id: 'song2', title: 'Midnight City', artist: 'M83', album: 'Hurry Up, We\'re Dreaming', duration: '4:03', imageUrl: 'https://picsum.photos/seed/song2/50/50', isExplicit: false },
  { id: 'song3', title: 'Genesis', artist: 'Grimes', album: 'Visions', duration: '4:15', imageUrl: 'https://picsum.photos/seed/song3/50/50', isExplicit: true },
];

const placeholderAlbums = [
  { id: 'albumS1', title: 'Discovery', subtitle: 'Daft Punk', imageUrl: 'https://picsum.photos/seed/albumS1/200/200', type: 'album' as const },
  { id: 'albumS2', title: 'Currents', subtitle: 'Tame Impala', imageUrl: 'https://picsum.photos/seed/albumS2/200/200', type: 'album' as const },
];

const placeholderArtists = [
  { id: 'artistS1', title: 'Glass Animals', subtitle: 'Artist', imageUrl: 'https://picsum.photos/seed/artistS1/200/200', type: 'artist' as const },
];

const initialTrack = {
  id: 'track002',
  title: 'Lost Frequencies',
  artist: 'Are You With Me',
  albumArtUrl: 'https://picsum.photos/seed/track002/100/100',
  duration: 190,
};

const SidebarContent = () => (
  <div className="flex flex-col gap-2 p-4 text-white">
    <Button variant="ghost" className="justify-start gap-2 text-lg"><Home className="h-5 w-5" /> Home</Button>
    <Button variant="ghost" className="justify-start gap-2 text-lg bg-neutral-700"><Search className="h-5 w-5" /> Search</Button>
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

const SearchPage = () => {
  console.log('SearchPage loaded');
  const [searchTerm, setSearchTerm] = useState("Synthwave");
  const [currentTrack, setCurrentTrack] = useState<any>(initialTrack);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(10);
  const [volume, setVolume] = useState(80);

  const handlePlayPause = () => setIsPlaying(!isPlaying);
  const handleSeek = (newProgress: number) => setProgress(newProgress);
  const handleVolumeChange = (newVolume: number) => setVolume(newVolume);

  const handlePlaySong = (id: string | number) => {
    console.log('Play song:', id);
    const song = placeholderSongs.find(s => s.id === id);
    if (song) {
      setCurrentTrack({
        id: String(id),
        title: song.title,
        artist: song.artist,
        albumArtUrl: song.imageUrl || 'https://picsum.photos/seed/default/100/100',
        duration: parseInt(song.duration.split(':')[0]) * 60 + parseInt(song.duration.split(':')[1])
      });
      setIsPlaying(true);
      setProgress(0);
    }
  };

  const handlePlayMedia = (id: string | number) => {
    console.log('Play media item:', id);
     const item = [...placeholderAlbums, ...placeholderArtists].find(m => m.id === id);
    if (item) {
      setCurrentTrack({
        id: String(id),
        title: item.title,
        artist: item.subtitle || 'Various Artists',
        albumArtUrl: item.imageUrl,
        duration: 180 + Math.floor(Math.random() * 120) 
      });
      setIsPlaying(true);
      setProgress(0);
    }
  };


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
            <Input 
              type="search" 
              placeholder="Search songs, artists, albums..." 
              className="w-64 bg-neutral-700 border-neutral-600 placeholder:text-neutral-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
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

        <main className="flex-1 overflow-y-auto p-6" style={{ paddingBottom: '100px' }}>
          <h1 className="text-3xl font-bold mb-6">Search Results for "{searchTerm}"</h1>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="bg-neutral-800">
              <TabsTrigger value="all" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">All</TabsTrigger>
              <TabsTrigger value="songs" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">Songs</TabsTrigger>
              <TabsTrigger value="albums" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">Albums</TabsTrigger>
              <TabsTrigger value="artists" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">Artists</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-6">
              <section className="space-y-4">
                <h2 className="text-xl font-semibold">Songs</h2>
                {placeholderSongs.map(song => <SongListItem key={song.id} {...song} onPlayClick={handlePlaySong} isPlaying={currentTrack?.id === song.id && isPlaying}/>)}
                <h2 className="text-xl font-semibold mt-6">Albums</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {placeholderAlbums.map(album => <MediaCard key={album.id} {...album} onPlayClick={handlePlayMedia} onPrimaryActionClick={handlePlayMedia} />)}
                </div>
                <h2 className="text-xl font-semibold mt-6">Artists</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {placeholderArtists.map(artist => <MediaCard key={artist.id} {...artist} onPlayClick={handlePlayMedia} onPrimaryActionClick={handlePlayMedia} />)}
                </div>
              </section>
            </TabsContent>
            <TabsContent value="songs" className="mt-6 space-y-2">
              {placeholderSongs.map(song => <SongListItem key={song.id} {...song} onPlayClick={handlePlaySong} isPlaying={currentTrack?.id === song.id && isPlaying} />)}
            </TabsContent>
            <TabsContent value="albums" className="mt-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {placeholderAlbums.map(album => <MediaCard key={album.id} {...album} onPlayClick={handlePlayMedia} onPrimaryActionClick={handlePlayMedia} />)}
              </div>
            </TabsContent>
            <TabsContent value="artists" className="mt-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {placeholderArtists.map(artist => <MediaCard key={artist.id} {...artist} onPlayClick={handlePlayMedia} onPrimaryActionClick={handlePlayMedia} />)}
              </div>
            </TabsContent>
          </Tabs>
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

export default SearchPage;