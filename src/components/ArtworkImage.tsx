import React, { useState } from 'react';
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface ArtworkImageProps {
  src?: string;
  alt: string;
  aspectRatio?: number; // e.g., 1 for square, 16/9 for wide. Default is 1/1.
  className?: string; // For additional styling
  fallbackSrc?: string; // Custom fallback image
  isInteractive?: boolean; // e.g. hover effects
}

const ArtworkImage: React.FC<ArtworkImageProps> = ({
  src,
  alt,
  aspectRatio = 1, // Default to square
  className = '',
  fallbackSrc = '/placeholder.svg', // Default project placeholder
  isInteractive = false,
}) => {
  const [currentSrc, setCurrentSrc] = useState(src || fallbackSrc);
  const [hasError, setHasError] = useState(!src);

  React.useEffect(() => {
    setCurrentSrc(src || fallbackSrc);
    setHasError(!src);
  }, [src, fallbackSrc]);

  const handleError = () => {
    console.warn(`Error loading image: ${src}. Falling back to ${fallbackSrc}`);
    setCurrentSrc(fallbackSrc);
    setHasError(true);
  };

  console.log(`Rendering ArtworkImage: ${alt}, Src: ${currentSrc}`);

  return (
    <div className={`relative overflow-hidden bg-neutral-200 dark:bg-neutral-800 rounded ${className} ${isInteractive ? 'transition-transform duration-300 hover:scale-105' : ''}`}>
      <AspectRatio ratio={aspectRatio}>
        <img
          src={currentSrc}
          alt={alt}
          className="w-full h-full object-cover"
          onError={handleError}
          // To prevent showing broken image icon before fallback kicks in on initial load if src is invalid
          style={{ display: hasError && currentSrc === fallbackSrc ? 'block' : undefined }}
        />
      </AspectRatio>
      {hasError && currentSrc === fallbackSrc && (
        <div className="absolute inset-0 flex items-center justify-center text-neutral-500 text-xs">
          {/* Optional: Display a placeholder icon or text if needed, but usually covered by placeholder.svg */}
        </div>
      )}
    </div>
  );
};

export default ArtworkImage;