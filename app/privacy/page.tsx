import React from "react";
import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";

export const metadata = {
  title: "Privacy Policy - PDFVerse AI",
  description: "Learn how we process your documents safely in your browser without uploading files to remote servers.",
};

export default function PrivacyPage() {
  return (
    <div style={styles.page}>
      <div className="container" style={styles.container}>
        <Link href="/" style={styles.backLink}>
          <ArrowLeft size={16} />
          <span>Back to Home</span>
        </Link>

        <div style={styles.header}>
          <div style={styles.iconWrapper}>
            <Shield size={24} />
          </div>
          <h1 style={styles.title}>Privacy Policy</h1>
          <p style={styles.subtitle}>Effective Date: July 15, 2026. Your privacy and file confidentiality are our top priorities.</p>
        </div>

        <div style={styles.card} className="glass-card">
          <h2>1. Local In-Browser Processing</h2>
          <p style={styles.paragraph}>
            Unlike traditional PDF tools that upload your sensitive documents to cloud servers, PDFVerse processes files directly in your web browser utilizing WebAssembly and client-side JavaScript execution (such as `pdf-lib` and local Tesseract cores). Your documents never leave your local computer.
          </p>

          <h2>2. Data Collection & Analytics</h2>
          <p style={styles.paragraph}>
            We do not collect, store, or sell any of your document content, text annotations, signatures, or metadata. Our server route logs track simple operational statistics (e.g. active API calls and rate-limiting metrics) to ensure application stability and security compliance.
          </p>

          <h2>3. Cookies & Storage</h2>
          <p style={styles.paragraph}>
            We use browser local storage to save user preferences, active visual theme configurations (Dark/Light mode), and mock Pro subscription statuses. No tracking or advertising cookies are utilized.
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
