"use client";

import { useState, useEffect, useCallback } from "react";
import type { DigitalArt, TraditionalArt, MangaPanel } from "@/types/sketch";
import { MasonryGrid } from "@/components/MasonryGrid";
import { SketchCard } from "@/components/SketchCard";
import { ImageModal } from "@/components/ImageModal";
import { cn } from "@/lib/utils";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { client } from "@/sanity/lib/client";
import {
  DIGITAL_ART_PAGINATED_QUERY,
  TRADITIONAL_ART_PAGINATED_QUERY,
  MANGA_PANEL_PAGINATED_QUERY,
  DIGITAL_ART_COUNT_QUERY,
  TRADITIONAL_ART_COUNT_QUERY,
  MANGA_PANEL_COUNT_QUERY,
} from "@/sanity/lib/queries";

type TabType = "digital" | "traditional" | "manga";

interface HomePageProps {
  initialDigitalArt: DigitalArt[];
  initialTraditionalArt: TraditionalArt[];
  initialMangaPanels: MangaPanel[];
}

interface PaginationState {
  digital: {
    items: DigitalArt[];
    page: number;
    hasMore: boolean;
    isLoading: boolean;
    total: number;
  };
  traditional: {
    items: TraditionalArt[];
    page: number;
    hasMore: boolean;
    isLoading: boolean;
    total: number;
  };
  manga: {
    items: MangaPanel[];
    page: number;
    hasMore: boolean;
    isLoading: boolean;
    total: number;
  };
}

const ITEMS_PER_PAGE = 12;

export function HomePage({
  initialDigitalArt,
  initialTraditionalArt,
  initialMangaPanels,
}: HomePageProps) {
  const [activeTab, setActiveTab] = useState<TabType>("digital");
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    sketch: DigitalArt | TraditionalArt | MangaPanel | null;
    imageIndex: number;
  }>({
    isOpen: false,
    sketch: null,
    imageIndex: 0,
  });

  const [paginationState, setPaginationState] = useState<PaginationState>({
    digital: {
      items: initialDigitalArt,
      page: 0,
      hasMore: initialDigitalArt.length === ITEMS_PER_PAGE,
      isLoading: false,
      total: 0,
    },
    traditional: {
      items: initialTraditionalArt,
      page: 0,
      hasMore: initialTraditionalArt.length === ITEMS_PER_PAGE,
      isLoading: false,
      total: 0,
    },
    manga: {
      items: initialMangaPanels,
      page: 0,
      hasMore: initialMangaPanels.length === ITEMS_PER_PAGE,
      isLoading: false,
      total: 0,
    },
  });

  useEffect(() => {
    const fetchCounts = async () => {
      const [digitalCount, traditionalCount, mangaCount] = await Promise.all([
        client.fetch(DIGITAL_ART_COUNT_QUERY),
        client.fetch(TRADITIONAL_ART_COUNT_QUERY),
        client.fetch(MANGA_PANEL_COUNT_QUERY),
      ]);

      setPaginationState((prev) => ({
        ...prev,
        digital: {
          ...prev.digital,
          total: digitalCount,
          hasMore: prev.digital.items.length < digitalCount,
        },
        traditional: {
          ...prev.traditional,
          total: traditionalCount,
          hasMore: prev.traditional.items.length < traditionalCount,
        },
        manga: {
          ...prev.manga,
          total: mangaCount,
          hasMore: prev.manga.items.length < mangaCount,
        },
      }));
    };

    fetchCounts();
  }, [
    initialDigitalArt.length,
    initialTraditionalArt.length,
    initialMangaPanels.length,
  ]);

  const loadMoreItems = useCallback(async () => {
    const currentState = paginationState[activeTab];
    if (currentState.isLoading || !currentState.hasMore) return;

    setPaginationState((prev) => ({
      ...prev,
      [activeTab]: {
        ...prev[activeTab],
        isLoading: true,
      },
    }));

    try {
      const nextPage = currentState.page + 1;
      const start = nextPage * ITEMS_PER_PAGE;

      const query =
        activeTab === "digital"
          ? DIGITAL_ART_PAGINATED_QUERY
          : activeTab === "traditional"
            ? TRADITIONAL_ART_PAGINATED_QUERY
            : MANGA_PANEL_PAGINATED_QUERY;

      const newItems = await client.fetch(query, {
        start,
        limit: ITEMS_PER_PAGE,
      });

      setPaginationState((prev) => ({
        ...prev,
        [activeTab]: {
          ...prev[activeTab],
          items: [...prev[activeTab].items, ...newItems],
          page: nextPage,
          hasMore:
            newItems.length === ITEMS_PER_PAGE &&
            prev[activeTab].items.length + newItems.length <
              prev[activeTab].total,
          isLoading: false,
        },
      }));
    } catch {
      setPaginationState((prev) => ({
        ...prev,
        [activeTab]: {
          ...prev[activeTab],
          isLoading: false,
        },
      }));
    }
  }, [activeTab, paginationState]);

  const currentState = paginationState[activeTab];

  useInfiniteScroll({
    hasNextPage: currentState.hasMore,
    isLoading: currentState.isLoading,
    onLoadMore: loadMoreItems,
  });

  const openModal = (
    sketch: DigitalArt | TraditionalArt | MangaPanel,
    imageIndex = 0
  ) => {
    setModalState({ isOpen: true, sketch, imageIndex });
  };

  const closeModal = () => {
    setModalState({ isOpen: false, sketch: null, imageIndex: 0 });
  };

  const nextImage = () => {
    if (
      modalState.sketch &&
      modalState.imageIndex < modalState.sketch.images.length - 1
    ) {
      setModalState((prev) => ({ ...prev, imageIndex: prev.imageIndex + 1 }));
    }
  };

  const prevImage = () => {
    if (modalState.sketch && modalState.imageIndex > 0) {
      setModalState((prev) => ({ ...prev, imageIndex: prev.imageIndex - 1 }));
    }
  };

  const currentSketches = currentState.items.filter(
    (sketch: DigitalArt | TraditionalArt | MangaPanel) =>
      sketch.images && sketch.images.length > 0 && sketch.images[0]?.asset
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12 flex justify-center">
          <div className="inline-flex items-center gap-8 border-b-2 border-border">
            <button
              onClick={() => setActiveTab("digital")}
              className={cn(
                "relative pb-3 text-2xl font-bold transition-colors",
                activeTab === "digital"
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Digital Art
              {activeTab === "digital" && (
                <span className="absolute bottom-0 left-0 right-0 h-1 bg-foreground" />
              )}
            </button>

            <button
              onClick={() => setActiveTab("traditional")}
              className={cn(
                "relative pb-3 text-2xl font-bold transition-colors",
                activeTab === "traditional"
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Traditional Art
              {activeTab === "traditional" && (
                <span className="absolute bottom-0 left-0 right-0 h-1 bg-foreground" />
              )}
            </button>

            <button
              onClick={() => setActiveTab("manga")}
              className={cn(
                "relative pb-3 text-2xl font-bold transition-colors",
                activeTab === "manga"
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Manga Panels
              {activeTab === "manga" && (
                <span className="absolute bottom-0 left-0 right-0 h-1 bg-foreground" />
              )}
            </button>
          </div>
        </div>

        <section>
          {currentSketches.length > 0 ? (
            <>
              <MasonryGrid>
                {currentSketches.map((sketch) => (
                  <SketchCard
                    key={sketch._id}
                    sketch={sketch}
                    onClick={() => openModal(sketch)}
                  />
                ))}
              </MasonryGrid>
              {currentState.isLoading && (
                <div className="mt-8 flex justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-2 border-foreground border-t-transparent"></div>
                </div>
              )}
            </>
          ) : (
            <div className="rounded-lg border border-dashed border-border p-12 text-center">
              <p className="text-muted-foreground">
                No{" "}
                {activeTab === "digital"
                  ? "digital"
                  : activeTab === "traditional"
                    ? "traditional"
                    : "manga"}{" "}
                art pieces yet
              </p>
            </div>
          )}
        </section>
      </div>

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
