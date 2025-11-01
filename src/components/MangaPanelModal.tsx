"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import Image from "next/image";
import type { Sketch } from "@/types/sketch";

interface MangaPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
  sketch: Sketch;
}

export function MangaPanelModal({
  isOpen,
  onClose,
  sketch,
}: MangaPanelModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />

      <div
        className="relative z-10 max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-lg bg-background shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="sticky right-4 top-4 z-20 ml-auto mr-4 mt-4 block rounded-full bg-background/80 p-2 backdrop-blur-sm transition-colors hover:bg-background"
          aria-label="Close modal"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="space-y-4 p-4 pt-0">
          {sketch.images.map((image, idx) => (
            <div key={image.asset._id} className="relative w-full">
              <div className="relative overflow-hidden rounded-lg bg-muted">
                <Image
                  src={image.asset.url}
                  alt={image.alt || `Manga panel - Image ${idx + 1}`}
                  width={image.asset.metadata.dimensions.width}
                  height={image.asset.metadata.dimensions.height}
                  className="h-auto w-full"
                  sizes="(max-width: 768px) 100vw, 896px"
                  priority={idx === 0}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
