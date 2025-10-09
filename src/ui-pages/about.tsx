'use client';

import Image from 'next/image';
import { Instagram, Mail } from 'lucide-react';
import contactData from '@/config/contact.json';
import { ContactForm } from '@/components/ContactForm';

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

      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="mx-auto max-w-3xl space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">Welcome</h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              I&apos;m a hobbyist artist passionate about both digital and traditional art. 
              With a background in computer applications, I blend technical precision with 
              creative expression to bring imagination to life.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl font-bold">Inspiration</h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              My work draws deep inspiration from anime and Japanese culture. I strive to 
              capture the dynamic energy, emotion, and visual poetry that make these art 
              forms so captivating.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl font-bold">Philosophy</h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              For me, art is about passion, exploration, and the joy of creation. As a 
              hobbyist, I have the freedom to experiment and grow, staying true to my 
              vision while continuously developing my craft.
            </p>
          </div>

          <div className="space-y-6 rounded-lg border border-border bg-muted/50 p-8">
            <h2 className="text-3xl font-bold">Connect</h2>
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
              
              <a
                href={`mailto:${contactData.email}`}
                className="flex items-center gap-3 rounded-lg bg-background px-4 py-3 transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <Mail className="h-5 w-5" />
                <span className="font-medium">Email</span>
              </a>
            </div>
          </div>

          <ContactForm />
        </div>
      </section>
    </div>
  );
}
