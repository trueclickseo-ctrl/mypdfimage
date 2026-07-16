import React from "react";
import Link from "next/link";
import { FileText } from "lucide-react";

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div className="container" style={styles.container}>
        <div style={styles.topSection}>
          <div style={styles.linksGrid}>
            <div style={styles.linksCol}>
              <h4 style={styles.colTitle}>Popular Tools</h4>
              <Link href="/tools/merge-pdf" style={styles.link}>Merge PDF</Link>
              <Link href="/tools/split-pdf" style={styles.link}>Split PDF</Link>
              <Link href="/tools/compress-pdf" style={styles.link}>Compress PDF</Link>

              <Link href="/tools/esign-pdf" style={styles.link}>eSign PDF</Link>
              <Link href="/tools/watermark-pdf" style={styles.link}>Watermark PDF</Link>
              <Link href="/tools/page-numbers" style={styles.link}>Add Page Numbers</Link>
              <Link href="/tools/legal-doc-comparison" style={styles.link}>Legal Comparison</Link>
            </div>
            
            <div style={styles.linksCol}>
              <h4 style={styles.colTitle}>Conversions</h4>
              <Link href="/tools/pdf-to-jpg" style={styles.link}>PDF to JPG</Link>
              <Link href="/tools/jpg-to-pdf" style={styles.link}>JPG to PDF</Link>
              <Link href="/tools/image-to-pdf" style={styles.link}>Image to PDF</Link>
              <Link href="/tools/word-to-pdf" style={styles.link}>Word to PDF</Link>
              <Link href="/tools/pdf-to-word" style={styles.link}>PDF to Word</Link>
              <Link href="/tools/pdf-to-excel" style={styles.link}>PDF to Excel</Link>
              <Link href="/tools/invoice-to-excel" style={styles.link}>Invoice to Excel</Link>
              <Link href="/tools/bank-statement-to-excel" style={styles.link}>Bank Statement to Excel</Link>
            </div>

            <div style={styles.linksCol}>
              <h4 style={styles.colTitle}>Security</h4>
              <Link href="/tools/lock-pdf" style={styles.link}>Lock PDF</Link>
              <Link href="/tools/unlock-pdf" style={styles.link}>Unlock PDF</Link>

            </div>
            
            <div style={styles.linksCol}>
              <h4 style={styles.colTitle}>Image Tools</h4>
              <Link href="/tools/resize-pixel" style={styles.link}>Resize Image Pixels</Link>
              <Link href="/tools/resize-image-to-20kb" style={styles.link}>Resize Image to 20KB</Link>
              <Link href="/tools/resize-image-to-50kb" style={styles.link}>Resize Image to 50KB</Link>
              <Link href="/tools/resize-image-to-100kb" style={styles.link}>Resize Image to 100KB</Link>
              <Link href="/tools/increase-image-size" style={styles.link}>Increase Image Size</Link>
              <Link href="/tools/kb-converter" style={styles.link}>Image KB Converter</Link>
              <Link href="/tools/ssc-photo-resizer" style={styles.link}>SSC Photo Resizer</Link>
              <Link href="/tools/ssc-signature-resizer" style={styles.link}>SSC Signature Resizer</Link>
              <Link href="/tools/sbi-po-signature-resizer" style={styles.link}>SBI PO Signature Resizer</Link>
              <Link href="/tools/tnpsc-signature-compressor" style={styles.link}>TNPSC Signature Resizer</Link>
            </div>
            
            <div style={styles.linksCol}>
              <h4 style={styles.colTitle}>Legal & Contact</h4>
              <Link href="/about" style={styles.link}>About Us</Link>
              <Link href="/privacy" style={styles.link}>Privacy Policy</Link>
              <Link href="/terms" style={styles.link}>Terms of Service</Link>
              <Link href="/security" style={styles.link}>Security Info</Link>
              <Link href="/tools/pdf-extraction-api" style={styles.link}>Developer API Key</Link>
              <Link href="/contact" style={styles.link}>Contact Us</Link>
            </div>
          </div>
        </div>
        
        <div style={styles.bottomSection}>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", alignItems: "center", width: "100%" }}>
            <Link href="/" style={styles.logo}>
              <img 
                src="/logo_icon.jpg" 
                alt="My PDF Image" 
                style={{ width: "24px", height: "24px", borderRadius: "6px" }} 
              />
              <span style={styles.logoText}>My PDF <span style={styles.logoAccent}>Image</span></span>
            </Link>
            <p style={{ ...styles.tagline, maxWidth: "600px", fontSize: "13px", color: "var(--text-tertiary)", margin: "0 auto", textAlign: "center" }}>
              Secure, fast, and local PDF & image tool suites designed with privacy first. Optimize, convert, resize, split, and merge documents directly in your browser.
            </p>
            <p style={styles.copyright}>
              © {new Date().getFullYear()} My PDF Image. All server-rendered operations delete uploads automatically after 1 hour. All client-side tools run fully local in-browser.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  footer: {
    borderTop: "1px solid var(--border-color)",
    background: "var(--bg-secondary)",
    padding: "64px 0 32px 0",
    transition: "background-color var(--transition-normal), border-color var(--transition-normal)",
    marginTop: "auto",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "48px",
  },
  topSection: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: "40px",
    width: "100%",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    textDecoration: "none",
  },
  logoIcon: {
    background: "linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)",
    borderRadius: "6px",
    width: "26px",
    height: "26px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  logoText: {
    fontSize: "18px",
    fontWeight: "800",
    color: "var(--text-primary)",
  },
  logoAccent: {
    background: "linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  tagline: {
    fontSize: "14px",
    maxWidth: "360px",
    color: "var(--text-secondary)",
  },
  linksGrid: {
    flex: "1 1 100%",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "32px",
  },
  linksCol: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  colTitle: {
    fontSize: "14px",
    fontWeight: "700",
    color: "var(--text-primary)",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    marginBottom: "4px",
  },
  link: {
    fontSize: "14px",
    color: "var(--text-secondary)",
    transition: "color var(--transition-fast)",
    cursor: "pointer",
  },
  bottomSection: {
    borderTop: "1px solid var(--border-color)",
    paddingTop: "24px",
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    width: "100%",
  },
  copyright: {
    fontSize: "13px",
    color: "var(--text-tertiary)",
    marginTop: "4px",
  },
};
