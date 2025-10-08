'use client';

import { X, Calendar, Tag, DollarSign } from 'lucide-react';
import Image from 'next/image';
import { useEffect } from 'react';
import type { BaseSketch } from '@/types/sketch';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  sketch: BaseSketch;
  currentImageIndex: number;
  onNextImage: () => void;
  onPrevImage: () => void;
}

export function ImageModal({
  isOpen,
  onClose,
  sketch,
  currentImageIndex,
  onNextImage,
  onPrevImage,
}: ImageModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNextImage();
      if (e.key === 'ArrowLeft') onPrevImage();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, onNextImage, onPrevImage]);

  if (!isOpen) return null;

  const currentImage = sketch.images[currentImageIndex];
  const hasMultipleImages = sketch.images.length > 1;

  // Check if there's any metadata to display
  const hasMetadata =
    sketch.title ||
    sketch.description ||
    sketch.featured ||
    sketch.dateOfCreation ||
    (sketch.categories && sketch.categories.length > 0) ||
    (sketch.orderable && sketch.price && sketch.currency);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Blur backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />

      {/* Modal content */}
      <div
        className="relative z-10 max-h-[90vh] w-full max-w-7xl overflow-y-auto rounded-lg bg-background shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-20 rounded-full bg-background/80 p-2 backdrop-blur-sm transition-colors hover:bg-background"
          aria-label="Close modal"
        >
          <X className="h-6 w-6" />
        </button>

        <div className={`grid gap-6 p-6 ${hasMetadata ? 'md:grid-cols-[2fr_1fr]' : ''}`}>
          {/* Image section */}
          <div className="relative">
            <div className={`relative overflow-hidden rounded-lg bg-muted ${hasMetadata ? 'aspect-square' : 'aspect-[4/3]'}`}>
              <Image
                src={currentImage.asset.url}
                alt={currentImage.alt || sketch.title || 'Sketch'}
                fill
                className="object-contain"
                sizes={hasMetadata ? '(max-width: 768px) 100vw, 66vw' : '(max-width: 768px) 100vw, 90vw'}
                priority
              />
            </div>

            {/* Image navigation */}
            {hasMultipleImages && (
              <div className="mt-4 flex items-center justify-between">
                <button
                  onClick={onPrevImage}
                  disabled={currentImageIndex === 0}
                  className="rounded-md bg-secondary px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary/80 disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="text-sm text-muted-foreground">
                  {currentImageIndex + 1} / {sketch.images.length}
                </span>
                <button
                  onClick={onNextImage}
                  disabled={currentImageIndex === sketch.images.length - 1}
                  className="rounded-md bg-secondary px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary/80 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}

            {/* Thumbnails */}
            {hasMultipleImages && (
              <div className="mt-4 flex gap-2 overflow-x-auto">
                {sketch.images.map((img, idx) => (
                  <button
                    key={img.asset._id}
                    onClick={() => {
                      const diff = idx - currentImageIndex;
                      if (diff > 0) {
                        for (let i = 0; i < diff; i++) onNextImage();
                      } else if (diff < 0) {
                        for (let i = 0; i < Math.abs(diff); i++) onPrevImage();
                      }
                    }}
                    className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border-2 transition-all ${
                      idx === currentImageIndex
                        ? 'border-primary'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <Image
                      src={img.asset.url}
                      alt={img.alt || `Thumbnail ${idx + 1}`}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info section - only show if there's metadata */}
          {hasMetadata && (
            <div className="space-y-6">
              {sketch.title && (
                <div>
                  <h2 className="text-3xl font-bold">{sketch.title}</h2>
                  {sketch.featured && (
                    <span className="mt-2 inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                      ⭐ Featured
                    </span>
                  )}
                </div>
              )}

              {sketch.description && (
                <div>
                  <h3 className="mb-2 font-semibold">Description</h3>
                  <p className="text-muted-foreground">{sketch.description}</p>
                </div>
              )}

              <div className="space-y-3">
                {sketch.dateOfCreation && (
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Created:</span>
                    <span className="text-muted-foreground">
                      {new Date(sketch.dateOfCreation).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                )}

                {sketch.categories && sketch.categories.length > 0 && (
                  <div className="flex items-start gap-2 text-sm">
                    <Tag className="mt-0.5 h-4 w-4 flex-shrink-0 text-muted-foreground" />
                    <div>
                      <span className="font-medium">Categories:</span>
                      <div className="mt-1 flex flex-wrap gap-2">
                        {sketch.categories.map((category) => (
                          <span
                            key={category}
                            className="rounded-md bg-secondary px-2 py-1 text-xs"
                          >
                            {category}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {sketch.orderable && sketch.price && sketch.currency && (
                  <div className="rounded-lg border border-border bg-muted/50 p-4">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Available for purchase
                        </p>
                        <p className="text-2xl font-bold">
                          {sketch.currency === 'USD' && '$'}
                          {sketch.currency === 'EUR' && '€'}
                          {sketch.currency === 'GBP' && '£'}
                          {sketch.currency === 'JPY' && '¥'}
                          {sketch.currency === 'INR' && '₹'}
                          {!['USD', 'EUR', 'GBP', 'JPY', 'INR'].includes(sketch.currency || '') &&
                            sketch.currency + ' '}
                          {sketch.price.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
