'use client';

import Image from 'next/image';

interface AboutPageProps {
  artistImage?: {
    url: string;
    alt: string;
    lqip: string;
  };
}

export function AboutPage({ artistImage }: AboutPageProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Image */}
      <section className="relative h-[50vh] min-h-[400px] w-full overflow-hidden bg-gradient-to-b from-muted to-background">
        {artistImage ? (
          <Image
            src={artistImage.url}
            alt={artistImage.alt}
            fill
            className="object-cover opacity-40"
            sizes="100vw"
            priority
            placeholder="blur"
            blurDataURL={artistImage.lqip}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-muted to-secondary/20" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        
        {/* Title Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="mb-4 text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl">
              About the Artist
            </h1>
            <p className="text-lg text-muted-foreground md:text-xl">
              Creativity meets passion
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="mx-auto max-w-3xl space-y-8">
          {/* Introduction */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">Welcome to My Creative World</h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              I&apos;m a hobbyist artist with a passion for bringing imagination to life through both
              digital and traditional art. While my professional background lies in computer
              applications, where I earned my degree, my heart has always been drawn to the
              world of visual storytelling and artistic expression.
            </p>
          </div>

          {/* Background */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">The Journey</h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Art has been my companion on the side of my technical career—a way to balance the
              logical world of technology with the boundless freedom of creativity. Each sketch,
              whether crafted digitally on a tablet or with traditional pencils and brushes,
              represents a moment of escape and exploration.
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground">
              My dual background in technology and art allows me to approach creation from
              unique perspectives, blending technical precision with artistic expression. This
              intersection of disciplines continually inspires my work and pushes me to
              experiment with new techniques and styles.
            </p>
          </div>

          {/* Inspiration */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">Inspirations & Style</h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              I draw deep inspiration from anime and Japanese culture, which profoundly
              influences my artistic style. The elegance of Japanese aesthetics, the dynamic
              energy of anime storytelling, and the rich cultural heritage of Japan all find
              their way into my work. From character designs to landscape compositions, these
              influences help shape my unique artistic voice.
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Whether I&apos;m creating detailed character illustrations, atmospheric scenes, or
              experimental pieces, I strive to capture the essence of what makes Japanese art
              and anime so captivating—the perfect balance of emotion, movement, and visual
              poetry.
            </p>
          </div>

          {/* Philosophy */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">My Artistic Philosophy</h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              For me, art is not about perfection—it&apos;s about passion, exploration, and the joy
              of creation. Every piece tells a story, captures a feeling, or explores an idea
              that resonates with me. I believe that art should be accessible and personal,
              which is why I work across both digital and traditional mediums, each offering
              its own unique possibilities and challenges.
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground">
              As a hobbyist, I have the freedom to experiment, make mistakes, and grow without
              the pressure of commercial constraints. This allows me to stay true to my vision
              and continuously develop my craft on my own terms.
            </p>
          </div>

          {/* Closing */}
          <div className="space-y-4 border-t border-border pt-8">
            <h2 className="text-3xl font-bold">Thank You for Visiting</h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Thank you for taking the time to explore my work. Each piece in my gallery
              represents hours of dedication, learning, and love for the craft. I hope my art
              resonates with you and perhaps inspires your own creative journey. Feel free to
              browse through my collections of digital and traditional art, and don&apos;t hesitate
              to reach out if you&apos;d like to connect or discuss potential collaborations.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
