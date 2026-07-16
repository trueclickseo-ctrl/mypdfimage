import { Metadata } from "next";
import ToolWorkspace from "./ToolWorkspace";

export async function generateMetadata({ params }: { params: Promise<{ tool: string }> }): Promise<Metadata> {
  const p = await params;
  const slug = p.tool;
  
  // Format slug name (e.g., merge-pdf -> Merge PDF)
  let name = slug
    .split("-")
    .map(word => {
      if (word === "pdf") return "PDF";
      if (word === "kb") return "KB";
      if (word === "mb") return "MB";
      if (word === "ocr") return "OCR";
      if (word === "sbi") return "SBI";
      if (word === "po") return "PO";
      if (word === "ssc") return "SSC";
      if (word === "otr") return "OTR";
      if (word === "tnpsc") return "TNPSC";
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");

  let title = `${name} Online - My PDF Image`;
  let description = `Free online tool to ${name.toLowerCase()} securely in your browser. Fast, local, and private processing. No registration or signup required.`;

  // Custom targeted overrides for image resizers and KB compressors
  if (slug.includes("resizer") || slug.includes("compressor") || slug.includes("-to-")) {
    title = `${name} Online - Compress Image KBs | My PDF Image`;
    description = `Free online utility to ${name.toLowerCase()}. Resize and compress your photos to meet official recruitment portal upload limits securely.`;
  }
  
  return {
    title,
    description,
    keywords: `${slug.replace(/-/g, " ")}, free ${slug.replace(/-/g, " ")}, online ${slug.replace(/-/g, " ")}, my pdf image`,
  };
}

export function generateStaticParams() {
  return [
    { tool: "merge-pdf" },
    { tool: "split-pdf" },
    { tool: "compress-pdf" },
    { tool: "pdf-to-word" },
    { tool: "word-to-pdf" },
    { tool: "pdf-to-jpg" },
    { tool: "jpg-to-pdf" },
    { tool: "rotate-pdf" },
    { tool: "organize-pdf" },
    { tool: "add-password" },
    { tool: "remove-password" },
    { tool: "sign-pdf" },
    { tool: "chat-pdf" },
    { tool: "summarize-pdf" },

    { tool: "review-pdf" },
    { tool: "ocr-pdf" },
    { tool: "excel-to-pdf" },
    { tool: "pdf-to-excel" },
    { tool: "watermark-pdf" },
    { tool: "page-numbers" },
    { tool: "pdf-editor" },
    { tool: "esign-pdf" },
    { tool: "lock-pdf" },
    { tool: "unlock-pdf" },
    { tool: "image-to-pdf" },
    { tool: "ai-pdf-summarizer" },
    { tool: "pdf-contract-analyzer" },
    { tool: "invoice-to-excel" },
    { tool: "tender-rfp-parser" },
    { tool: "legal-doc-comparison" },
    { tool: "ocr-urdu-arabic" },
    { tool: "bank-statement-to-excel" },
    { tool: "resume-parser" },
    { tool: "pdf-extraction-api" },
    { tool: "increase-image-size" },
    { tool: "image-size-increase" },
    { tool: "photo-size-increase" },
    { tool: "kb-converter" },
    { tool: "increase-image-size-in-kb" },
    { tool: "resize-image-to-20kb" },
    { tool: "kb-increaser" },
    { tool: "resize-pixel" },
    { tool: "pan-card-photo-resize" },
    { tool: "photo-size-kb" },
    { tool: "resize-image-to-5kb" },
    { tool: "resize-image-to-10kb" },
    { tool: "resize-image-to-15kb" },
    { tool: "resize-image-to-25kb" },
    { tool: "resize-image-to-30kb" },
    { tool: "resize-image-to-50kb" },
    { tool: "resize-image-to-60kb" },
    { tool: "resize-image-to-80kb" },
    { tool: "resize-image-to-100kb" },
    { tool: "resize-image-to-150kb" },
    { tool: "resize-image-to-200kb" },
    { tool: "resize-image-to-500kb" },
    { tool: "resize-image-to-2mb" },
    { tool: "resize-image-to-5mb" },
    { tool: "ssc-photo-resizer" },
    { tool: "ssc-otr-photo-resizer" },
    { tool: "ssc-otr-signature-resizer" },
    { tool: "ssc-signature-resizer" },
    { tool: "sbi-po-signature-resizer" },
    { tool: "tnpsc-signature-compressor" }
  ];
}

export default async function ToolPage({ params }: { params: Promise<{ tool: string }> }) {
  return <ToolWorkspace params={params} />;
}
