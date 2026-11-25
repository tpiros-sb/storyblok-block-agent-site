import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { Bricolage_Grotesque, Geist, Geist_Mono } from 'next/font/google';
import StoryblokProvider from '@/components/StoryblokProvider';
import './globals.css';

const display = Bricolage_Grotesque({ subsets: ['latin'], axes: ['wdth'], variable: '--font-display', display: 'swap' });
const sans = Geist({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
const mono = Geist_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' });

const SITE_NAME = 'JoyConf Amsterdam';
const TICKER = ['Two days of frontend', 'Talks', 'Workshops', 'Lightning talks', 'Panels', SITE_NAME];

export const metadata: Metadata = {
  title: SITE_NAME,
  description: 'Talks, speakers and schedule for a two-day frontend conference.',
};

export const viewport: Viewport = {
  colorScheme: 'light',
};

function TickerItems() {
  return TICKER.map((item) => <span key={item}>{item}</span>);
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <StoryblokProvider>
      <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
        <body>
          <a className="skip-link" href="#content">
            Skip to content
          </a>
          <header className="site-header">
            <a className="site-mark" href="/">
              {SITE_NAME}
            </a>
            <div className="ticker">
              <p className="ticker-track">
                <span className="ticker-set">
                  <TickerItems />
                </span>
                <span className="ticker-set" aria-hidden="true">
                  <TickerItems />
                </span>
              </p>
            </div>
            <label className="ticker-pause">
              <input type="checkbox" />
              <span className="visually-hidden">Pause the ticker</span>
            </label>
          </header>
          <div className="site-main" id="content">
            {children}
          </div>
          <footer className="site-footer">
            <p>A demo site for a fictional conference. Every page is rendered from Storyblok content.</p>
          </footer>
        </body>
      </html>
    </StoryblokProvider>
  );
}
