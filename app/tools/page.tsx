"use client";

import React, { useState } from "react";
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
  category: "organize" | "convert" | "security" | "optimize" | "ai" | "image";
  icon: React.ReactNode;
  href: string;
  popular?: boolean;
}

export default function ToolsIndex() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");

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
      id: "organize-pdf",
      name: "Organize PDF",
      description: "Delete pages, reorder pages, and sort pages in your PDF file.",
      category: "organize",
      icon: <Layers size={24} />,
      href: "/tools/organize-pdf"
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
    <div style={{ padding: "60px 0 80px 0" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <h1 style={{ fontSize: "36px", fontWeight: "800", marginBottom: "16px" }}>PDF Tool Directory</h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "16px", maxWidth: "600px", margin: "0 auto" }}>
            Explore our complete suite of 100% private in-browser PDF tools. Click any card below to start.
          </p>
          
          <div style={styles.searchWrapper}>
            <Search size={20} style={styles.searchIcon} />
            <input 
              type="text" 
              placeholder="Search tools..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={styles.searchInput}
            />
          </div>
        </div>

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
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  searchWrapper: {
    position: "relative",
    width: "100%",
    maxWidth: "460px",
    margin: "24px auto 0 auto",
    borderRadius: "var(--radius-md)",
    boxShadow: "var(--shadow-sm)",
    border: "1px solid var(--border-color)",
    background: "var(--bg-secondary)",
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
    padding: "12px 12px 12px 48px",
    fontSize: "14px",
    background: "none",
    border: "none",
    outline: "none",
    color: "var(--text-primary)",
    borderRadius: "var(--radius-md)",
  },
  tabsWrapper: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: "24px",
  },
  tab: {
    padding: "8px 16px",
    borderRadius: "var(--radius-full)",
    border: "1px solid transparent",
    fontSize: "13px",
    fontWeight: 600,
    cursor: "pointer",
    transition: "all var(--transition-fast)",
  },
  toolCard: {
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    cursor: "pointer",
    textDecoration: "none",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  toolIconWrapper: {
    width: "40px",
    height: "40px",
    borderRadius: "10px",
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
    fontSize: "10px",
    fontWeight: "700",
    padding: "2px 6px",
    borderRadius: "100px",
  },
  cardTitle: {
    fontSize: "16px",
    fontWeight: "700",
    color: "var(--text-primary)",
  },
  cardDesc: {
    fontSize: "13px",
    color: "var(--text-secondary)",
    lineHeight: "1.5",
  }
};
