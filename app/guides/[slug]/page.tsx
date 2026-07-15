import React from "react";
import Link from "next/link";
import { ArrowLeft, BookOpen, Calendar, Clock, User, ShieldCheck } from "lucide-react";

export function generateStaticParams() {
  return [
    { slug: "how-to-merge-pdfs-locally" },
    { slug: "extract-text-scanned-pdf-ocr" },
    { slug: "pdf-password-encryption-guide" },
    { slug: "converting-pdf-tables-to-excel" }
  ];
}

interface ArticleData {
  title: string;
  description: string;
  category: string;
  readTime: string;
  date: string;
  schema: string;
  content: React.ReactNode;
}

const articles: { [key: string]: ArticleData } = {
  "how-to-merge-pdfs-locally": {
    title: "How to Merge PDF Files Locally without Internet",
    description: "Learn how to combine multiple PDF documents into a single file directly in your browser. Complete guide to secure, local document compilation.",
    category: "ORGANIZATION",
    readTime: "4 min read",
    date: "2026-07-01",
    schema: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to Merge PDF Files Locally without Internet",
      "description": "Combine multiple PDF documents securely inside your browser using pdf-lib.",
      "step": [
        {
          "@type": "HowToStep",
          "position": 1,
          "name": "Select PDF Files",
          "text": "Click Select Files or drag and drop multiple PDF documents into the upload zone."
        },
        {
          "@type": "HowToStep",
          "position": 2,
          "name": "Arrange Order",
          "text": "Drag and drop the rows to reorder documents as they should appear in the merged file."
        },
        {
          "@type": "HowToStep",
          "position": 3,
          "name": "Compile PDF",
          "text": "Click the Merge PDF button. The compilation runs in-memory."
        }
      ]
    }),
    content: (
      <div>
        <p>Merging PDF files is one of the most common document workflows, but uploading private files to unknown cloud servers raises critical security risks. In this guide, we walk you through merging documents fully locally in your web browser window.</p>
        <br />
        <h3>Why Local Merges Matter</h3>
        <p>Traditional PDF sites upload your files to remote cloud servers to compile them. PDFVerse uses WebAssembly and client-side JavaScript engines to compile your documents. Your files are processed entirely within your device's memory, ensuring that bank records, NDAs, and private contracts never leave your computer.</p>
        <br />
        <h3>Step-by-Step Instructions</h3>
        <ol style={{ marginLeft: "20px", display: "flex", flexDirection: "column", gap: "10px" }}>
          <li>Navigate to the <strong>Merge PDF</strong> tool on the homepage.</li>
          <li>Drag and drop the files you want to combine.</li>
          <li>Arrange the order of files using the list rows.</li>
          <li>Click <strong>Merge PDF</strong> and download the completed file.</li>
        </ol>
      </div>
    )
  },
  "extract-text-scanned-pdf-ocr": {
    title: "OCR Guide: Extract text from scanned documents locally",
    description: "Step-by-step tutorial on using local WebAssembly Tesseract engines to read text content from scans and images without cloud servers.",
    category: "OPTIMIZE",
    readTime: "6 min read",
    date: "2026-07-05",
    schema: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "Extract text from scanned PDF",
      "description": "Convert scanned images or PDFs into text layout outputs locally using Tesseract.js.",
      "step": [
        {
          "@type": "HowToStep",
          "position": 1,
          "name": "Upload Scan",
          "text": "Drop your scanned PDF into the workspace zone."
        },
        {
          "@type": "HowToStep",
          "position": 2,
          "name": "Select Language",
          "text": "Choose the main dictionary language (e.g. English, Spanish)."
        },
        {
          "@type": "HowToStep",
          "position": 3,
          "name": "Extract",
          "text": "Run OCR process and extract searchable text."
        }
      ]
    }),
    content: (
      <div>
        <p>Scanned PDFs are essentially just image files, which makes copying text or searching for words impossible. Using Optical Character Recognition (OCR), you can reconstruct text shapes back into searchable characters. Here is how to run it securely in your browser.</p>
        <br />
        <h3>Local WASM-based OCR Engines</h3>
        <p>Rather than sending images to cloud APIs that parse your files, PDFVerse utilizes the WebAssembly port of the open-source Tesseract OCR project. Your browser executes the OCR scanner inside a isolated worker process, leaving your privacy 100% untouched.</p>
      </div>
    )
  },
  "pdf-password-encryption-guide": {
    title: "Ultimate Guide to PDF Password Encryption and Decryption",
    description: "Understand standard PDF encryption properties, Owner vs. User passwords, and how to safely lock or unlock documents offline.",
    category: "SECURITY",
    readTime: "5 min read",
    date: "2026-07-10",
    schema: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is the difference between User and Owner passwords?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A User Password restricts opening the PDF, while an Owner Password restricts operational permissions (printing, text copy)."
          }
        }
      ]
    }),
    content: (
      <div>
        <p>Securing files with encryption is essential when sharing confidential spreadsheets, contracts, or tax information. Understanding the standard security layers of the PDF layout helps prevent unauthorized leaks.</p>
        <br />
        <h3>Standard PDF Security Levels</h3>
        <p>PDF documents support both User passwords (restricting who can read the file) and Owner passwords (restricting copying, editing, or printing). By applying standard AES encryption blocks directly in-browser, you protect your document metadata safely.</p>
      </div>
    )
  },
  "converting-pdf-tables-to-excel": {
    title: "Converting PDF Tables to Editable Excel Spreadsheets",
    description: "Learn how column alignments are processed and how to cleanly extract rows from PDF reports directly into XLSX workbooks.",
    category: "CONVERSION",
    readTime: "4 min read",
    date: "2026-07-12",
    schema: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "Convert PDF to Excel",
      "description": "Extract rows and columns from PDF tables into XLSX format.",
      "step": [
        {
          "@type": "HowToStep",
          "position": 1,
          "name": "Upload PDF Table",
          "text": "Upload the PDF containing table reports."
        },
        {
          "@type": "HowToStep",
          "position": 2,
          "name": "Convert",
          "text": "Convert PDF layout directly into a downloadable XLSX spreadsheet."
        }
      ]
    }),
    content: (
      <div>
        <p>Financial reports and balance sheets are often shared as PDF documents, but analyzing the numbers requires them to be editable. Reconstructing tabular data into Excel cells is a complex process. Here is how it is managed safely.</p>
        <br />
        <h3>Reconstructing Table Rows</h3>
        <p>PDF tables do not contain explicit row or cell borders; instead, they are just character letters placed at specific pixel positions. Our local converter groups text characters along the same Y-axis coordinate to rebuild spreadsheet rows, saving them into cell lists in-browser.</p>
      </div>
    )
  }
};

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const article = articles[slug];

  if (!article) {
    return (
      <div style={{ padding: "80px 0", textAlign: "center" }}>
        <h2>Article Not Found</h2>
        <Link href="/guides" style={{ color: "var(--accent-primary)", marginTop: "12px", display: "inline-block" }}>
          Back to Guides Hub
        </Link>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: article.schema }}
      />

      <div className="container" style={styles.container}>
        <Link href="/guides" style={styles.backLink}>
          <ArrowLeft size={16} />
          <span>Back to Guides Hub</span>
        </Link>

        <article style={styles.article}>
          <div style={styles.metaRow}>
            <span style={styles.categoryBadge}>{article.category}</span>
            <span style={styles.metaText}>
              <Calendar size={12} style={{ marginRight: "4px" }} />
              {article.date}
            </span>
            <span style={styles.metaText}>
              <Clock size={12} style={{ marginRight: "4px" }} />
              {article.readTime}
            </span>
          </div>

          <h1 style={styles.title}>{article.title}</h1>
          <p style={styles.description}>{article.description}</p>

          <div style={styles.contentBody} className="glass-card">
            {article.content}
          </div>
        </article>

        {/* Security badge statement */}
        <div style={styles.trustBanner} className="glass-card">
          <ShieldCheck size={24} color="var(--accent-secondary)" />
          <div style={styles.trustInfo}>
            <h4>100% Privacy Preserved</h4>
            <p>This tutorial details operations processed fully in your web browser. No cloud servers are utilized.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  page: {
    padding: "40px 0 80px 0",
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
  article: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  metaRow: {
    display: "flex",
    gap: "24px",
    alignItems: "center",
  },
  categoryBadge: {
    background: "rgba(79, 70, 229, 0.1)",
    border: "1px solid rgba(79, 70, 229, 0.2)",
    color: "var(--accent-primary)",
    fontSize: "11px",
    fontWeight: "700",
    padding: "2px 8px",
    borderRadius: "100px",
  },
  metaText: {
    display: "flex",
    alignItems: "center",
    fontSize: "13px",
    color: "var(--text-tertiary)",
  },
  title: {
    fontSize: "36px",
    fontWeight: "800",
    lineHeight: "1.2",
  },
  description: {
    fontSize: "18px",
    color: "var(--text-secondary)",
    lineHeight: "1.5",
    borderLeft: "3px solid var(--accent-primary)",
    paddingLeft: "16px",
  },
  contentBody: {
    padding: "40px",
    fontSize: "16px",
    lineHeight: "1.8",
  },
  trustBanner: {
    display: "flex",
    gap: "16px",
    alignItems: "center",
    padding: "20px 24px",
    background: "rgba(6, 182, 212, 0.03)",
    borderColor: "rgba(6, 182, 212, 0.1)",
  },
  trustInfo: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  }
};
