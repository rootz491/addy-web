'use client';

import { useState } from 'react';
import type { DigitalArt, TraditionalArt } from '@/types/sketch';
import { MasonryGrid } from '@/components/MasonryGrid';
import { SketchCard } from '@/components/SketchCard';
import { ImageModal } from '@/components/ImageModal';
import { cn } from '@/lib/utils';

type TabType = 'digital' | 'traditional';

interface HomePageProps {
  digitalArt: DigitalArt[];
  traditionalArt: TraditionalArt[];
}

export function HomePage({ digitalArt, traditionalArt }: HomePageProps) {
  const [activeTab, setActiveTab] = useState<TabType>('digital');
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    sketch: DigitalArt | TraditionalArt | null;
    imageIndex: number;
  }>({
    isOpen: false,
    sketch: null,
    imageIndex: 0,
  });

  const openModal = (sketch: DigitalArt | TraditionalArt, imageIndex = 0) => {
    setModalState({ isOpen: true, sketch, imageIndex });
  };

  const closeModal = () => {
    setModalState({ isOpen: false, sketch: null, imageIndex: 0 });
  };

  const nextImage = () => {
    if (modalState.sketch && modalState.imageIndex < modalState.sketch.images.length - 1) {
      setModalState((prev) => ({ ...prev, imageIndex: prev.imageIndex + 1 }));
    }
  };

  const prevImage = () => {
    if (modalState.sketch && modalState.imageIndex > 0) {
      setModalState((prev) => ({ ...prev, imageIndex: prev.imageIndex - 1 }));
    }
  };

  const currentSketches = activeTab === 'digital' ? digitalArt : traditionalArt;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        {/* Tab Buttons */}
        <div className="mb-8 flex items-center gap-4 border-b border-border">
          <button
            onClick={() => setActiveTab('digital')}
            className={cn(
              'relative pb-4 text-lg font-semibold transition-colors',
              activeTab === 'digital'
                ? 'text-foreground'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            Digital Art
            {activeTab === 'digital' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('traditional')}
            className={cn(
              'relative pb-4 text-lg font-semibold transition-colors',
              activeTab === 'traditional'
                ? 'text-foreground'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            Traditional Art
            {activeTab === 'traditional' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
            )}
          </button>
        </div>

        {/* Gallery Section */}
        <section>
          {currentSketches.length > 0 ? (
            <MasonryGrid>
              {currentSketches.map((sketch) => (
                <SketchCard key={sketch._id} sketch={sketch} onClick={() => openModal(sketch)} />
              ))}
            </MasonryGrid>
          ) : (
            <div className="rounded-lg border border-dashed border-border p-12 text-center">
              <p className="text-muted-foreground">
                No {activeTab === 'digital' ? 'digital' : 'traditional'} art pieces yet
              </p>
            </div>
          )}
        </section>
      </div>

      {/* Image Modal */}
      {modalState.sketch && (
        <ImageModal
          isOpen={modalState.isOpen}
          onClose={closeModal}
          sketch={modalState.sketch}
          currentImageIndex={modalState.imageIndex}
          onNextImage={nextImage}
          onPrevImage={prevImage}
        />
      )}
    </div>
  );
}
