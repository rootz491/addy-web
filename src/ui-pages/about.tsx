'use client';

import Image from 'next/image';
import { Instagram, Mail } from 'lucide-react';
import contactData from '@/config/contact.json';

// Reddit icon component
const RedditIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
  </svg>
);

const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'instagram':
      return Instagram;
    case 'reddit':
      return RedditIcon;
    default:
      return Mail;
  }
};

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

          {/* Contact Section */}
          <div className="space-y-6 rounded-lg border border-border bg-muted/50 p-8">
            <h2 className="text-3xl font-bold">Get in Touch</h2>
            <p className="text-lg text-muted-foreground">
              Feel free to reach out through any of these platforms. I&apos;d love to hear from you!
            </p>
            
            <div className="flex flex-wrap items-center gap-4">
              {contactData.socials.map((social) => {
                const Icon = getIcon(social.icon);
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-lg bg-background px-4 py-3 transition-colors hover:bg-primary hover:text-primary-foreground"
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{social.name}</span>
                  </a>
                );
              })}
              
              {/* Email */}
              <a
                href={`mailto:${contactData.email}`}
                className="flex items-center gap-3 rounded-lg bg-background px-4 py-3 transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <Mail className="h-5 w-5" />
                <span className="font-medium">Email</span>
              </a>
            </div>
            
            <div className="pt-4">
              <p className="text-sm text-muted-foreground">
                Email: <a href={`mailto:${contactData.email}`} className="text-foreground hover:underline">{contactData.email}</a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
