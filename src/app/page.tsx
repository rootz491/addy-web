import { client } from '@/sanity/lib/client';
import { DIGITAL_ART_QUERY, TRADITIONAL_ART_QUERY } from '@/sanity/lib/queries';
import type { DigitalArt, TraditionalArt } from '@/types/sketch';
import { HomePage } from '@/ui-pages/home';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gallery | Addy',
  description: 'Browse my collection of digital and traditional art, inspired by anime and Japanese culture.',
};

export default async function Page() {
  const [digitalArt, traditionalArt] = await Promise.all([
    client.fetch<DigitalArt[]>(DIGITAL_ART_QUERY),
    client.fetch<TraditionalArt[]>(TRADITIONAL_ART_QUERY),
  ]);

  return <HomePage digitalArt={digitalArt} traditionalArt={traditionalArt} />;
}
