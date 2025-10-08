import { AboutPage } from '@/ui-pages/about';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About the Artist | Addy',
  description: 'Learn about the artist behind the sketches - a hobbyist with a passion for anime-inspired art and Japanese culture.',
};

export default function Page() {
  return <AboutPage />;
}
