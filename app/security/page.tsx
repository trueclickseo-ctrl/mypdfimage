import React from "react";
import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Security & Compliance - PDFVerse AI",
  description: "Read about our SOC2 security posture, AES encryption standards, and browser-only parsing guidelines.",
};

export default function SecurityPage() {
  return (
    <div style={styles.page}>
      <div className="container" style={styles.container}>
        <Link href="/" style={styles.backLink}>
          <ArrowLeft size={16} />
          <span>Back to Home</span>
        </Link>

        <div style={styles.header}>
          <div style={styles.iconWrapper}>
            <ShieldCheck size={24} />
          </div>
          <h1 style={styles.title}>Security & Compliance</h1>
          <p style={styles.subtitle}>Document security, SOC2 audit trails, and zero-trust guidelines.</p>
        </div>

        <div style={styles.card} className="glass-card">
          <h2>1. Zero-Trust Local Architecture</h2>
          <p style={styles.paragraph}>
            PDFVerse is built on a zero-trust model for file contents. By compiling PDFs and parsing OCR scripts directly inside your browser sandbox (WebAssembly workers), we ensure that your raw document buffers never reach our servers or external logs.
          </p>

          <h2>2. Data Encryption Posture</h2>
          <p style={styles.paragraph}>
            All client-server communications are encrypted in transit using standard Transport Layer Security (TLS 1.3). Developer API credentials are encrypted at rest using AES-256 blocks inside the application stores.
          </p>

          <h2>3. Immutability Auditing (SOC2 compliance)</h2>
          <p style={styles.paragraph}>
            To facilitate company SOC2 compliance audits, our platform records system access events, API validations, and administrative actions to secure digital signatures. These logs are stored in `/logs/audit.log` and are queryable via authorized workspace developer panels.
          </p>
        </div>
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  page: {
    padding: "60px 0 80px 0",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "32px",
    maxWidth: "800px",
    margin: "0 auto",
  },
  backLink: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "14px",
    color: "var(--text-secondary)",
  },
  header: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  iconWrapper: {
    width: "48px",
    height: "48px",
    borderRadius: "12px",
    background: "rgba(79, 70, 229, 0.1)",
    border: "1px solid rgba(79, 70, 229, 0.2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "var(--accent-primary)",
  },
  title: {
    fontSize: "36px",
    fontWeight: "800",
  },
  subtitle: {
    color: "var(--text-secondary)",
    fontSize: "15px",
  },
  card: {
    padding: "40px",
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },
  paragraph: {
    fontSize: "15px",
    lineHeight: "1.7",
    color: "var(--text-secondary)",
  }
};
