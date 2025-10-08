'use client';

import { useState } from 'react';
import type { DigitalArt, TraditionalArt } from '@/types/sketch';
import { MasonryGrid } from '@/components/MasonryGrid';
import { SketchCard } from '@/components/SketchCard';
import { ImageModal } from '@/components/ImageModal';

interface HomePageProps {
  digitalArt: DigitalArt[];
  traditionalArt: TraditionalArt[];
}

export function HomePage({ digitalArt, traditionalArt }: HomePageProps) {
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

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto space-y-16 px-4 py-12">
        {/* Digital Art Section */}
        <section>
          <div className="mb-8">
            <h2 className="mb-2 text-3xl font-bold">Digital Art</h2>
          </div>

          {digitalArt.length > 0 ? (
            <MasonryGrid>
              {digitalArt.map((sketch) => (
                <SketchCard key={sketch._id} sketch={sketch} onClick={() => openModal(sketch)} />
              ))}
            </MasonryGrid>
          ) : (
            <div className="rounded-lg border border-dashed border-border p-12 text-center">
              <p className="text-muted-foreground">No digital art pieces yet</p>
            </div>
          )}
        </section>

        {/* Traditional Art Section */}
        <section>
          <div className="mb-8">
            <h2 className="mb-2 text-3xl font-bold">Traditional Art</h2>
          </div>

          {traditionalArt.length > 0 ? (
            <MasonryGrid>
              {traditionalArt.map((sketch) => (
                <SketchCard key={sketch._id} sketch={sketch} onClick={() => openModal(sketch)} />
              ))}
            </MasonryGrid>
          ) : (
            <div className="rounded-lg border border-dashed border-border p-12 text-center">
              <p className="text-muted-foreground">No traditional art pieces yet</p>
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
