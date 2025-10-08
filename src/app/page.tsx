import { client } from '@/sanity/lib/client';
import { DIGITAL_ART_QUERY, TRADITIONAL_ART_QUERY } from '@/sanity/lib/queries';
import type { DigitalArt, TraditionalArt } from '@/types/sketch';
import { HomePage } from '@/ui-pages/home';

export default async function Page() {
  const [digitalArt, traditionalArt] = await Promise.all([
    client.fetch<DigitalArt[]>(DIGITAL_ART_QUERY),
    client.fetch<TraditionalArt[]>(TRADITIONAL_ART_QUERY),
  ]);

  return <HomePage digitalArt={digitalArt} traditionalArt={traditionalArt} />;
}
