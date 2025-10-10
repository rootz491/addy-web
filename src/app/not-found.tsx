import Link from "next/link";
import { ArrowLeft, Palette } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center max-w-md mx-auto">
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <Palette className="w-24 h-24 text-primary/30" />
            <div className="absolute inset-0 animate-pulse">
              <Palette className="w-24 h-24 text-primary/60" />
            </div>
          </div>
        </div>

        <h1 className="text-6xl font-bold text-foreground mb-4">404</h1>

        <h2 className="text-2xl font-semibold text-foreground mb-4">
          Art Not Found
        </h2>

        <p className="text-muted-foreground mb-8 leading-relaxed">
          The masterpiece you&apos;re looking for has wandered off the canvas.
          Let&apos;s get you back to the gallery.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-200 font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Return to Gallery
        </Link>

        <div className="mt-12 text-xs text-muted-foreground/60">
          Lost in the digital realm
        </div>
      </div>
    </div>
  );
}
