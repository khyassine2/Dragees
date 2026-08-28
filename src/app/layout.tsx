import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Jost, Pinyon_Script } from 'next/font/google';
import { Footer } from '@/components/Footer';
import { SiteChrome } from '@/components/SiteChrome';
import '@/app/globals.css';

const display = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-display-loaded',
  display: 'swap',
});

const script = Pinyon_Script({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-script-loaded',
  display: 'swap',
});

const sans = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-sans-loaded',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://dragees-fiancailles.ma'),
  title: {
    default: 'Dragées & Fiançailles — Buffet, décoration, Maroc',
    template: '%s — Dragées & Fiançailles',
  },
  description:
    'Dragées, buffet et décoration pour vos fiançailles et mariages au Maroc. Élégance, raffinement et détails parfaits. Devis gratuit sous 48 h.',
  openGraph: {
    type: 'website',
    locale: 'fr_MA',
    siteName: 'Dragées & Fiançailles',
  },
};

export const viewport: Viewport = {
  themeColor: '#fbf7f3',
};

const RootLayout = (props: { children: React.ReactNode }) => (
  <html
    lang="fr"
    // The inline script strips `no-js` before hydration, so the class list
    // legitimately differs from what the server rendered.
    suppressHydrationWarning
    className={`no-js ${display.variable} ${script.variable} ${sans.variable}`}
  >
    <head>
      {/*
        Runs before first paint: with scripting available the reveal styles
        stay in charge, and the class survives only when JS is unavailable.
      */}
      <script
        dangerouslySetInnerHTML={{
          __html: 'document.documentElement.classList.remove("no-js")',
        }}
      />
    </head>
    <body>
      <a className="skip-link" href="#main">
        Aller au contenu
      </a>
      <SiteChrome>{props.children}</SiteChrome>
      <Footer />
    </body>
  </html>
);

export default RootLayout;
