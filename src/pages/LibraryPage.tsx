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
import { Home, Search, Library, User, Settings, LogOut, Menu, PlusCircle, ChevronsUpDown } from 'lucide-react';

const likedSongs = [
  { id: 'liked1', title: 'Bohemian Rhapsody', artist: 'Queen', album: 'A Night at the Opera', duration: '5:55', imageUrl: 'https://picsum.photos/seed/liked1/50/50', isLiked: true },
  { id: 'liked2', title: 'Stairway to Heaven', artist: 'Led Zeppelin', album: 'Led Zeppelin IV', duration: '8:02', imageUrl: 'https://picsum.photos/seed/liked2/50/50', isLiked: true },
];

const libraryPlaylists = [
  { id: 'libPlaylist1', title: 'Road Trip Anthems', subtitle: 'Curated by You', imageUrl: 'https://picsum.photos/seed/libPlaylist1/200/200', type: 'playlist' as const },
  { id: 'libPlaylist2', title: 'Deep Focus Coding', subtitle: 'Generated Mix', imageUrl: 'https://picsum.photos/seed/libPlaylist2/200/200', type: 'playlist' as const },
];
const libraryArtists = [
 { id: 'libArtist1', title: 'Pink Floyd', subtitle: 'Artist', imageUrl: 'https://picsum.photos/seed/libArtist1/200/200', type: 'artist' as const },
];
const libraryAlbums = [
 { id: 'libAlbum1', title: 'The Dark Side of the Moon', subtitle: 'Pink Floyd', imageUrl: 'https://picsum.photos/seed/libAlbum1/200/200', type: 'album' as const },
];

const initialTrack = {
  id: 'track003',
  title: 'Chill Vibes Only',
  artist: 'Lofi Girl',
  albumArtUrl: 'https://picsum.photos/seed/track003/100/100',
  duration: 220,
};

const SidebarContent = () => (
  <div className="flex flex-col gap-2 p-4 text-white">
    <Button variant="ghost" className="justify-start gap-2 text-lg"><Home className="h-5 w-5" /> Home</Button>
    <Button variant="ghost" className="justify-start gap-2 text-lg"><Search className="h-5 w-5" /> Search</Button>
    <Button variant="ghost" className="justify-start gap-2 text-lg bg-neutral-700"><Library className="h-5 w-5" /> Your Library</Button>
     <div className="mt-auto">
      <Collapsible>
        <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-neutral-700 rounded-md text-sm">
          <span>My Playlists</span>
          <ChevronsUpDown className="h-4 w-4" />
        </CollapsibleTrigger>
        <CollapsibleContent className="pl-4 pt-2">
          <Button variant="ghost" size="sm" className="justify-start w-full">Liked Songs</Button>
          <Button variant="ghost" size="sm" className="justify-start w-full">Road Trip</Button>
        </CollapsibleContent>
      </Collapsible>
    </div>
  </div>
);

const LibraryPage = () => {
  console.log('LibraryPage loaded');
  const [currentTrack, setCurrentTrack] = useState<any>(initialTrack);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(50);
  const [volume, setVolume] = useState(60);

  const handlePlayPause = () => setIsPlaying(!isPlaying);
  const handleSeek = (newProgress: number) => setProgress(newProgress);
  const handleVolumeChange = (newVolume: number) => setVolume(newVolume);

  const handlePlaySong = (id: string | number) => {
    console.log('Play song from library:', id);
     const song = likedSongs.find(s => s.id === id);
    if (song) {
      setCurrentTrack({
        id: String(id),
        title: song.title,
        artist: song.artist,
        albumArtUrl: song.imageUrl || 'https://picsum.photos/seed/defaultLib/100/100',
        duration: parseInt(song.duration.split(':')[0]) * 60 + parseInt(song.duration.split(':')[1])
      });
      setIsPlaying(true);
      setProgress(0);
    }
  };
  
  const handlePlayMedia = (id: string | number) => {
    console.log('Play media item from library:', id);
     const item = [...libraryPlaylists, ...libraryArtists, ...libraryAlbums].find(m => m.id === id);
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
            <Input type="search" placeholder="Search in library..." className="w-64 bg-neutral-700 border-neutral-600 placeholder:text-neutral-400" />
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
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Your Library</h1>
            <Button variant="outline" className="text-white border-green-500 hover:bg-green-500 hover:text-black">
              <PlusCircle className="mr-2 h-4 w-4" /> Create Playlist
            </Button>
          </div>
          <Tabs defaultValue="playlists" className="w-full">
            <TabsList className="bg-neutral-800">
              <TabsTrigger value="playlists" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">Playlists</TabsTrigger>
              <TabsTrigger value="liked" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">Liked Songs</TabsTrigger>
              <TabsTrigger value="artists" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">Artists</TabsTrigger>
              <TabsTrigger value="albums" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">Albums</TabsTrigger>
            </TabsList>
            <TabsContent value="playlists" className="mt-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {libraryPlaylists.map(item => <MediaCard key={item.id} {...item} onPlayClick={handlePlayMedia} onPrimaryActionClick={handlePlayMedia} />)}
              </div>
            </TabsContent>
            <TabsContent value="liked" className="mt-6 space-y-2">
              {likedSongs.map(song => <SongListItem key={song.id} {...song} onPlayClick={handlePlaySong} isPlaying={currentTrack?.id === song.id && isPlaying} onLikeClick={() => console.log('Unlike', song.id)} />)}
            </TabsContent>
            <TabsContent value="artists" className="mt-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {libraryArtists.map(item => <MediaCard key={item.id} {...item} onPlayClick={handlePlayMedia} onPrimaryActionClick={handlePlayMedia} />)}
              </div>
            </TabsContent>
            <TabsContent value="albums" className="mt-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {libraryAlbums.map(item => <MediaCard key={item.id} {...item} onPlayClick={handlePlayMedia} onPrimaryActionClick={handlePlayMedia} />)}
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

export default LibraryPage;