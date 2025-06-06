import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { PlayCircle, PlusCircle } from 'lucide-react'; // Example icons

interface MediaCardProps {
  id: string | number;
  title: string;
  subtitle?: string;
  imageUrl: string;
  type: 'album' | 'playlist' | 'artist'; // To differentiate styling or actions
  onPlayClick?: (id: string | number) => void;
  onPrimaryActionClick?: (id: string | number) => void; // e.g., view details
}

const MediaCard: React.FC<MediaCardProps> = ({
  id,
  title,
  subtitle,
  imageUrl,
  type,
  onPlayClick,
  onPrimaryActionClick,
}) => {
  console.log(`Rendering MediaCard: ${title} (Type: ${type}, ID: ${id})`);

  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click if play button is separate
    console.log(`Play clicked on MediaCard: ${id}`);
    onPlayClick?.(id);
  };

  const handleCardClick = () => {
    console.log(`MediaCard clicked: ${id}`);
    onPrimaryActionClick?.(id);
  };

  return (
    <Card
      className="w-full max-w-[200px] overflow-hidden transition-all hover:shadow-lg cursor-pointer group"
      onClick={handleCardClick}
    >
      <CardHeader className="p-0 relative">
        <AspectRatio ratio={1 / 1} className="bg-muted">
          <img
            src={imageUrl || '/placeholder.svg'}
            alt={title}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            onError={(e) => (e.currentTarget.src = '/placeholder.svg')}
          />
        </AspectRatio>
        {onPlayClick && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute bottom-2 right-2 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity h-10 w-10"
            onClick={handlePlay}
            aria-label={`Play ${title}`}
          >
            <PlayCircle className="h-6 w-6" />
          </Button>
        )}
      </CardHeader>
      <CardContent className="p-3">
        <CardTitle className="text-sm font-semibold truncate" title={title}>{title}</CardTitle>
        {subtitle && <CardDescription className="text-xs truncate" title={subtitle}>{subtitle}</CardDescription>}
      </CardContent>
      {/* Example footer for more actions if needed
      <CardFooter className="p-2">
        <Button variant="outline" size="sm" className="w-full">
          <PlusCircle className="mr-2 h-4 w-4" /> Add to Library
        </Button>
      </CardFooter>
      */}
    </Card>
  );
};

export default MediaCard;