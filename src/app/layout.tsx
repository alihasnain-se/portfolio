import type { Metadata, Viewport } from "next";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { portfolio } from "@/data/portfolio";
import "./globals.css";

// Runs before first paint: restores the saved theme.
const initScript = `(function(){var d=document.documentElement;try{var t=localStorage.getItem('theme');if(t==='dark'||t==='light')d.setAttribute('data-theme',t)}catch(e){}})();`;

const title = `${portfolio.name} — ${portfolio.title}`;
const description =
  "Portfolio of Ali Hasnain, a Software Engineering graduate specialising in Flutter and full-stack development, QA, AI/NLP and networking. Featured: Design & Build Hub.";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: portfolio.name,
  jobTitle: portfolio.title,
  url: portfolio.siteUrl,
  email: portfolio.email,
  alumniOf: { "@type": "CollegeOrUniversity", name: portfolio.education.institution },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Sargodha",
    addressRegion: "Punjab",
    addressCountry: "PK",
  },
  sameAs: portfolio.contacts.filter((c) => c.id === "github" || c.id === "linkedin").map((c) => c.href),
};

export const metadata: Metadata = {
  metadataBase: new URL(portfolio.siteUrl),
  title: { default: title, template: `%s | ${portfolio.name}` },
  description,
  authors: [{ name: portfolio.name }],
  openGraph: {
    title,
    description,
    type: "website",
    url: portfolio.siteUrl,
    locale: "en_US",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: title }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/og-image.jpg"] },
  alternates: { canonical: "/" },
  icons: { icon: [{ url: "/logo.svg", type: "image/svg+xml" }, { url: "/favicon.ico" }], apple: "/apple-touch-icon.png" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
    { media: "(prefers-color-scheme: light)", color: "#f6f8fc" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: initScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only z-[100] rounded-lg bg-accent px-4 py-2 font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
