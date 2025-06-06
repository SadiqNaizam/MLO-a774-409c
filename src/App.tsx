import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Homepage from "./pages/Homepage";
import SearchPage from "./pages/SearchPage";
import LibraryPage from "./pages/LibraryPage";
import ContentDetailPage from "./pages/ContentDetailPage";
import UserProfilePage from "./pages/UserProfilePage";
import NotFound from "./pages/NotFound"; // Assuming NotFound.tsx exists

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/library" element={<LibraryPage />} />
          {/* Dynamic route for content details, e.g., /content/album/123 or /content/artist/abc */}
          <Route path="/content/:type/:id" element={<ContentDetailPage />} />
          <Route path="/profile" element={<UserProfilePage />} />
          {/* UserProfilePage can also handle login/registration based on its internal state,
              or you can create specific routes if needed e.g. /login, /register pointing to UserProfilePage or dedicated components.
              For this setup, /profile will show login/register if not authenticated. */}
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;