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
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme') || 'dark';
                  document.documentElement.setAttribute('data-theme', theme);
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body>
        <div className="glow-bg"></div>
        <Header />
        <main style={{ minHeight: "calc(100vh - 72px - 280px)" }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
