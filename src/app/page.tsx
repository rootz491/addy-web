import { client } from "@/sanity/lib/client";
import {
  DIGITAL_ART_PAGINATED_QUERY,
  TRADITIONAL_ART_PAGINATED_QUERY,
  MANGA_PANEL_PAGINATED_QUERY,
} from "@/sanity/lib/queries";
import type { DigitalArt, TraditionalArt, MangaPanel } from "@/types/sketch";
import { HomePage } from "@/ui-pages/home";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery | Addy",
  description:
    "Browse my collection of digital and traditional art, inspired by anime and Japanese culture.",
};

const ITEMS_PER_PAGE = 12;

export default async function Page() {
  const [initialDigitalArt, initialTraditionalArt, initialMangaPanels] =
    await Promise.all([
      client.fetch<DigitalArt[]>(DIGITAL_ART_PAGINATED_QUERY, {
        start: 0,
        limit: ITEMS_PER_PAGE,
      }),
      client.fetch<TraditionalArt[]>(TRADITIONAL_ART_PAGINATED_QUERY, {
        start: 0,
        limit: ITEMS_PER_PAGE,
      }),
      client.fetch<MangaPanel[]>(MANGA_PANEL_PAGINATED_QUERY, {
        start: 0,
        limit: ITEMS_PER_PAGE,
      }),
    ]);

  return (
    <HomePage
      initialDigitalArt={initialDigitalArt}
      initialTraditionalArt={initialTraditionalArt}
      initialMangaPanels={initialMangaPanels}
    />
  );
}

export const revalidate = 60;
