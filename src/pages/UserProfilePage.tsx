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
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import PersistentPlaybackBar from '@/components/PersistentPlaybackBar';
import { Home, Search, Library, User, Settings, LogOut, Menu, ChevronsUpDown, Edit3 } from 'lucide-react';

// Assume PersistentPlaybackBar needs some minimal state
const initialTrack = {
  id: 'track005',
  title: 'Profile Ambience',
  artist: 'System Sounds',
  albumArtUrl: 'https://picsum.photos/seed/track005/100/100',
  duration: 180,
};

const SidebarContent = () => (
  <div className="flex flex-col gap-2 p-4 text-white">
    <Button variant="ghost" className="justify-start gap-2 text-lg"><Home className="h-5 w-5" /> Home</Button>
    <Button variant="ghost" className="justify-start gap-2 text-lg"><Search className="h-5 w-5" /> Search</Button>
    <Button variant="ghost" className="justify-start gap-2 text-lg"><Library className="h-5 w-5" /> Your Library</Button>
    <Button variant="ghost" className="justify-start gap-2 text-lg bg-neutral-700"><User className="h-5 w-5" /> Profile</Button>
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

const UserProfilePage = () => {
  console.log('UserProfilePage loaded');
  // Mock authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Toggle this to see different views
  
  // Form states
  const [email, setEmail] = useState(isAuthenticated ? 'user@example.com' : '');
  const [username, setUsername] = useState(isAuthenticated ? 'MusicLover123' : '');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  // Playback bar state
  const [currentTrack, setCurrentTrack] = useState<any>(initialTrack);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(50);

  const handlePlayPause = () => setIsPlaying(!isPlaying);
  const handleSeek = (newProgress: number) => setProgress(newProgress);
  const handleVolumeChange = (newVolume: number) => setVolume(newVolume);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt:', { email, password });
    // Mock login success
    if (email && password) {
        setIsAuthenticated(true);
        setUsername(email.split('@')[0]); // Simple username generation
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Register attempt:', { username, email, password });
    // Mock register success
     if (username && email && password) {
        setIsAuthenticated(true);
     }
  };

  const handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Save changes:', { username, email, newPassword: newPassword ? '******' : 'not changed' });
    alert('Profile changes saved (mocked)!');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setEmail('');
    setUsername('');
    setPassword('');
    setNewPassword('');
  }


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
            {/* No search bar needed on profile page typically, but following layout-info if strictly needed */}
            {/* <Input type="search" placeholder="Search..." className="w-64 bg-neutral-700 border-neutral-600" /> */}
            <span className="text-xl font-semibold">User Profile & Settings</span>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage src={isAuthenticated ? "https://picsum.photos/seed/avatar/40/40" : undefined} alt={username} />
                <AvatarFallback>{username ? username.substring(0,2).toUpperCase() : '??'}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-neutral-800 border-neutral-700 text-white">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-neutral-700"/>
              {isAuthenticated ? (
                <>
                <DropdownMenuItem className="hover:bg-neutral-700 focus:bg-neutral-700"><Settings className="mr-2 h-4 w-4" /> Settings</DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout} className="hover:bg-neutral-700 focus:bg-neutral-700"><LogOut className="mr-2 h-4 w-4" /> Log out</DropdownMenuItem>
                </>
              ) : (
                <DropdownMenuItem className="hover:bg-neutral-700 focus:bg-neutral-700">Login / Register</DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        <main className="flex-1 overflow-y-auto p-6 flex items-center justify-center" style={{ paddingBottom: '100px' }}>
          <Card className="w-full max-w-md bg-neutral-800 border-neutral-700 text-white">
            {isAuthenticated ? (
              <>
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src="https://picsum.photos/seed/avatar/80/80" alt={username} />
                      <AvatarFallback>{username.substring(0,2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-2xl">{username}</CardTitle>
                      <CardDescription className="text-neutral-400">{email}</CardDescription>
                    </div>
                  </div>
                  <CardTitle>Edit Profile</CardTitle>
                  <CardDescription>Update your account details.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSaveChanges} className="space-y-4">
                    <div>
                      <Label htmlFor="username">Username</Label>
                      <Input id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="bg-neutral-700 border-neutral-600" />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-neutral-700 border-neutral-600" />
                    </div>
                    <div>
                      <Label htmlFor="newPassword">New Password (optional)</Label>
                      <Input id="newPassword" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="bg-neutral-700 border-neutral-600" />
                    </div>
                    <Button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-black">Save Changes</Button>
                  </form>
                </CardContent>
                 <CardFooter className="flex-col items-start">
                    <Button variant="destructive" onClick={handleLogout} className="w-full mt-4">Logout</Button>
                </CardFooter>
              </>
            ) : (
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-neutral-700">
                  <TabsTrigger value="login" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">Login</TabsTrigger>
                  <TabsTrigger value="register" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">Register</TabsTrigger>
                </TabsList>
                <TabsContent value="login">
                  <CardHeader>
                    <CardTitle>Login</CardTitle>
                    <CardDescription>Access your AscendionPlay account.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleLogin} className="space-y-4">
                      <div>
                        <Label htmlFor="login-email">Email</Label>
                        <Input id="login-email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-neutral-700 border-neutral-600" />
                      </div>
                      <div>
                        <Label htmlFor="login-password">Password</Label>
                        <Input id="login-password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="bg-neutral-700 border-neutral-600" />
                      </div>
                      <Button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-black">Login</Button>
                    </form>
                  </CardContent>
                </TabsContent>
                <TabsContent value="register">
                  <CardHeader>
                    <CardTitle>Register</CardTitle>
                    <CardDescription>Create a new AscendionPlay account.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleRegister} className="space-y-4">
                      <div>
                        <Label htmlFor="register-username">Username</Label>
                        <Input id="register-username" type="text" placeholder="Choose a username" value={username} onChange={(e) => setUsername(e.target.value)} className="bg-neutral-700 border-neutral-600" />
                      </div>
                      <div>
                        <Label htmlFor="register-email">Email</Label>
                        <Input id="register-email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-neutral-700 border-neutral-600" />
                      </div>
                      <div>
                        <Label htmlFor="register-password">Password</Label>
                        <Input id="register-password" type="password" placeholder="Create a strong password" value={password} onChange={(e) => setPassword(e.target.value)} className="bg-neutral-700 border-neutral-600" />
                      </div>
                      <Button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-black">Register</Button>
                    </form>
                  </CardContent>
                </TabsContent>
              </Tabs>
            )}
          </Card>
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

export default UserProfilePage;