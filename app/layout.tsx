import type { ReactNode } from 'react';
import StoryblokProvider from '@/components/StoryblokProvider';
import './globals.css';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <StoryblokProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </StoryblokProvider>
  );
}
