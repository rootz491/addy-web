'use client';

import Image from 'next/image';
import { Calendar, Tag, DollarSign } from 'lucide-react';
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

      {/* Info section */}
      {(sketch.title || sketch.dateOfCreation || sketch.categories || sketch.price) && (
        <div className="space-y-2 p-3">
          {sketch.title && (
            <h3 className="line-clamp-2 font-semibold leading-tight">{sketch.title}</h3>
          )}

          <div className="space-y-1 text-xs text-muted-foreground">
            {sketch.dateOfCreation && (
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>
                  {new Date(sketch.dateOfCreation).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                  })}
                </span>
              </div>
            )}

            {sketch.categories && sketch.categories.length > 0 && (
              <div className="flex items-center gap-1">
                <Tag className="h-3 w-3" />
                <span className="line-clamp-1">{sketch.categories.join(', ')}</span>
              </div>
            )}

            {sketch.orderable && sketch.price && sketch.currency && (
              <div className="flex items-center gap-1 font-medium text-primary">
                <DollarSign className="h-3 w-3" />
                <span>
                  {sketch.currency === 'USD' && '$'}
                  {sketch.currency === 'EUR' && '€'}
                  {sketch.currency === 'GBP' && '£'}
                  {sketch.currency === 'JPY' && '¥'}
                  {sketch.currency === 'INR' && '₹'}
                  {!['USD', 'EUR', 'GBP', 'JPY', 'INR'].includes(sketch.currency) &&
                    sketch.currency + ' '}
                  {sketch.price.toLocaleString()}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
