import React from "react";
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
  ArrowLeft,
  Sparkles,
  MessageSquare,
  ShieldCheck,
  Languages,
  FileSpreadsheet
} from "lucide-react";

export function generateStaticParams() {
  return [
    { category: "convert" },
    { category: "organize" },
    { category: "security" },
    { category: "optimize" }
  ];
}

interface CategoryInfo {
  name: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
}

const categoryInfoMap: { [key: string]: CategoryInfo } = {
  "convert": {
    name: "Conversion Tools",
    description: "Convert PDFs to Word, Excel, JPG, and other office formats, or create standard PDFs from images and documents locally.",
    seoTitle: "PDF Conversion Tools Online - PDFVerse",
    seoDescription: "Convert PDF files online for free. PDF to Word, Word to PDF, Excel, JPG. Fast, secure, and client-side processing."
  },
  "organize": {
    name: "Page & Document Organization",
    description: "Merge multiple documents, extract page ranges, visual page rotations, and visually reorder or delete pages in your PDFs.",
    seoTitle: "Organize PDF Pages Online - PDFVerse",
    seoDescription: "Organize PDF files online. Merge, split, rotate, delete, and reorder PDF pages visually in-memory."
  },
  "security": {
    name: "PDF Security & Protection",
    description: "Secure your files with strong passwords, unlock encrypted PDFs, and add custom signature annotations.",
    seoTitle: "PDF Security Tools Online - PDFVerse",
    seoDescription: "Secure and protect your PDF documents. Encrypt PDFs with passwords, decrypt files, or burn signature tags safely."
  },
  "optimize": {
    name: "Optimization & OCR",
    description: "Reduce file sizes for email delivery or scan and extract text from flat image documents locally.",
    seoTitle: "Optimize and OCR PDF Online - PDFVerse",
    seoDescription: "Optimize PDF files. Compress documents or extract text characters locally via Tesseract WebAssembly OCR."
  },

};

interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: React.ReactNode;
  href: string;
}

const tools: Tool[] = [
  { id: "merge-pdf", name: "Merge PDF", description: "Combine multiple PDF files into a single document.", category: "organize", icon: <Combine size={20} />, href: "/tools/merge-pdf" },
  { id: "split-pdf", name: "Split PDF", description: "Extract page ranges or split your PDF into multiple files.", category: "organize", icon: <Scissors size={20} />, href: "/tools/split-pdf" },
  { id: "compress-pdf", name: "Compress PDF", description: "Optimize file size while keeping visual quality.", category: "optimize", icon: <Minimize2 size={20} />, href: "/tools/compress-pdf" },
  { id: "ocr-pdf", name: "OCR PDF", description: "Extract text layouts from scans locally via Tesseract.", category: "optimize", icon: <Sparkles size={20} />, href: "/tools/ocr-pdf" },
  { id: "excel-to-pdf", name: "Excel to PDF", description: "Convert spreadsheet workbooks to formatted PDF tables.", category: "convert", icon: <FileSpreadsheet size={20} />, href: "/tools/excel-to-pdf" },
  { id: "pdf-to-excel", name: "PDF to Excel", description: "Extract PDF tables into editable Excel sheets.", category: "convert", icon: <FileSpreadsheet size={20} />, href: "/tools/pdf-to-excel" },
  { id: "pdf-to-word", name: "PDF to Word", description: "Convert PDFs to editable Microsoft Word files.", category: "convert", icon: <FileText size={20} />, href: "/tools/pdf-to-word" },
  { id: "word-to-pdf", name: "Word to PDF", description: "Convert DOCX files to formatted PDF pages.", category: "convert", icon: <FileCode size={20} />, href: "/tools/word-to-pdf" },
  { id: "pdf-to-jpg", name: "PDF to JPG", description: "Export PDF pages into individual JPG images.", category: "convert", icon: <FileImage size={20} />, href: "/tools/pdf-to-jpg" },
  { id: "jpg-to-pdf", name: "JPG to PDF", description: "Convert images to PDF documents.", category: "convert", icon: <ImageIcon size={20} />, href: "/tools/jpg-to-pdf" },
  { id: "rotate-pdf", name: "Rotate PDF", description: "Permanently rotate pages in your document.", category: "organize", icon: <RotateCw size={20} />, href: "/tools/rotate-pdf" },
  { id: "organize-pdf", name: "Organize PDF", description: "Delete and reorder pages in your PDF file.", category: "organize", icon: <Layers size={20} />, href: "/tools/organize-pdf" },
  { id: "add-password", name: "Add Password", description: "Encrypt your PDF with standard passwords.", category: "security", icon: <Lock size={20} />, href: "/tools/add-password" },
  { id: "remove-password", name: "Remove Password", description: "Decrypt protected files safely.", category: "security", icon: <Unlock size={20} />, href: "/tools/remove-password" },
  { id: "sign-pdf", name: "Sign PDF", description: "Draw or place signature annotations on pages.", category: "security", icon: <PenTool size={20} />, href: "/tools/sign-pdf" }
];

export default async function CategoryHub({ params }: { params: Promise<{ category: string }> }) {
  const resolvedParams = await params;
  const categoryId = resolvedParams.category;
  const info = categoryInfoMap[categoryId];

  if (!info) {
    return (
      <div style={{ padding: "80px 0", textAlign: "center" }}>
        <h2>Category Not Found</h2>
        <Link href="/" style={{ color: "var(--accent-primary)", marginTop: "12px", display: "inline-block" }}>
          Back to Home
        </Link>
      </div>
    );
  }

  const categoryTools = tools.filter((t) => t.category === categoryId);

  // Breadcrumb schema
  const breadcrumbSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://pdfverse-ai.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": info.name,
        "item": `https://pdfverse-ai.com/categories/${categoryId}`
      }
    ]
  });

  return (
    <div style={{ padding: "60px 0 80px 0" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadcrumbSchema }}
      />

      <div className="container" style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
        <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "14px", color: "var(--text-secondary)" }}>
          <ArrowLeft size={16} />
          <span>Back to All Categories</span>
        </Link>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <h1 style={{ fontSize: "36px", fontWeight: "800" }}>{info.name}</h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "16px", maxWidth: "700px", lineHeight: "1.6" }}>
            {info.description}
          </p>
        </div>

        <div className="grid-3 animate-fade-in">
          {categoryTools.map((tool) => (
            <Link href={tool.href} key={tool.id} className="glass-card" style={styles.toolCard}>
              <div style={styles.cardHeader}>
                <div style={styles.toolIconWrapper}>
                  {tool.icon}
                </div>
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
