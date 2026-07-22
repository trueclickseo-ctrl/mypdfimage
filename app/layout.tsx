import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "My PDF Image - Free Online PDF & Image Tools Suite",
  description: "Resize, compress, merge, convert, and edit PDFs and images directly in your browser. Experience secure, lightning-fast tools powered by local web engines.",
  keywords: "pdf merge, split pdf, compress image, resize image, increase image size, photo resizer, ssc photo resizer, image to pdf, pdf to word, image kb converter",
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/logo_icon.jpg",
    shortcut: "/logo_icon.jpg",
    apple: "/logo_icon.jpg",
  },
  alternates: {
    canonical: "https://www.mypdfimage.com",
  },
  verification: {
    google: "YOUR_GOOGLE_VERIFICATION_TOKEN",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
        <head>
          {/* Google Tag Manager */}
          <script dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-WVQX3PHN');`
          }} />
          {/* End Google Tag Manager */}
          {/* Google tag (gtag.js) */}
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-6ZGPC07G2G"></script>
          <script dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-6ZGPC07G2G');
            `
          }} />
          {/* Font preloads */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap" rel="stylesheet" />
          {/* WebSite schema for SEO */}
          <script type="application/ld+json" dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "My PDF Image",
              "url": "https://www.mypdfimage.com",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://www.mypdfimage.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }} />
          <script id="theme-script" dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme')||'light';document.documentElement.setAttribute('data-theme',t)}catch(e){}})();`,
          }} />
        </head>
        <body suppressHydrationWarning>
          {/* Google Tag Manager (noscript) */}
          <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WVQX3PHN"
          height="0" width="0" style={{ display: 'none', visibility: 'hidden' }}></iframe></noscript>
          {/* End Google Tag Manager (noscript) */}
          <div className="glow-bg" suppressHydrationWarning></div>
          <Header />
          <main style={{ minHeight: "calc(100vh - 72px - 280px)" }} suppressHydrationWarning>{children}</main>
          <Footer />
        </body>
    </html>
  );
}
