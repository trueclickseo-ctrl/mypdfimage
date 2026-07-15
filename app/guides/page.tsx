import React from "react";
import Link from "next/link";
import { BookOpen, Calendar, User, ArrowRight, FileText, Sparkles, ShieldAlert } from "lucide-react";

interface GuideArticle {
  slug: string;
  title: string;
  description: string;
  category: "organization" | "optimize" | "security" | "conversion";
  readTime: string;
  date: string;
}

export const metadata = {
  title: "PDF guides and manuals Hub - PDFVerse AI",
  description: "Learn how to optimize, convert, split, merge, and password protect PDF files locally with high security and privacy.",
};

const guideArticles: GuideArticle[] = [
  {
    slug: "how-to-merge-pdfs-locally",
    title: "How to Merge PDF Files Locally without Internet",
    description: "Learn how to securely combine multiple PDF documents into one single file directly in your web browser. Ensure 100% data confidentiality.",
    category: "organization",
    readTime: "4 min read",
    date: "2026-07-01"
  },
  {
    slug: "extract-text-scanned-pdf-ocr",
    title: "OCR Guide: Extract text from scanned documents locally",
    description: "Step-by-step tutorial on using local WebAssembly Tesseract engines to read text content from scans and images without cloud servers.",
    category: "optimize",
    readTime: "6 min read",
    date: "2026-07-05"
  },
  {
    slug: "pdf-password-encryption-guide",
    title: "Ultimate Guide to PDF Password Encryption and Decryption",
    description: "Understand standard PDF encryption properties, Owner vs. User passwords, and how to safely lock or unlock documents offline.",
    category: "security",
    readTime: "5 min read",
    date: "2026-07-10"
  },
  {
    slug: "converting-pdf-tables-to-excel",
    title: "Converting PDF Tables to Editable Excel Spreadsheets",
    description: "Learn how column alignments are processed and how to cleanly extract rows from PDF reports directly into XLSX workbooks.",
    category: "conversion",
    readTime: "4 min read",
    date: "2026-07-12"
  }
];

export default function GuidesIndex() {
  return (
    <div style={styles.page}>
      <div className="container" style={styles.container}>
        <div style={styles.header}>
          <div style={styles.pill}>
            <BookOpen size={14} style={{ color: "var(--accent-secondary)" }} />
            <span>Productivity Guides & Guides Hub</span>
          </div>
          <h1 style={styles.title}>PDF Guides & Resources</h1>
          <p style={styles.subtitle}>Learn advanced tips and best practices for document editing, conversions, and local security compliance.</p>
        </div>

        <div style={styles.grid}>
          {guideArticles.map((article) => (
            <Link 
              key={article.slug} 
              href={`/guides/${article.slug}`} 
              className="glass-card" 
              style={styles.card}
            >
              <div style={styles.cardMeta}>
                <span style={styles.categoryBadge}>{article.category.toUpperCase()}</span>
                <span style={styles.metaText}>{article.readTime}</span>
              </div>
              <h3 style={styles.cardTitle}>{article.title}</h3>
              <p style={styles.cardDesc}>{article.description}</p>
              
              <div style={styles.cardFooter}>
                <span style={styles.date}>
                  <Calendar size={12} style={{ marginRight: "4px" }} />
                  {article.date}
                </span>
                <span style={styles.readMore}>
                  Read Article
                  <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          ))}
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
    gap: "48px",
  },
  header: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    gap: "12px",
    maxWidth: "700px",
    margin: "0 auto",
  },
  pill: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    background: "var(--bg-tertiary)",
    border: "1px solid var(--border-color)",
    padding: "6px 16px",
    borderRadius: "100px",
    fontSize: "13px",
    fontWeight: "600",
    color: "var(--text-secondary)",
  },
  title: {
    fontSize: "40px",
    fontWeight: "800",
  },
  subtitle: {
    color: "var(--text-secondary)",
    fontSize: "16px",
    lineHeight: "1.6",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
    gap: "32px",
  },
  card: {
    padding: "32px",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    height: "100%",
  },
  cardMeta: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  categoryBadge: {
    background: "rgba(79, 70, 229, 0.1)",
    border: "1px solid rgba(79, 70, 229, 0.2)",
    color: "var(--accent-primary)",
    fontSize: "10px",
    fontWeight: "700",
    padding: "2px 8px",
    borderRadius: "100px",
  },
  metaText: {
    fontSize: "12px",
    color: "var(--text-tertiary)",
  },
  cardTitle: {
    fontSize: "20px",
    fontWeight: "700",
    lineHeight: "1.3",
  },
  cardDesc: {
    fontSize: "14px",
    color: "var(--text-secondary)",
    lineHeight: "1.6",
    flex: 1,
  },
  cardFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderTop: "1px solid var(--border-color)",
    paddingTop: "16px",
    marginTop: "8px",
  },
  date: {
    display: "flex",
    alignItems: "center",
    fontSize: "12px",
    color: "var(--text-tertiary)",
  },
  readMore: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "13px",
    fontWeight: "700",
    color: "var(--accent-primary)",
  }
};
