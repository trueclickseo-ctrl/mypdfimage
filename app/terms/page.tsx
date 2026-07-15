import React from "react";
import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";

export const metadata = {
  title: "Terms of Service - PDFVerse AI",
  description: "Read the PDFVerse terms of service, usage guidelines, and mock billing details.",
};

export default function TermsPage() {
  return (
    <div style={styles.page}>
      <div className="container" style={styles.container}>
        <Link href="/" style={styles.backLink}>
          <ArrowLeft size={16} />
          <span>Back to Home</span>
        </Link>

        <div style={styles.header}>
          <div style={styles.iconWrapper}>
            <FileText size={24} />
          </div>
          <h1 style={styles.title}>Terms of Service</h1>
          <p style={styles.subtitle}>Effective Date: July 15, 2026. General terms governing use of PDFVerse.</p>
        </div>

        <div style={styles.card} className="glass-card">
          <h2>1. Terms Acceptance</h2>
          <p style={styles.paragraph}>
            By accessing PDFVerse, you agree to comply with our terms, operational guidelines, and safety standards. If you are using these tools on behalf of a team, you accept these terms for the workspace group.
          </p>

          <h2>2. Service Scope & local Limits</h2>
          <p style={styles.paragraph}>
            We offer local in-browser document compilation utilities and AI-assisted analysis tools. Standard free accounts are limited to processing 5 files daily. Upgrading to a premium tier removes all conversion limits.
          </p>

          <h2>3. Usage & Developer Keys</h2>
          <p style={styles.paragraph}>
            You may utilize developer API keys to integrate PDFVerse engines into your services. You are responsible for maintaining key confidentiality, preventing unauthorized abuse, and respecting the rate limits of 60 calls per minute.
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
