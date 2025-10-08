'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface MasonryGridProps {
  children: ReactNode;
  className?: string;
}

export function MasonryGrid({ children, className }: MasonryGridProps) {
  return (
    <div
      className={cn(
        'columns-1 gap-4 space-y-4 sm:columns-2 lg:columns-3 xl:columns-4',
        className
      )}
    >
      {children}
    </div>
  );
}
