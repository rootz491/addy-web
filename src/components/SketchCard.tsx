'use client';

import Image from 'next/image';
import type { BaseSketch } from '@/types/sketch';

interface SketchCardProps {
  sketch: BaseSketch;
  onClick: () => void;
}

export function SketchCard({ sketch, onClick }: SketchCardProps) {
  const firstImage = sketch.images[0];
  const imageCount = sketch.images.length;

  return (
    <div
      onClick={onClick}
      className="group relative break-inside-avoid cursor-pointer overflow-hidden rounded-lg bg-card transition-all hover:shadow-lg"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        <Image
          src={firstImage.asset.url}
          alt={firstImage.alt || sketch.title || 'Sketch'}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          placeholder="blur"
          blurDataURL={firstImage.asset.metadata.lqip}
        />

        {/* Image count badge */}
        {imageCount > 1 && (
          <div className="absolute right-2 top-2 rounded-full bg-black/60 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm">
            {imageCount} photos
          </div>
        )}

        {/* Featured badge */}
        {sketch.featured && (
          <div className="absolute left-2 top-2 rounded-full bg-primary/90 px-2 py-1 text-xs font-medium text-primary-foreground backdrop-blur-sm">
            ⭐ Featured
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>
    </div>
  );
}
