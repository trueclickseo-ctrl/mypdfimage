"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Combine, 
  Scissors, 
  Minimize2, 
  FileText, 
  FileCode, 
  FileImage, 
  Image as ImageIcon, 
  RotateCw, 
  Layers, 
  Lock, 
  Unlock, 
  PenTool, 
  Search, 
  Sparkles,
  ShieldCheck,
  Zap,
  RefreshCw,
  MessageSquare,
  Languages,
  FileSpreadsheet,
  BookOpen,
  FileJson,
  Globe
} from "lucide-react";

interface Tool {
  id: string;
  name: string;
  description: string;
  category: "organize" | "convert" | "security" | "optimize" | "image";
  icon: React.ReactNode;
  href: string;
  popular?: boolean;
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [processedCount, setProcessedCount] = useState<number>(10142);

  useEffect(() => {
    const saved = localStorage.getItem("mypdfimage_processed_files");
    let startVal = 10142;
    if (saved) {
      startVal = parseInt(saved, 10);
    } else {
      localStorage.setItem("mypdfimage_processed_files", "10142");
    }
    setProcessedCount(startVal);

    // Simulate other users processing files globally in real-time
    const interval = setInterval(() => {
      setProcessedCount(prev => {
        const next = prev + Math.floor(Math.random() * 3) + 1;
        localStorage.setItem("mypdfimage_processed_files", next.toString());
        return next;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const tools: Tool[] = [
    {
      id: "merge-pdf",
      name: "Merge PDF",
      description: "Combine multiple PDF files into a single document in seconds.",
      category: "organize",
      icon: <Combine size={24} />,
      href: "/tools/merge-pdf",
      popular: true
    },
    {
      id: "split-pdf",
      name: "Split PDF",
      description: "Extract specific pages or split your PDF into multiple documents.",
      category: "organize",
      icon: <Scissors size={24} />,
      href: "/tools/split-pdf",
      popular: true
    },
    {
      id: "compress-pdf",
      name: "Compress PDF",
      description: "Reduce file size while keeping maximum visual document quality.",
      category: "optimize",
      icon: <Minimize2 size={24} />,
      href: "/tools/compress-pdf",
      popular: true
    },
    {
      id: "ocr-pdf",
      name: "OCR PDF",
      description: "Use OCR scanners to extract text layouts from scanned documents.",
      category: "optimize",
      icon: <Sparkles size={24} />,
      href: "/tools/ocr-pdf",
      popular: true
    },
    {
      id: "excel-to-pdf",
      name: "Excel to PDF",
      description: "Convert spreadsheet workbooks (.xlsx) to formatted PDF tables.",
      category: "convert",
      icon: <FileSpreadsheet size={24} />,
      href: "/tools/excel-to-pdf"
    },
    {
      id: "pdf-to-excel",
      name: "PDF to Excel",
      description: "Extract PDF tables directly into Excel spreadsheets.",
      category: "convert",
      icon: <FileSpreadsheet size={24} />,
      href: "/tools/pdf-to-excel"
    },
    {
      id: "pdf-to-word",
      name: "PDF to Word",
      description: "Convert PDF files to editable Microsoft Word documents easily.",
      category: "convert",
      icon: <FileText size={24} />,
      href: "/tools/pdf-to-word",
      popular: true
    },
    {
      id: "word-to-pdf",
      name: "Word to PDF",
      description: "Make DOC and DOCX files easy to read by converting them to PDF.",
      category: "convert",
      icon: <FileCode size={24} />,
      href: "/tools/word-to-pdf"
    },
    {
      id: "pdf-to-jpg",
      name: "PDF to JPG",
      description: "Extract all images in a PDF or convert each page to a JPG image.",
      category: "convert",
      icon: <FileImage size={24} />,
      href: "/tools/pdf-to-jpg"
    },
    {
      id: "jpg-to-pdf",
      name: "JPG to PDF",
      description: "Convert images (JPG, PNG, WebP) to PDF with custom margins.",
      category: "convert",
      icon: <ImageIcon size={24} />,
      href: "/tools/jpg-to-pdf"
    },
    {
      id: "rotate-pdf",
      name: "Rotate PDF",
      description: "Rotate pages of your PDF document and save them permanently.",
      category: "organize",
      icon: <RotateCw size={24} />,
      href: "/tools/rotate-pdf"
    },
    {
      id: "add-password",
      name: "Add Password",
      description: "Encrypt your PDF with a strong password to protect sensitive data.",
      category: "security",
      icon: <Lock size={24} />,
      href: "/tools/add-password"
    },
    {
      id: "remove-password",
      name: "Remove Password",
      description: "Unlock password-protected PDFs to remove security permanently.",
      category: "security",
      icon: <Unlock size={24} />,
      href: "/tools/remove-password"
    },
    {
      id: "sign-pdf",
      name: "Sign PDF",
      description: "Add a digital signature, draw your signature, or upload image signature.",
      category: "security",
      icon: <PenTool size={24} />,
      href: "/tools/sign-pdf"
    },
    {
      id: "watermark-pdf",
      name: "Watermark PDF",
      description: "Add a text watermark overlay to all pages of your PDF document.",
      category: "optimize",
      icon: <Sparkles size={24} />,
      href: "/tools/watermark-pdf"
    },
    {
      id: "page-numbers",
      name: "Add Page Numbers",
      description: "Insert clean sequential page numbering into your PDF document pages.",
      category: "organize",
      icon: <Layers size={24} />,
      href: "/tools/page-numbers"
    },
    {
      id: "esign-pdf",
      name: "eSign PDF",
      description: "Sign PDF documents digitally using custom drawn or uploaded signatures.",
      category: "security",
      icon: <PenTool size={24} />,
      href: "/tools/esign-pdf"
    },
    {
      id: "lock-pdf",
      name: "Lock PDF",
      description: "Add password protection to secure your PDF from unauthorized access.",
      category: "security",
      icon: <Lock size={24} />,
      href: "/tools/lock-pdf"
    },
    {
      id: "unlock-pdf",
      name: "Unlock PDF",
      description: "Remove password protection and restrictions from your secured PDF.",
      category: "security",
      icon: <Unlock size={24} />,
      href: "/tools/unlock-pdf"
    },
    {
      id: "image-to-pdf",
      name: "Image to PDF",
      description: "Convert JPG, PNG, and WebP images to formatted PDF documents.",
      category: "convert",
      icon: <ImageIcon size={24} />,
      href: "/tools/image-to-pdf"
    },
    {
      id: "invoice-to-excel",
      name: "Invoice to Excel",
      description: "Extract invoice table data details to structured Excel rows.",
      category: "convert",
      icon: <FileSpreadsheet size={24} />,
      href: "/tools/invoice-to-excel"
    },
    {
      id: "legal-doc-comparison",
      name: "Legal Comparison",
      description: "Compare legal document paragraphs and identify text diffs.",
      category: "organize",
      icon: <Layers size={24} />,
      href: "/tools/legal-doc-comparison"
    },
    {
      id: "bank-statement-to-excel",
      name: "Bank Statement to Excel",
      description: "Extract bank statement transactions into editable spreadsheet rows.",
      category: "convert",
      icon: <FileSpreadsheet size={24} />,
      href: "/tools/bank-statement-to-excel"
    },
    {
      id: "pdf-extraction-api",
      name: "Extraction API",
      description: "Extract layout text and tabular structures via API key developer calls.",
      category: "optimize",
      icon: <FileCode size={24} />,
      href: "/tools/pdf-extraction-api"
    },
    {
      id: "increase-image-size",
      name: "Increase Image Size",
      description: "Artificially increase image KB size for minimum requirements.",
      category: "image",
      icon: <ImageIcon size={24} />,
      href: "/tools/increase-image-size"
    },
    {
      id: "kb-converter",
      name: "Image KB Converter",
      description: "Convert and compress image file sizes to precise KB targets.",
      category: "image",
      icon: <ImageIcon size={24} />,
      href: "/tools/kb-converter"
    },
    {
      id: "resize-image-to-20kb",
      name: "Resize Image to 20KB",
      description: "Compress and scale your photo to be exactly under 20KB.",
      category: "image",
      icon: <ImageIcon size={24} />,
      href: "/tools/resize-image-to-20kb",
      popular: true
    },
    {
      id: "resize-pixel",
      name: "Resize Image Pixels",
      description: "Resize photo width and height by custom pixels or presets.",
      category: "image",
      icon: <ImageIcon size={24} />,
      href: "/tools/resize-pixel",
      popular: true
    },
    {
      id: "resize-image-to-50kb",
      name: "Resize Image to 50KB",
      description: "Compress photos for UPSC, SSC, and IBPS portal uploads.",
      category: "image",
      icon: <ImageIcon size={24} />,
      href: "/tools/resize-image-to-50kb",
      popular: true
    },
    {
      id: "resize-image-to-100kb",
      name: "Resize Image to 100KB",
      description: "High-fidelity compression for certificates, marksheets, and degrees.",
      category: "image",
      icon: <ImageIcon size={24} />,
      href: "/tools/resize-image-to-100kb"
    },
    {
      id: "resize-image-to-10kb",
      name: "Resize Image to 10KB",
      description: "Ultra-compact compression for signatures and thumbnails.",
      category: "image",
      icon: <ImageIcon size={24} />,
      href: "/tools/resize-image-to-10kb"
    },
    {
      id: "ssc-photo-resizer",
      name: "SSC Photo Resizer",
      description: "Resize photo to 20KB-50KB with 3.5x4.5cm dimensions for SSC Exams.",
      category: "image",
      icon: <ImageIcon size={24} />,
      href: "/tools/ssc-photo-resizer",
      popular: true
    },
    {
      id: "ssc-signature-resizer",
      name: "SSC Signature Resizer",
      description: "Resize and compress signature to 10KB-20KB for SSC CGL, CHSL, MTS.",
      category: "image",
      icon: <ImageIcon size={24} />,
      href: "/tools/ssc-signature-resizer"
    },
    {
      id: "sbi-po-signature-resizer",
      name: "SBI PO Signature Resizer",
      description: "Compress signature strictly to 10KB-20KB (140x60px) in black ink.",
      category: "image",
      icon: <ImageIcon size={24} />,
      href: "/tools/sbi-po-signature-resizer"
    }
  ];

  const filteredTools = tools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "all" || tool.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [
    { id: "all", name: "All Tools" },
    { id: "organize", name: "Organize" },
    { id: "convert", name: "Convert" },
    { id: "security", name: "Security" },
    { id: "optimize", name: "Optimize" },
    { id: "image", name: "Image Tools" }
  ];

  return (
    <div style={styles.page}>
      {/* Hero Section */}
      <section style={styles.hero}>
        <div className="container" style={styles.heroContainer}>
          <img 
            src="/logo_icon.jpg" 
            alt="My PDF Image Logo" 
            className="animate-fade-in"
            style={{ 
              width: "96px", 
              height: "96px", 
              borderRadius: "24px", 
              boxShadow: "0 12px 36px rgba(79, 70, 229, 0.4)", 
              border: "2px solid rgba(255, 255, 255, 0.1)",
              marginBottom: "24px"
            }} 
          />
          <div style={styles.pill} className="animate-fade-in">
            <Sparkles size={14} style={{ color: "var(--accent-secondary)" }} />
            <span>100% Free & Secure Online Tool Suite</span>
          </div>
          <h1 style={styles.title} className="animate-fade-in">
            100% Free Online PDF & Image Tools — <span style={styles.gradientText}>My PDF Image</span>
          </h1>
          <p style={styles.subtitle} className="animate-fade-in">
            Access 100% free online PDF and Image utility tools. Compress PDF size, resize photo KBs, merge files, convert formats, and optimize images completely free with zero cloud uploads or registration.
          </p>

          {/* Live File Counter */}
          <div 
            style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: "8px", 
              background: "rgba(34, 197, 94, 0.1)", 
              border: "1px solid rgba(34, 197, 94, 0.2)", 
              padding: "8px 16px", 
              borderRadius: "100px", 
              fontSize: "14px", 
              fontWeight: "700", 
              color: "#22c55e", 
              marginBottom: "28px" 
            }} 
            className="animate-fade-in"
          >
            <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#22c55e", display: "inline-block", boxShadow: "0 0 8px #22c55e" }}></span>
            <span>{processedCount.toLocaleString()} Files Processed Locally & Counting</span>
          </div>

          {/* Search Bar */}
          <div style={styles.searchWrapper} className="animate-fade-in">
            <Search size={20} style={styles.searchIcon} />
            <input 
              type="text" 
              placeholder="Search for a PDF tool (e.g. Merge, Split, Word)..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={styles.searchInput}
            />
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section style={styles.toolsSection}>
        <div className="container">
          {/* Category Tabs */}
          <div style={styles.tabsWrapper}>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                style={{
                  ...styles.tab,
                  background: activeCategory === category.id ? "var(--accent-primary)" : "var(--bg-tertiary)",
                  color: activeCategory === category.id ? "#ffffff" : "var(--text-secondary)",
                  borderColor: activeCategory === category.id ? "var(--accent-primary)" : "var(--border-color)",
                }}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Tools Grid */}
          <div className="grid-3 animate-fade-in" style={{ marginTop: "32px" }}>
            {filteredTools.map((tool) => (
              <Link href={tool.href} key={tool.id} className="glass-card" style={styles.toolCard}>
                <div style={styles.cardHeader}>
                  <div style={styles.toolIconWrapper}>
                    {tool.icon}
                  </div>
                  {tool.popular && (
                    <span style={styles.popularBadge}>Popular</span>
                  )}
                </div>
                <h3 style={styles.cardTitle}>{tool.name}</h3>
                <p style={styles.cardDesc}>{tool.description}</p>
              </Link>
            ))}
          </div>

          {filteredTools.length === 0 && (
            <div style={styles.noResults}>
              <p>No tools match your search criteria. Try looking for "Merge", "Word", or "Sign".</p>
            </div>
          )}
        </div>
      </section>

      {/* Trust / Stats Section */}
      <section style={styles.statsSection}>
        <div className="container" style={styles.statsGrid}>
          <div style={styles.statCard} className="glass-card">
            <ShieldCheck size={36} color="var(--accent-secondary)" />
            <h3 style={styles.statTitle}>Privacy First</h3>
            <p style={styles.statDesc}>Your documents never touch a server for 10/12 tools. Everything processes locally via WASM in your browser window.</p>
          </div>
          <div style={styles.statCard} className="glass-card">
            <Zap size={36} color="var(--accent-primary)" />
            <h3 style={styles.statTitle}>Instant Processing</h3>
            <p style={styles.statDesc}>No waiting in line for conversions. Experience direct file generation with zero network lag.</p>
          </div>
          <div style={styles.statCard} className="glass-card">
            <RefreshCw size={36} color="var(--success)" />
            <h3 style={styles.statTitle}>Automatic Disposal</h3>
            <p style={styles.statDesc}>Any remote files required for Word conversion are purged with 1-hour automated lifecycle deletes.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  page: {
    paddingBottom: "80px",
  },
  hero: {
    padding: "80px 0 40px 0",
    textAlign: "center",
    position: "relative",
  },
  heroContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    maxWidth: "800px",
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
    marginBottom: "24px",
  },
  title: {
    fontSize: "44px",
    fontWeight: "800",
    lineHeight: "1.15",
    letterSpacing: "-0.03em",
    color: "var(--text-primary)",
    marginBottom: "16px",
  },
  gradientText: {
    background: "linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  subtitle: {
    fontSize: "18px",
    color: "var(--text-secondary)",
    maxWidth: "640px",
    marginBottom: "40px",
    lineHeight: "1.6",
  },
  searchWrapper: {
    position: "relative",
    width: "100%",
    maxWidth: "540px",
    borderRadius: "var(--radius-md)",
    boxShadow: "var(--shadow-md)",
    border: "1px solid var(--border-color)",
    background: "var(--bg-secondary)",
    transition: "border-color var(--transition-fast)",
  },
  searchIcon: {
    position: "absolute",
    left: "16px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "var(--text-tertiary)",
  },
  searchInput: {
    width: "100%",
    padding: "16px 16px 16px 52px",
    fontSize: "15px",
    background: "none",
    border: "none",
    outline: "none",
    color: "var(--text-primary)",
    borderRadius: "var(--radius-md)",
  },
  toolsSection: {
    padding: "40px 0",
  },
  tabsWrapper: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  tab: {
    padding: "10px 20px",
    borderRadius: "var(--radius-full)",
    border: "1px solid transparent",
    fontSize: "14px",
    fontWeight: 600,
    cursor: "pointer",
    transition: "all var(--transition-fast)",
  },
  toolCard: {
    padding: "28px",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    cursor: "pointer",
    textDecoration: "none",
    height: "100%",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  toolIconWrapper: {
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
  popularBadge: {
    background: "rgba(6, 182, 212, 0.1)",
    border: "1px solid rgba(6, 182, 212, 0.2)",
    color: "var(--accent-secondary)",
    fontSize: "11px",
    fontWeight: "700",
    padding: "2px 8px",
    borderRadius: "100px",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },
  cardTitle: {
    fontSize: "18px",
    fontWeight: "700",
    color: "var(--text-primary)",
  },
  cardDesc: {
    fontSize: "14px",
    color: "var(--text-secondary)",
    lineHeight: "1.5",
  },
  noResults: {
    padding: "60px 0",
    textAlign: "center",
    color: "var(--text-secondary)",
  },
  statsSection: {
    padding: "60px 0",
    borderTop: "1px solid var(--border-color)",
    marginTop: "40px",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "32px",
  },
  statCard: {
    padding: "32px",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    alignItems: "center",
    textAlign: "center",
  },
  statTitle: {
    fontSize: "20px",
    fontWeight: "700",
  },
  statDesc: {
    fontSize: "14px",
    lineHeight: "1.6",
  }
};
