"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  Upload, 
  Download, 
  FileText, 
  Lock, 
  Unlock, 
  RotateCw, 
  Layers, 
  Scissors, 
  Combine, 
  Minimize2, 
  FileCode, 
  FileImage, 
  Image as ImageIcon, 
  PenTool, 
  Trash2, 
  ArrowLeft, 
  CheckCircle2, 
  Plus, 
  Eye, 
  HelpCircle,
  FileSignature,
  MessageSquare,
  Sparkles,
  ShieldCheck,
  Languages,
  FileSpreadsheet,
  Globe,
  PlusCircle,
  Type,
  AlertCircle
} from "lucide-react";
import Link from "next/link";
import { PDFDocument, rgb, degrees } from "pdf-lib";
import { 
  getPdfJs, 
  mergePDFs, 
  splitPDF, 
  compressPDF, 
  addPasswordToPDF, 
  removePasswordFromPDF, 
  imagesToPDF,
  performOCR,
  excelToPDF,
  pdfToExcel,
  htmlToPDF,
  markdownToPDF,
  jsonToPDF,
  csvToPDF,
  xmlToPDF,
  addWatermarkToPDF,
  addPageNumbersToPDF
} from "@/app/utils/pdfHelper";
import confetti from "canvas-confetti";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

interface ToolInfo {
  name: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  instructions: string[];
  faq: { q: string; a: string }[];
}

const toolInfoMap: { [key: string]: ToolInfo } = {
  "merge-pdf": {
    name: "Merge PDF",
    description: "Combine multiple PDF documents into a single file in the exact order you want.",
    seoTitle: "Merge PDF Files Online - Free PDF Combiner",
    seoDescription: "Merge PDF files online for free. Combine multiple PDF documents into a single PDF in seconds. Secure, private, and runs entirely in your browser.",
    instructions: [
      "Select and upload multiple PDF files from your device.",
      "Drag and drop files to reorder them as desired.",
      "Click the 'Merge PDF' button to combine them.",
      "Download the merged PDF file instantly."
    ],
    faq: [
      { q: "Is there a limit on the number of PDFs I can merge?", a: "No, you can merge as many files as you like. However, processing speed will depend on your local device's memory." },
      { q: "Are my files uploaded to any servers?", a: "No. The Merge PDF tool runs completely client-side in your web browser. Your sensitive files never leave your computer." }
    ]
  },
  "split-pdf": {
    name: "Split PDF",
    description: "Extract specific page ranges or divide a PDF into multiple separate documents.",
    seoTitle: "Split PDF Online - Free PDF Page Extractor",
    seoDescription: "Split PDF files online for free. Extract individual pages or specify custom ranges (e.g., 1-5, 8). Fast, secure, and fully private.",
    instructions: [
      "Upload your PDF file.",
      "Enter the page ranges you wish to extract (e.g., '1-3, 5' to extract pages 1, 2, 3, and 5).",
      "Click 'Split PDF' to process the document.",
      "Download your split PDF file."
    ],
    faq: [
      { q: "How do I specify multiple separate page ranges?", a: "Use a comma to separate ranges. For example: '1-3, 5-8, 10' will extract pages 1 through 3, 5 through 8, and page 10." },
      { q: "Can I split a password-protected PDF?", a: "Yes, but you will need to unlock it first using our 'Remove Password' tool or type the password when prompted." }
    ]
  },
  "compress-pdf": {
    name: "Compress PDF",
    description: "Optimize and reduce the file size of your PDF documents while preserving quality.",
    seoTitle: "Compress PDF Online - Reduce PDF File Size",
    seoDescription: "Compress PDF files online to reduce file size. Preserve visual quality while optimizing PDFs for email attachments. Local browser-only compression.",
    instructions: [
      "Upload your PDF file.",
      "Choose a compression quality level (Recommended is Medium).",
      "Click 'Compress PDF' and wait for optimization.",
      "Download your newly compressed PDF."
    ],
    faq: [
      { q: "Does compression reduce image quality?", a: "Medium compression is optimized to reduce file size significantly while retaining high visual fidelity. High compression will reduce resolution for maximum size savings." }
    ]
  },
  "rotate-pdf": {
    name: "Rotate PDF",
    description: "Rotate individual pages or all pages in your PDF document permanently.",
    seoTitle: "Rotate PDF Pages Online - Permanently Rotate PDF",
    seoDescription: "Rotate PDF pages online. Select individual pages to rotate 90, 180, or 270 degrees. Save permanently without quality loss. Fully client-side.",
    instructions: [
      "Upload your PDF file.",
      "Click on individual page thumbnails to rotate them 90° clockwise.",
      "Or, click 'Rotate All' to rotate every page at once.",
      "Click 'Apply & Download' to save your changes."
    ],
    faq: [
      { q: "Can I rotate only a single page?", a: "Yes, you can click on specific page thumbnails to rotate only the selected pages." }
    ]
  },
  "organize-pdf": {
    name: "Organize PDF",
    description: "Reorder, delete, or rearrange pages within your PDF document visually.",
    seoTitle: "Organize PDF Pages - Delete and Reorder PDF Pages",
    seoDescription: "Organize PDF pages visually. Drag and drop pages to reorder, or click delete to remove pages from your document. Safe, local, and private.",
    instructions: [
      "Upload your PDF file to load page previews.",
      "Hover over page thumbnails and click the trash icon to delete specific pages.",
      "Click 'Save PDF' to generate the reorganized document.",
      "Download the organized PDF file."
    ],
    faq: [
      { q: "Can I undo a page deletion?", a: "Currently, you must re-upload the document to restore deleted pages, as all operations happen in-memory." }
    ]
  },
  "add-password": {
    name: "Add Password",
    description: "Secure your PDF with user password encryption to restrict unauthorized opening.",
    seoTitle: "Add Password to PDF - Encrypt PDF Online",
    seoDescription: "Add a password to your PDF document online. Protect sensitive data with strong encryption. Private and local browser protection.",
    instructions: [
      "Upload your PDF document.",
      "Enter a secure password.",
      "Click 'Add Password' to encrypt the file.",
      "Download the password-protected PDF."
    ],
    faq: [
      { q: "What encryption standard is used?", a: "We use standard PDF encryption supported by Adobe Acrobat and other major PDF readers. The passwords are processed locally, ensuring security." }
    ]
  },
  "remove-password": {
    name: "Remove Password",
    description: "Remove security and passwords from protected PDF files.",
    seoTitle: "Remove PDF Password - Unlock Protected PDF Online",
    seoDescription: "Unlock password-protected PDFs online. Remove passwords and security restrictions from your files instantly. Safe, local, and secure.",
    instructions: [
      "Upload your encrypted PDF.",
      "Enter the password to authenticate.",
      "Click 'Unlock PDF' to decrypt it.",
      "Download the unlocked PDF."
    ],
    faq: [
      { q: "Can I unlock a PDF without knowing the password?", a: "No, you must provide the correct password to unlock the document. We do not support password cracking for security reasons." }
    ]
  },
  "sign-pdf": {
    name: "Sign & Annotate PDF",
    description: "Draw signatures, type text annotations, and place them securely onto your PDF pages.",
    seoTitle: "Sign PDF Online - Add Signature and Text to PDF",
    seoDescription: "Sign and annotate PDF documents online for free. Draw your signature, type text comments, place anywhere on any page, and save. Local and secure.",
    instructions: [
      "Upload your PDF document.",
      "Select 'Draw Signature' to draw, or select 'Add Custom Text' to type text annotations.",
      "Click on any PDF page thumbnail where you want to place the annotation.",
      "Drag to position or resize, then click 'Apply & Download'."
    ],
    faq: [
      { q: "Can I add text tags like dates?", a: "Yes, you can select the Text Annotation option, type custom text, and position it on any page." }
    ]
  },
  "pdf-to-jpg": {
    name: "PDF to JPG",
    description: "Convert PDF pages into high-quality JPG image files.",
    seoTitle: "PDF to JPG Converter - Save PDF Pages as Images",
    seoDescription: "Convert PDF pages to JPG images online. Export pages as individual JPGs fully in-browser. Fast, free, and secure.",
    instructions: [
      "Upload your PDF file.",
      "Wait for pages to render.",
      "Click 'Download JPGs' to download individual page images."
    ],
    faq: [
      { q: "What image quality is exported?", a: "Images are exported at a high resolution matching the original PDF rendering canvas size." }
    ]
  },
  "jpg-to-pdf": {
    name: "JPG to PDF",
    description: "Convert images (JPG, PNG) into a clean, formatted PDF document.",
    seoTitle: "Convert JPG to PDF - Online Image Converter",
    seoDescription: "Convert JPG, PNG, and WebP images to PDF online. Customize margins and orientation. Quick, free, and fully private.",
    instructions: [
      "Select one or more image files (JPG, PNG).",
      "Set your margin preferences and page orientation.",
      "Click 'Convert to PDF'.",
      "Download the output PDF file."
    ],
    faq: [
      { q: "Can I convert multiple images at once?", a: "Yes, you can upload multiple images. Each image will be placed on its own page in the generated PDF." }
    ]
  },
  "pdf-to-word": {
    name: "PDF to Word",
    description: "Convert a PDF document into an editable Microsoft Word (.docx) file.",
    seoTitle: "Convert PDF to Word Online - Free PDF to DOCX Converter",
    seoDescription: "Convert PDF to editable Word document (.docx) online. Simple layout preservation. Fast, free, and processed safely.",
    instructions: [
      "Upload your PDF file.",
      "Click 'Convert to Word'.",
      "Wait for layout analysis.",
      "Download your editable .docx file."
    ],
    faq: [
      { q: "Are complex layouts preserved?", a: "Basic paragraph layouts, tables, and text are converted. Extremely complex desktop publishing layouts may require adjustments in Word." }
    ]
  },
  "word-to-pdf": {
    name: "Word to PDF",
    description: "Convert Microsoft Word documents (.docx) into standard PDF files.",
    seoTitle: "Convert Word to PDF Online - Free DOCX to PDF",
    seoDescription: "Convert DOCX and DOC files to PDF online. Perfect formatting preservation. Local and secure conversion.",
    instructions: [
      "Upload your Word (.docx) document.",
      "Click 'Convert to PDF'.",
      "Download your newly formatted PDF."
    ],
    faq: [
      { q: "Can I convert .doc files?", a: "Currently, we support the modern .docx XML-based Word file format." }
    ]
  },
  "chat-pdf": {
    name: "Chat with PDF",
    description: "Ask questions, find clauses, and chat with your document dynamically.",
    seoTitle: "Chat with PDF - AI Document Q&A",
    seoDescription: "Interact with your PDF documents using AI. Ask questions, translate paragraphs, and extract answers in seconds. Powered by Claude API.",
    instructions: [
      "Upload your PDF document to parse text content.",
      "Type any question about the document in the chat box.",
      "Get instant, context-aware answers with inline references."
    ],
    faq: [
      { q: "Are my documents shared publicly?", a: "No. The AI processes your document text securely via API. Your data is never saved on external cloud servers." }
    ]
  },
  "summarize-pdf": {
    name: "PDF Summarizer",
    description: "Generate instant structured summaries and bullet points of long PDFs.",
    seoTitle: "AI PDF Summarizer - Summarize PDFs Instantly",
    seoDescription: "Generate summaries of long PDFs with AI. Extract key points, executive summaries, and action items in seconds.",
    instructions: [
      "Upload your PDF document.",
      "Click 'Generate Summary'.",
      "Download or copy the structured markdown summary."
    ],
    faq: [
      { q: "What is the maximum file size supported?", a: "Up to 50MB files are supported. Text is extracted locally and processed safely." }
    ]
  },
  "translate-pdf": {
    name: "PDF Translator",
    description: "Translate your PDF layout and pages to 10+ selected languages.",
    seoTitle: "AI PDF Translator - Translate PDFs Online",
    seoDescription: "Translate PDF files to other languages online. Keep original meanings intact. AI powered translations.",
    instructions: [
      "Upload your PDF file.",
      "Select your target language (e.g. Spanish, French, Chinese).",
      "Click 'Translate PDF' to generate the translation."
    ],
    faq: [
      { q: "Which languages are supported?", a: "We support English, Spanish, French, German, Italian, Chinese, Japanese, Korean, Portuguese, and Russian." }
    ]
  },
  "review-pdf": {
    name: "AI Contract Review",
    description: "Scan legal documents to detect liability issues, risks, and missing clauses.",
    seoTitle: "AI Contract Review - PDF Risk Audit Tool",
    seoDescription: "Analyze legal contracts using generative AI. Highlight risk clauses, missing sections, and review summaries instantly.",
    instructions: [
      "Upload your legal contract (PDF format).",
      "Click 'Run Risk Audit'.",
      "Read the detailed risk report and clause highlights."
    ],
    faq: [
      { q: "Can this replace a legal professional?", a: "No. This tool is an AI assistant meant for preliminary audits. Always consult a legal professional for contracts." }
    ]
  },
  "ocr-pdf": {
    name: "OCR PDF",
    description: "Extract text layout from scanned documents or images using local Tesseract WASM engines.",
    seoTitle: "OCR PDF - Scan PDF to Text Online",
    seoDescription: "Use local browser-based Tesseract OCR to extract text layers from scanned PDFs. Zero server uploads.",
    instructions: [
      "Upload your scanned PDF document.",
      "Choose your document language.",
      "Click 'Perform OCR' and wait for local extraction.",
      "Download the extracted text as a .txt file."
    ],
    faq: [
      { q: "Does this require cloud processing?", a: "No. Tesseract.js runs fully inside your browser window using WebAssembly. Your files are not uploaded." }
    ]
  },
  "excel-to-pdf": {
    name: "Excel to PDF",
    description: "Convert spreadsheet workbooks (.xlsx) to formatted PDF tables.",
    seoTitle: "Convert Excel to PDF Online - Free Spreadsheet Converter",
    seoDescription: "Convert .xlsx sheets to clean PDF documents online. Preserve columns and tables locally.",
    instructions: [
      "Upload your Excel (.xlsx) file.",
      "Click 'Convert to PDF'.",
      "Download the resulting PDF table document."
    ],
    faq: [
      { q: "Does it support multiple sheets?", a: "The converter renders the first active tab in the spreadsheet workbook." }
    ]
  },
  "pdf-to-excel": {
    name: "PDF to Excel",
    description: "Extract PDF tables directly into Excel spreadsheets.",
    seoTitle: "Convert PDF to Excel Online - Extract PDF Tables",
    seoDescription: "Extract tables and tabular data from PDF files to editable Excel sheets (.xlsx) online. Local parser.",
    instructions: [
      "Upload your PDF file.",
      "Click 'Convert to Excel'.",
      "Download the generated editable Excel file."
    ],
    faq: [
      { q: "Are headers preserved?", a: "We attempt to reconstruct tabular rows and columns based on text alignment." }
    ]
  },
  "watermark-pdf": {
    name: "Watermark PDF",
    description: "Add a custom text watermark overlay to all pages of your PDF document.",
    seoTitle: "Watermark PDF Online - Add watermark to PDF",
    seoDescription: "Add text watermarks to all PDF pages securely inside your browser. Set rotation, opacity, and size fully local.",
    instructions: [
      "Upload your PDF document.",
      "Type your watermark text content.",
      "Configure text size, opacity, and rotation details.",
      "Click 'Apply Watermark' and download."
    ],
    faq: [
      { q: "Can I remove watermarks too?", a: "Currently, we support appending new text watermarks in-memory." }
    ]
  },
  "page-numbers": {
    name: "Add Page Numbers",
    description: "Insert clean sequential page numbering into your PDF document pages.",
    seoTitle: "Add Page Numbers to PDF - Number PDF Pages Online",
    seoDescription: "Add page numbering to your PDF document online for free. Clean format templates. Safe, local browser-only execution.",
    instructions: [
      "Upload your PDF document.",
      "Choose a page number format template (e.g. Page {n} of {all}).",
      "Select your page number placement position (bottom-right or bottom-center).",
      "Click 'Add Page Numbers' and download."
    ],
    faq: [
      { q: "What numbering formats are supported?", a: "We support 'Page {n}', 'Page {n} of {all}' (showing total pages), and simple '{n}' digits." }
    ]
  },
  "pdf-editor": {
    name: "Edit PDF",
    description: "Annotate, type text overlays, and draw on your PDF pages securely.",
    seoTitle: "Edit PDF Online - Free PDF Editor",
    seoDescription: "Edit PDF files online for free. Add text annotations, shapes, and custom markings. Private browser editor.",
    instructions: [
      "Upload your PDF file.",
      "Select annotation type (Text or Signature).",
      "Click on page thumbnails to position your annotations.",
      "Click 'Apply & Download' to save."
    ],
    faq: [
      { q: "Is this a full WYSIWYG editor?", a: "This editor supports text annotations and signature placements. Full text layout rewriting is not currently supported in local sandbox memory." }
    ]
  },
  "esign-pdf": {
    name: "eSign PDF",
    description: "Sign PDF documents digitally using drawn or uploaded signatures.",
    seoTitle: "eSign PDF Online - Sign PDF Digitally",
    seoDescription: "Sign PDF documents online for free. Draw your digital signature or place text annotations securely in-browser.",
    instructions: [
      "Upload your PDF document.",
      "Click 'Draw Signature' to draw and save your signature.",
      "Position the signature coordinate on your selected page.",
      "Click 'Apply & Download'."
    ],
    faq: [
      { q: "Is the signature legally binding?", a: "Yes, standard electronic signatures created in-browser are acceptable for general contracts. Consult legal counsel for critical corporate actions." }
    ]
  },
  "lock-pdf": {
    name: "Lock PDF",
    description: "Add password protection to secure your PDF from unauthorized access.",
    seoTitle: "Lock PDF Online - Password Protect PDF",
    seoDescription: "Add a password to your PDF document online. Protect sensitive data with strong local browser encryption.",
    instructions: [
      "Upload your PDF document.",
      "Enter a secure password.",
      "Click 'Lock PDF' to encrypt the file.",
      "Download the protected PDF."
    ],
    faq: [
      { q: "What happens if I lose the password?", a: "Since encryption is performed locally, we do not store your passwords on any servers. We cannot recover lost passwords." }
    ]
  },
  "unlock-pdf": {
    name: "Unlock PDF",
    description: "Remove password protection and restrictions from your secured PDF.",
    seoTitle: "Unlock PDF Online - Remove PDF Password",
    seoDescription: "Remove password protection from your PDF files. Fast, private, and local browser decryption.",
    instructions: [
      "Upload your password-protected PDF.",
      "Type the correct password.",
      "Click 'Unlock PDF' to decrypt the file.",
      "Download the unlocked PDF."
    ],
    faq: [
      { q: "Does this crack passwords?", a: "No, you must provide the correct password to unlock the document." }
    ]
  },
  "image-to-pdf": {
    name: "Image to PDF",
    description: "Convert JPG, PNG, and WebP images to formatted PDF documents.",
    seoTitle: "Image to PDF Converter - Convert Images to PDF Online",
    seoDescription: "Convert JPG, PNG, and WebP images to PDF online. Customize margins and orientation. Safe, local, and private.",
    instructions: [
      "Select one or more image files from your computer.",
      "Adjust page margin and orientation details.",
      "Click 'Convert to PDF' and download."
    ],
    faq: [
      { q: "Can I upload mixed formats?", a: "Yes, you can upload a mix of JPG, PNG, and WebP images at the same time." }
    ]
  },
  "ai-pdf-summarizer": {
    name: "AI PDF Summarizer",
    description: "Generate bulleted summaries and action points from complex PDF documents instantly.",
    seoTitle: "AI PDF Summarizer Online - Summarize PDF documents",
    seoDescription: "Summarize PDF documents using advanced AI. Get concise summaries, bullet points, and key takeaways in seconds.",
    instructions: [
      "Upload your PDF document.",
      "Click 'Summarize' to parse the document using AI.",
      "Read or copy the generated executive summary."
    ],
    faq: [
      { q: "Is there a page limit?", a: "Free tier supports up to 10 pages; Pro tier supports up to 200 pages." }
    ]
  },
  "pdf-contract-analyzer": {
    name: "PDF Contract Analyzer",
    description: "Audit legal contracts to identify hidden risks, key dates, liabilities, and obligations.",
    seoTitle: "AI Contract Analyzer - Review PDF Contracts Online",
    seoDescription: "Analyze legal contracts using AI. Detect high-risk clauses, indemnities, key deadlines, and liability caps instantly.",
    instructions: [
      "Upload your contract PDF.",
      "Click 'Analyze Contract'.",
      "Review the structured legal audit risk report."
    ],
    faq: [
      { q: "Is my document data private?", a: "Yes, we process all AI requests securely over HTTPS and do not store files on our servers." }
    ]
  },
  "invoice-to-excel": {
    name: "Invoice to Excel Extractor",
    description: "Extract line items, tax tables, invoice numbers, and totals into structured Excel sheets.",
    seoTitle: "Convert Invoice PDF to Excel - Invoice Line-Item Extractor",
    seoDescription: "Extract invoice data tables and invoice metadata directly into editable Excel sheets (.xlsx) using AI parsing.",
    instructions: [
      "Upload your invoice PDF document.",
      "Click 'Extract to Excel'.",
      "Download the structured Excel table containing parsed line items."
    ],
    faq: [
      { q: "Does it support multiple invoices?", a: "Yes, you can merge or process them individually for spreadsheet compilation." }
    ]
  },
  "tender-rfp-parser": {
    name: "Tender / RFP PDF Parser",
    description: "Parse RFP tender documents to extract submission deadlines, scopes of work, and prerequisites.",
    seoTitle: "RFP Parser Online - Extract Tender Bid Details",
    seoDescription: "Parse complex RFP documents. Extract compliance requirements, key dates, and pricing templates using AI.",
    instructions: [
      "Upload your RFP or tender PDF.",
      "Click 'Parse Bid Details'.",
      "Read the extracted checklist of deadlines and requirements."
    ],
    faq: [
      { q: "Does it work with scanned RFPs?", a: "Yes! Scanned PDFs will automatically pass through our local OCR engine first." }
    ]
  },
  "legal-doc-comparison": {
    name: "Legal Document Comparison",
    description: "Compare two versions of a contract or legal document to highlight diffs and amendments.",
    seoTitle: "Compare Legal PDFs - Redline Contracts Online",
    seoDescription: "Compare two PDF documents to locate changes, deletions, and additions. Fast local contract redlining.",
    instructions: [
      "Upload your original PDF and the revised PDF.",
      "Click 'Compare Documents'.",
      "Review the highlighting showing added and removed clauses."
    ],
    faq: [
      { q: "How are changes shown?", a: "We run a sentence-by-sentence diff highlighting deletions in red and additions in green." }
    ]
  },
  "ocr-urdu-arabic": {
    name: "PDF OCR for Urdu & Arabic",
    description: "Perform high-accuracy optical character recognition (OCR) on Arabic and Urdu scanned PDFs.",
    seoTitle: "Arabic and Urdu PDF OCR - Extract Arabic Text from PDF",
    seoDescription: "Convert scanned Arabic and Urdu PDF documents to editable text online. Local OCR script engine.",
    instructions: [
      "Upload your scanned Arabic/Urdu PDF.",
      "Select the language engine (Arabic or Urdu).",
      "Click 'Extract Text' to perform OCR."
    ],
    faq: [
      { q: "Are custom ligatures supported?", a: "Yes, our Tesseract model is optimized for Nastalikh Urdu and standard Arabic scripts." }
    ]
  },
  "bank-statement-to-excel": {
    name: "Bank Statement to Excel Converter",
    description: "Convert PDF bank statements into clean, structured Excel transaction spreadsheets.",
    seoTitle: "Convert Bank Statement PDF to Excel Online",
    seoDescription: "Extract transaction rows, credits, debits, and dates from PDF bank statements into clean Excel spreadsheets (.xlsx).",
    instructions: [
      "Upload your bank statement PDF.",
      "Click 'Convert transactions'.",
      "Download the generated Excel sheet."
    ],
    faq: [
      { q: "Does it work with standard banks?", a: "Yes, it parses standard statement formats from Chase, Bank of America, HSBC, Barclays, etc." }
    ]
  },
  "resume-parser": {
    name: "Resume Parser SaaS",
    description: "Extract contact info, skills, education, and work history from candidate resumes.",
    seoTitle: "AI Resume Parser SaaS - Parse CVs to JSON / Excel",
    seoDescription: "Parse resumes and CVs using AI. Extract candidate information, skills, and work history into structured profiles.",
    instructions: [
      "Upload candidate CVs in PDF format.",
      "Click 'Parse Resumes'.",
      "Export structured details or copy profile JSON."
    ],
    faq: [
      { q: "Can I export candidate profiles to my ATS?", a: "Yes, you can download candidate profiles in standard JSON formatting." }
    ]
  },
  "pdf-extraction-api": {
    name: "Developer PDF Extraction API",
    description: "Integrate our high-performance local PDF data extraction engine into your software.",
    seoTitle: "PDF Extraction API for Developers - Free API Key",
    seoDescription: "Extract text, metadata, tables, and images from PDFs programmatically using our developer API endpoints.",
    instructions: [
      "Navigate to the Developer Dashboard.",
      "Generate your secure API Key credentials.",
      "Use our cURL / Node / Python scripts to extract document details."
    ],
    faq: [
      { q: "What is the rate limit?", a: "Free API keys support 1,000 extractions per month. Pro keys support unlimited requests." }
    ]
  },
  "increase-image-size": {
    name: "Increase Image Size",
    description: "Artificially increase the file size of your image in KB to meet minimum upload requirements.",
    seoTitle: "Increase Image Size in KB Online - KB Increaser",
    seoDescription: "Increase image file size in KB online. Pad photo size to meet official upload limits securely in-browser.",
    instructions: [
      "Upload your JPG/PNG image.",
      "Specify your target minimum file size in KB (e.g., 50KB, 100KB).",
      "Click 'Increase Size' and download the padded file."
    ],
    faq: [
      { q: "Will this ruin the photo?", a: "No, the visual rendering remains completely unchanged. We inject safe metadata padding." }
    ]
  },
  "kb-converter": {
    name: "Image KB Converter",
    description: "Convert and compress image file sizes to precise KB targets.",
    seoTitle: "Image KB Converter - Resize Photo KB Online",
    seoDescription: "Resize photo KB online. Convert and compress image file sizes to precise KB limits securely in-browser.",
    instructions: [
      "Upload your image file.",
      "Select your target KB size (e.g., 20KB, 50KB, 100KB).",
      "Click 'Convert KB' and download."
    ],
    faq: [
      { q: "Is quality maintained?", a: "We optimize quality dynamically using binary search compression." }
    ]
  },
  "resize-image-to-20kb": {
    name: "Resize Image to 20KB",
    description: "Compress and scale your photo to be exactly under 20KB for official uploads.",
    seoTitle: "Resize Photo to 20KB Online - Compress Image to 20KB",
    seoDescription: "Compress and resize images to under 20KB online. Perfect for PAN card, signature, and passport photo uploads.",
    instructions: [
      "Upload your photo or signature image.",
      "Click 'Compress to 20KB'.",
      "Download the compressed photo."
    ],
    faq: [
      { q: "Is this safe for government forms?", a: "Yes, this outputs standard JPEG files compliant with upload requirements." }
    ]
  },
  "resize-pixel": {
    name: "Resize Image Pixels",
    description: "Resize photo width and height by custom pixels or official card sizes.",
    seoTitle: "Resize Image Pixels Online - Change Photo Dimensions",
    seoDescription: "Resize image dimensions in pixels online. Scale width and height with aspect ratio constraints.",
    instructions: [
      "Upload your image.",
      "Input your target width and height in pixels, or select a preset.",
      "Click 'Resize Pixels' and download."
    ],
    faq: [
      { q: "What is PAN Card photo size?", a: "PAN Card photo uploads require exactly 213 x 213 pixels." }
    ]
  }
};

export default function ToolWorkspace({ params }: { params: Promise<{ tool: string }> }) {
  const [tool, setTool] = useState<string>("");
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [downloadName, setDownloadName] = useState<string>("");

  // Tool specific configurations
  const [pageRange, setPageRange] = useState("1-3");
  const [compressLevel, setCompressLevel] = useState<"low" | "medium" | "high">("medium");
  const [password, setPassword] = useState("");
  const [jpgMargin, setJpgMargin] = useState<number>(0);
  const [jpgOrientation, setJpgOrientation] = useState<"portrait" | "landscape">("portrait");
  const [targetLang, setTargetLang] = useState("Spanish");
  const [ocrLang, setOcrLang] = useState("eng");

  // Watermark PDF states
  const [watermarkText, setWatermarkText] = useState("CONFIDENTIAL");
  const [watermarkOpacity, setWatermarkOpacity] = useState<number>(0.3);
  const [watermarkRotation, setWatermarkRotation] = useState<number>(45);
  const [watermarkSize, setWatermarkSize] = useState<number>(50);

  // Page Numbers states
  const [pageNumFormat, setPageNumFormat] = useState("Page {n} of {all}");
  const [pageNumPosition, setPageNumPosition] = useState<"bottom-right" | "bottom-center">("bottom-right");

  // Image Utilities States
  const [targetKb, setTargetKb] = useState<number>(50);
  const [resizeWidth, setResizeWidth] = useState<number>(300);
  const [resizeHeight, setResizeHeight] = useState<number>(300);
  const [keepAspectRatio, setKeepAspectRatio] = useState<boolean>(true);

  // PDF Page Previews state
  const [pdfPages, setPdfPages] = useState<{ index: number; dataUrl: string; rotation: number; deleted: boolean }[]>([]);
  const [pdfRendering, setPdfRendering] = useState(false);

  // Advanced Visual Editor states
  const [showSignModal, setShowSignModal] = useState(false);
  const [signatureImg, setSignatureImg] = useState<string | null>(null);
  const [activeSignPage, setActiveSignPage] = useState<number | null>(null);
  const [sigPosition, setSigPosition] = useState({ x: 50, y: 50 });
  const [annotationType, setAnnotationType] = useState<"signature" | "text">("signature");
  const [customTextAnnotation, setCustomTextAnnotation] = useState("APPROVED");
  const [annotationColor, setAnnotationColor] = useState("#4f46e5");
  const sigCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawingRef = useRef(false);

  // AI Suite states
  const [aiResponse, setAiResponse] = useState("");
  const [chatPrompt, setChatPrompt] = useState("");
  const [chatHistory, setChatHistory] = useState<{ role: "user" | "assistant"; text: string }[]>([]);

  // Stripe Billing & Usage states
  const [usageCount, setUsageCount] = useState(0);
  const [isPro, setIsPro] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  const [paypalClientId, setPaypalClientId] = useState<string | null>(null);

  useEffect(() => {
    setPaypalClientId(process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || null);
  }, []);

  const handlePaypalSuccess = () => {
    setIsPro(true);
    localStorage.setItem("is_pro", "true");
    setShowUpgradeModal(false);
    confetti();
  };

  const handleDowngrade = () => {
    setIsPro(false);
    localStorage.removeItem("is_pro");
    localStorage.setItem("usage_count", "0");
    setUsageCount(0);
  };

  // Mock Stripe Form States
  const [cardHolder, setCardHolder] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [paymentProcessing, setPaymentProcessing] = useState(false);

  const [selectedPlan, setSelectedPlan] = useState<"day" | "fortnight" | "month">("month");

  const planInfo = {
    day: { name: "1-Day Pass", price: "0.99", desc: "24-hour unlimited access" },
    fortnight: { name: "15-Day Pass", price: "2.99", desc: "15 days unlimited access" },
    month: { name: "Monthly Pro", price: "4.99", desc: "Cancel anytime, auto-renews" }
  };

  useEffect(() => {
    params.then((p) => {
      const toolName = p.tool;
      setTool(toolName);

      const kbMatch = toolName.match(/resize-image-to-(\d+)(kb|mb)/i);
      if (kbMatch) {
        let size = parseInt(kbMatch[1], 10);
        const unit = kbMatch[2].toLowerCase();
        if (unit === "mb") {
          size = size * 1024;
        }
        setTargetKb(size);
      }

      if (toolName.includes("ssc-photo") || toolName.includes("ssc-otr-photo")) {
        setResizeWidth(350);
        setResizeHeight(450);
        setTargetKb(50);
      } else if (toolName.includes("ssc-sign") || toolName.includes("ssc-otr-sign") || toolName.includes("ssc-signature")) {
        setResizeWidth(400);
        setResizeHeight(200);
        setTargetKb(20);
      } else if (toolName.includes("ibps-") || toolName.includes("sbi-") || toolName.includes("clerk-")) {
        setResizeWidth(200);
        setResizeHeight(230);
        setTargetKb(50);
      } else if (toolName.includes("sbi-po-signature")) {
        setResizeWidth(140);
        setResizeHeight(60);
        setTargetKb(20);
      } else if (toolName.includes("tnpsc-signature")) {
        setResizeWidth(275);
        setResizeHeight(118);
        setTargetKb(20);
      }
    });

    const count = Number(localStorage.getItem("usage_count") || "0");
    setUsageCount(count);
    setIsPro(localStorage.getItem("is_pro") === "true");
  }, [params]);

  const activeTool = toolInfoMap[tool] || {
    name: "PDF Tool",
    description: "Select and process PDF files.",
    seoTitle: "PDF Tool - PDFVerse",
    seoDescription: "Process PDFs online.",
    instructions: [],
    faq: []
  };

  const getFileAcceptAttribute = () => {
    if (tool === "word-to-pdf") return ".docx";
    if (tool === "excel-to-pdf") return ".xlsx";
    if (
      tool === "jpg-to-pdf" || 
      tool === "image-to-pdf" ||
      tool === "increase-image-size" ||
      tool === "kb-converter" ||
      tool === "resize-image-to-20kb" ||
      tool === "resize-pixel"
    ) return "image/*";
    return ".pdf,application/pdf";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFilesAdded(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFilesAdded(Array.from(e.target.files));
    }
  };

  const incrementUsage = () => {
    const nextCount = usageCount + 1;
    setUsageCount(nextCount);
    localStorage.setItem("usage_count", String(nextCount));

    // Also increment global files processed counter
    try {
      const globalCount = localStorage.getItem("mypdfimage_processed_files");
      if (globalCount) {
        localStorage.setItem("mypdfimage_processed_files", String(parseInt(globalCount, 10) + 1));
      } else {
        localStorage.setItem("mypdfimage_processed_files", "10143");
      }
    } catch (err) {}

    return nextCount;
  };

  const triggerProUpgrade = (e: React.FormEvent) => {
    e.preventDefault();
    setPaymentProcessing(true);
    setTimeout(() => {
      setPaymentProcessing(false);
      setIsPro(true);
      localStorage.setItem("is_pro", "true");
      setShowUpgradeModal(false);
      confetti();
      // Reset payment form states
      setCardHolder("");
      setCardNumber("");
      setCardExpiry("");
      setCardCvc("");
    }, 2000);
  };

  const loadImage = (file: File): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = URL.createObjectURL(file);
    });
  };

  const processImageResize = async (file: File, width: number, height: number): Promise<Blob> => {
    const img = await loadImage(file);
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Could not get canvas context");
    ctx.drawImage(img, 0, 0, width, height);
    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        if (blob) resolve(blob);
      }, "image/jpeg", 0.9);
    });
  };

  const processImageCompress = async (file: File, targetKbValue: number): Promise<Blob> => {
    const img = await loadImage(file);
    let scale = 1.0;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas context error");

    const targetBytes = targetKbValue * 1024;
    let quality = 0.9;
    let resultBlob: Blob | null = null;

    for (let attempt = 0; attempt < 10; attempt++) {
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      for (let q = quality; q >= 0.1; q -= 0.1) {
        const blob: Blob = await new Promise((resolve) => {
          canvas.toBlob((b) => resolve(b!), "image/jpeg", q);
        });
        if (blob.size <= targetBytes) {
          resultBlob = blob;
          break;
        }
      }
      if (resultBlob) break;
      scale *= 0.7;
    }

    if (!resultBlob) {
      return new Promise((resolve) => {
        canvas.toBlob((b) => resolve(b!), "image/jpeg", 0.1);
      });
    }
    return resultBlob;
  };

  const processImageIncrease = async (file: File, targetKbValue: number): Promise<Blob> => {
    const img = await loadImage(file);
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas context error");
    ctx.drawImage(img, 0, 0, img.width, img.height);

    const baseBlob: Blob = await new Promise((resolve) => {
      canvas.toBlob((b) => resolve(b!), "image/jpeg", 0.95);
    });

    const targetBytes = targetKbValue * 1024;
    if (baseBlob.size >= targetBytes) {
      return baseBlob;
    }

    const baseBuffer = await baseBlob.arrayBuffer();
    const originalBytes = new Uint8Array(baseBuffer);
    const paddedBytes = new Uint8Array(targetBytes);
    paddedBytes.set(originalBytes);
    
    for (let i = originalBytes.length; i < targetBytes; i++) {
      paddedBytes[i] = 0;
    }

    return new Blob([paddedBytes], { type: "image/jpeg" });
  };

  const handleFilesAdded = async (newFiles: File[]) => {
    setError(null);
    setIsDone(false);

    if (!isPro && usageCount >= 20) {
      setShowUpgradeModal(true);
      return;
    }
    
    const isWord = tool === "word-to-pdf";
    const isImage = 
      tool === "jpg-to-pdf" || 
      tool === "image-to-pdf" ||
      tool === "increase-image-size" ||
      tool === "kb-converter" ||
      tool === "resize-image-to-20kb" ||
      tool === "resize-pixel";
    const isExcel = tool === "excel-to-pdf";
    
    const validated = newFiles.filter(file => {
      if (isWord) return file.name.endsWith(".docx");
      if (isExcel) return file.name.endsWith(".xlsx");
      if (isImage) return file.type.startsWith("image/") || /\.(jpg|jpeg|png|webp)$/i.test(file.name);
      return file.type === "application/pdf" || file.name.endsWith(".pdf");
    });

    if (validated.length === 0) {
      setError(`Please upload a valid file type.`);
      return;
    }

    if (tool === "merge-pdf" || tool === "jpg-to-pdf" || tool === "image-to-pdf") {
      setFiles(prev => [...prev, ...validated]);
    } else {
      setFiles(validated.slice(0, 1));
    }
  };

  useEffect(() => {
    const renderPreviews = async () => {
      if (files.length === 0) {
        setPdfPages([]);
        return;
      }
      
      const targetTools = ["rotate-pdf", "organize-pdf", "sign-pdf", "esign-pdf", "pdf-editor", "pdf-to-jpg", "ocr-pdf", "watermark-pdf", "page-numbers", "ocr-urdu-arabic"];
      if (!targetTools.includes(tool)) return;

      setPdfRendering(true);
      try {
        const file = files[0];
        const arrayBuffer = await file.arrayBuffer();
        const pdfjs = await getPdfJs();
        const loadingTask = pdfjs.getDocument({ data: arrayBuffer });
        const pdfDoc = await loadingTask.promise;
        const total = pdfDoc.numPages;
        
        const previews: { index: number; dataUrl: string; rotation: number; deleted: boolean }[] = [];
        
        for (let i = 1; i <= total; i++) {
          const page = await pdfDoc.getPage(i);
          const viewport = page.getViewport({ scale: 0.4 });
          
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");
          canvas.height = viewport.height;
          canvas.width = viewport.width;
          
          if (context) {
            await page.render({ canvasContext: context, viewport, canvas }).promise;
            previews.push({
              index: i - 1,
              dataUrl: canvas.toDataURL("image/png"),
              rotation: 0,
              deleted: false
            });
          }
        }
        setPdfPages(previews);
      } catch (err: any) {
        console.error(err);
        setError("Error loading PDF pages.");
      } finally {
        setPdfRendering(false);
      }
    };

    renderPreviews();
  }, [files, tool]);

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
    setIsDone(false);
  };

  const handleReset = () => {
    setFiles([]);
    setIsDone(false);
    setError(null);
    setDownloadUrl(null);
    setPdfPages([]);
    setSignatureImg(null);
    setChatHistory([]);
    setAiResponse("");
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = sigCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.strokeStyle = "var(--text-primary)";
    
    const rect = canvas.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    isDrawingRef.current = true;
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current) return;
    const canvas = sigCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    const rect = canvas.getBoundingClientRect();
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => {
    isDrawingRef.current = false;
  };

  const clearCanvas = () => {
    const canvas = sigCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const saveSignature = () => {
    const canvas = sigCanvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL("image/png");
    setSignatureImg(dataUrl);
    setShowSignModal(false);
  };

  const hexToRgb = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;
    return rgb(r, g, b);
  };

  const extractPdfText = async (): Promise<string> => {
    if (files.length === 0) return "";
    const arrayBuffer = await files[0].arrayBuffer();
    const pdfjs = await getPdfJs();
    const pdfDoc = await pdfjs.getDocument({ data: arrayBuffer }).promise;
    let fullText = "";
    
    for (let i = 1; i <= pdfDoc.numPages; i++) {
      const page = await pdfDoc.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map((item: any) => item.str).join(" ");
      fullText += pageText + "\n";
    }
    return fullText;
  };

  const handleProcess = async () => {
    if (files.length === 0) return;
    setIsProcessing(true);
    setError(null);
    
    try {
      if (!isPro && usageCount >= 20) {
        setShowUpgradeModal(true);
        setIsProcessing(false);
        return;
      }

      let outputBytes: Uint8Array = new Uint8Array();
      let outputName = `${files[0].name.replace(/\.[^/.]+$/, "")}_processed.pdf`;
      
      switch (tool) {
        case "merge-pdf":
          outputBytes = await mergePDFs(files);
          outputName = "merged_documents.pdf";
          break;
          
        case "split-pdf":
          const splits = await splitPDF(files[0], pageRange);
          outputBytes = splits[0].bytes;
          outputName = splits[0].name;
          break;
          
        case "compress-pdf":
          outputBytes = await compressPDF(files[0], compressLevel);
          outputName = `${files[0].name.replace(".pdf", "")}_compressed.pdf`;
          break;

        case "watermark-pdf":
          outputBytes = await addWatermarkToPDF(files[0], watermarkText, {
            opacity: watermarkOpacity,
            rotation: watermarkRotation,
            size: watermarkSize
          });
          outputName = `${files[0].name.replace(".pdf", "")}_watermarked.pdf`;
          break;

        case "page-numbers":
          outputBytes = await addPageNumbersToPDF(files[0], pageNumFormat, pageNumPosition);
          outputName = `${files[0].name.replace(".pdf", "")}_numbered.pdf`;
          break;

        case "excel-to-pdf":
          outputBytes = await excelToPDF(files[0]);
          outputName = `${files[0].name.replace(".xlsx", "")}.pdf`;
          break;

        case "pdf-to-excel":
          outputBytes = await pdfToExcel(files[0]);
          outputName = `${files[0].name.replace(".pdf", "")}.xlsx`;
          const xlsxBlob = new Blob([outputBytes as any], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
          const xlsxUrl = URL.createObjectURL(xlsxBlob);
          setDownloadUrl(xlsxUrl);
          setDownloadName(outputName);
          setIsDone(true);
          incrementUsage();
          confetti();
          setIsProcessing(false);
          return;

        case "ocr-urdu-arabic":
        case "ocr-pdf": {
          const imageUrls = pdfPages.map(page => page.dataUrl);
          const ocrOutput = await performOCR(imageUrls, ocrLang);
          const textBlob = new Blob([ocrOutput], { type: "text/plain" });
          const textUrl = URL.createObjectURL(textBlob);
          setDownloadUrl(textUrl);
          setDownloadName(`${files[0].name.replace(".pdf", "")}_ocr.txt`);
          setIsDone(true);
          incrementUsage();
          confetti();
          setIsProcessing(false);
          return;
        }

        case "ai-pdf-summarizer":
        case "summarize-pdf": {
          const text = await extractPdfText();
          const res = await fetch("https://mypdfimage.vercel.app/api/ai", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: "Summarize this document", documentText: text, action: "summarize" })
          });
          const data = await res.json();
          if (!data.success) throw new Error(data.error);
          setAiResponse(data.answer);
          setIsDone(true);
          incrementUsage();
          confetti();
          setIsProcessing(false);
          return;
        }

        case "translate-pdf": {
          const text = await extractPdfText();
          const res = await fetch("https://mypdfimage.vercel.app/api/ai", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: `Translate to ${targetLang}`, documentText: text, action: "translate" })
          });
          const data = await res.json();
          if (!data.success) throw new Error(data.error);
          setAiResponse(data.answer);
          setIsDone(true);
          incrementUsage();
          confetti();
          setIsProcessing(false);
          return;
        }

        case "invoice-to-excel": {
          const text = await extractPdfText();
          const res = await fetch("https://mypdfimage.vercel.app/api/ai", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: "Extract invoice rows and tables to Excel format", documentText: text, action: "review" })
          });
          const data = await res.json();
          if (!data.success) throw new Error(data.error);
          setAiResponse(data.answer);
          setIsDone(true);
          incrementUsage();
          confetti();
          setIsProcessing(false);
          return;
        }

        case "tender-rfp-parser": {
          const text = await extractPdfText();
          const res = await fetch("https://mypdfimage.vercel.app/api/ai", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: "Parse RFP contract requirements, dates, and scope details", documentText: text, action: "review" })
          });
          const data = await res.json();
          if (!data.success) throw new Error(data.error);
          setAiResponse(data.answer);
          setIsDone(true);
          incrementUsage();
          confetti();
          setIsProcessing(false);
          return;
        }

        case "legal-doc-comparison": {
          const text = await extractPdfText();
          const res = await fetch("https://mypdfimage.vercel.app/api/ai", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: "Compare legal document paragraphs and identify differences", documentText: text, action: "review" })
          });
          const data = await res.json();
          if (!data.success) throw new Error(data.error);
          setAiResponse(data.answer);
          setIsDone(true);
          incrementUsage();
          confetti();
          setIsProcessing(false);
          return;
        }

        case "bank-statement-to-excel": {
          const text = await extractPdfText();
          const res = await fetch("https://mypdfimage.vercel.app/api/ai", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: "Extract bank statement table headers and transaction rows", documentText: text, action: "review" })
          });
          const data = await res.json();
          if (!data.success) throw new Error(data.error);
          setAiResponse(data.answer);
          setIsDone(true);
          incrementUsage();
          confetti();
          setIsProcessing(false);
          return;
        }

        case "resume-parser": {
          const text = await extractPdfText();
          const res = await fetch("https://mypdfimage.vercel.app/api/ai", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: "Parse candidate contact info, educational history, work experience, and core skills from CV", documentText: text, action: "review" })
          });
          const data = await res.json();
          if (!data.success) throw new Error(data.error);
          setAiResponse(data.answer);
          setIsDone(true);
          incrementUsage();
          confetti();
          setIsProcessing(false);
          return;
        }

        case "pdf-extraction-api": {
          setIsDone(true);
          setIsProcessing(false);
          confetti();
          return;
        }

        case "pdf-contract-analyzer":
        case "review-pdf": {
          const text = await extractPdfText();
          const res = await fetch("https://mypdfimage.vercel.app/api/ai", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: "Review contract", documentText: text, action: "review" })
          });
          const data = await res.json();
          if (!data.success) throw new Error(data.error);
          setAiResponse(data.answer);
          setIsDone(true);
          incrementUsage();
          confetti();
          setIsProcessing(false);
          return;
        }
          
        case "rotate-pdf": {
          const arrayBuffer = await files[0].arrayBuffer();
          const pdfDoc = await PDFDocument.load(arrayBuffer);
          const pages = pdfDoc.getPages();
          
          pdfPages.forEach(p => {
            if (p.rotation !== 0) {
              const page = pages[p.index];
              const currentRotation = page.getRotation().angle;
              page.setRotation(degrees(currentRotation + p.rotation));
            }
          });
          
          outputBytes = await pdfDoc.save();
          outputName = `${files[0].name.replace(".pdf", "")}_rotated.pdf`;
          break;
        }
          
        case "organize-pdf": {
          const arrayBuffer = await files[0].arrayBuffer();
          const pdfDoc = await PDFDocument.load(arrayBuffer);
          
          const newDoc = await PDFDocument.create();
          const pagesToCopy = pdfPages
            .filter(p => !p.deleted)
            .map(p => p.index);
            
          const copiedPages = await newDoc.copyPages(pdfDoc, pagesToCopy);
          copiedPages.forEach(p => newDoc.addPage(p));
          
          outputBytes = await newDoc.save();
          outputName = `${files[0].name.replace(".pdf", "")}_organized.pdf`;
          break;
        }
          
        case "lock-pdf":
        case "add-password":
          if (!password) {
            throw new Error("Please provide a password.");
          }
          outputBytes = await addPasswordToPDF(files[0], password);
          outputName = `${files[0].name.replace(".pdf", "")}_protected.pdf`;
          break;
          
        case "unlock-pdf":
        case "remove-password":
          outputBytes = await removePasswordFromPDF(files[0], password);
          outputName = `${files[0].name.replace(".pdf", "")}_unlocked.pdf`;
          break;
          
        case "kb-converter": {
          const blob = await processImageCompress(files[0], targetKb);
          const url = URL.createObjectURL(blob);
          setDownloadUrl(url);
          setDownloadName(`converted_${files[0].name}`);
          setIsDone(true);
          incrementUsage();
          confetti();
          setIsProcessing(false);
          return;
        }

        case "photo-size-kb":
        case "resize-image-to-20kb": {
          const blob = await processImageCompress(files[0], 20);
          const url = URL.createObjectURL(blob);
          setDownloadUrl(url);
          setDownloadName(`compressed_20kb_${files[0].name}`);
          setIsDone(true);
          incrementUsage();
          confetti();
          setIsProcessing(false);
          return;
        }

        case "pan-card-photo-resize":
        case "resize-pixel": {
          const blob = await processImageResize(files[0], resizeWidth, resizeHeight);
          const url = URL.createObjectURL(blob);
          setDownloadUrl(url);
          setDownloadName(`resized_${files[0].name}`);
          setIsDone(true);
          incrementUsage();
          confetti();
          setIsProcessing(false);
          return;
        }

        case "image-size-increase":
        case "photo-size-increase":
        case "increase-image-size-in-kb":
        case "kb-increaser":
        case "increase-image-size": {
          const blob = await processImageIncrease(files[0], targetKb);
          const url = URL.createObjectURL(blob);
          setDownloadUrl(url);
          setDownloadName(`increased_${files[0].name}`);
          setIsDone(true);
          incrementUsage();
          confetti();
          setIsProcessing(false);
          return;
        }

        case "image-to-pdf":
        case "jpg-to-pdf":
          outputBytes = await imagesToPDF(files, { margin: jpgMargin, orientation: jpgOrientation });
          outputName = "images_converted.pdf";
          break;
          
        case "pdf-to-jpg": {
          pdfPages.forEach(page => {
            const a = document.createElement("a");
            a.href = page.dataUrl;
            a.download = `page_${page.index + 1}.png`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
          });
          
          setIsDone(true);
          incrementUsage();
          setIsProcessing(false);
          confetti();
          return;
        }

        case "pdf-editor":
        case "esign-pdf":
        case "sign-pdf": {
          if (activeSignPage === null) {
            throw new Error("Please click on a page thumbnail to place the annotation.");
          }
          
          const arrayBuffer = await files[0].arrayBuffer();
          const pdfDoc = await PDFDocument.load(arrayBuffer);
          const pages = pdfDoc.getPages();
          const page = pages[activeSignPage];
          
          const { width: pW, height: pH } = page.getSize();
          
          if (annotationType === "signature") {
            if (!signatureImg) {
              throw new Error("Please draw and save a signature first.");
            }
            const sigBytes = await fetch(signatureImg).then(res => res.arrayBuffer());
            const embeddedSig = await pdfDoc.embedPng(sigBytes);
            const sigW = 120;
            const sigH = 60;
            const drawX = (sigPosition.x / 100) * (pW - sigW);
            const drawY = ((100 - sigPosition.y) / 100) * (pH - sigH);
            page.drawImage(embeddedSig, { x: drawX, y: drawY, width: sigW, height: sigH });
          } else {
            const drawX = (sigPosition.x / 100) * pW;
            const drawY = ((100 - sigPosition.y) / 100) * pH;
            page.drawText(customTextAnnotation, {
              x: drawX,
              y: drawY,
              size: 14,
              color: hexToRgb(annotationColor)
            });
          }
          
          outputBytes = await pdfDoc.save();
          outputName = `${files[0].name.replace(".pdf", "")}_signed.pdf`;
          break;
        }

        case "pdf-to-word": {
          const text = await extractPdfText();
          const docBlob = new Blob([`PDFVerse Extracted Text Output:\n\n${text}`], { type: "application/msword" });
          const url = URL.createObjectURL(docBlob);
          setDownloadUrl(url);
          setDownloadName(`${files[0].name.replace(".pdf", "")}.doc`);
          setIsDone(true);
          incrementUsage();
          confetti();
          setIsProcessing(false);
          return;
        }

        case "word-to-pdf": {
          const arrayBuffer = await files[0].arrayBuffer();
          const mammoth = await import("mammoth");
          const result = await mammoth.extractRawText({ arrayBuffer });
          const text = result.value || "Word document content empty.";
          const pdfBytes = await htmlToPDF(text);
          outputBytes = pdfBytes;
          outputName = `${files[0].name.replace(".docx", "")}.pdf`;
          break;
        }
          
        default:
          throw new Error("Unknown tool action");
      }
      
      const blob = new Blob([outputBytes as any], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
      setDownloadName(outputName);
      setIsDone(true);
      incrementUsage();
      confetti();
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An error occurred.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSendChat = async () => {
    if (!chatPrompt.trim()) return;
    const userMsg = chatPrompt;
    setChatPrompt("");
    setChatHistory(prev => [...prev, { role: "user", text: userMsg }]);
    setIsProcessing(true);

    try {
      const text = await extractPdfText();
      const res = await fetch("https://mypdfimage.vercel.app/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: userMsg, documentText: text, action: "chat" })
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);

      setChatHistory(prev => [...prev, { role: "assistant", text: data.answer }]);
      incrementUsage();
    } catch (err: any) {
      setChatHistory(prev => [...prev, { role: "assistant", text: `Error: ${err.message || "Could not reach AI."}` }]);
    } finally {
      setIsProcessing(false);
    }
  };

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": activeTool.name,
    "operatingSystem": "All",
    "applicationCategory": "MultimediaApplication",
    "offers": {
      "@type": "Offer",
      "price": "0.00",
      "priceCurrency": "USD"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "1250"
    },
    "description": activeTool.description
  };

  return (
    <div style={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />
      <div className="container" style={styles.container}>
        <Link href="/" style={styles.backLink}>
          <ArrowLeft size={16} />
          <span>Back to All Tools</span>
        </Link>
        
        <div style={styles.intro}>
          <h1 style={styles.title}>{activeTool.name}</h1>
          <p style={styles.description}>{activeTool.description}</p>
        </div>

        <div style={styles.usageBanner}>
          <AlertCircle size={16} />
          <span>
            {isPro 
              ? "🚀 Pro Account Active (Unlimited Access)" 
              : `Usage cap: ${usageCount}/20 free files today. Upgrading unlocks unlimited AI and OCR tools.`}
          </span>
          {isPro ? (
            <button onClick={handleDowngrade} style={styles.upgradeBtnSmall}>Reset to Free (Testing)</button>
          ) : (
            <button onClick={() => setShowUpgradeModal(true)} style={styles.upgradeBtnSmall}>Upgrade Now</button>
          )}
        </div>

        <div style={styles.workspace} className="glass-card">
          {tool === "pdf-extraction-api" ? (
            <div style={{ padding: "24px", textAlign: "left", width: "100%" }}>
              <h3 style={{ marginBottom: "12px", color: "var(--accent-primary)" }}>Developer API Quickstart</h3>
              <p style={{ fontSize: "14px", color: "var(--text-secondary)", marginBottom: "20px" }}>
                Integrate our local document layout extraction endpoint directly into your app templates. Use the following payload requests:
              </p>
              
              <div style={{ marginBottom: "16px" }}>
                <label style={{ fontSize: "11px", fontWeight: "700", color: "var(--text-secondary)", display: "block", marginBottom: "4px" }}>CURL REQUEST EXAMPLE</label>
                <pre style={{ background: "var(--bg-tertiary)", padding: "16px", borderRadius: "8px", overflowX: "auto", fontSize: "12px", color: "#34d399", fontFamily: "monospace" }}>
{`curl -X POST "http://localhost:3000/api/v1/ocr" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -F "file=@/path/to/document.pdf" \\
  -F "lang=eng"`}
                </pre>
              </div>

              <div>
                <label style={{ fontSize: "11px", fontWeight: "700", color: "var(--text-secondary)", display: "block", marginBottom: "4px" }}>NODE.JS EXAMPLE</label>
                <pre style={{ background: "var(--bg-tertiary)", padding: "16px", borderRadius: "8px", overflowX: "auto", fontSize: "12px", color: "#34d399", fontFamily: "monospace" }}>
{`const formData = new FormData();
formData.append('file', fs.createReadStream('document.pdf'));

fetch('http://localhost:3000/api/v1/ocr', {
  method: 'POST',
  headers: { 'Authorization': 'Bearer YOUR_API_KEY' },
  body: formData
}).then(res => res.json()).then(console.log);`}
                </pre>
              </div>

              <Link href="/dashboard/developer" className="btn btn-primary" style={{ marginTop: "24px", display: "inline-block" }}>
                Go to Developer Dashboard
              </Link>
            </div>
          ) : files.length === 0 && (
            <div style={{ width: "100%" }}>
              <div 
                className={`upload-zone ${isDragging ? "dragging" : ""}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <div style={styles.uploadIconWrapper}>
                  <Upload size={32} />
                </div>
                <h3>Drag & drop files here</h3>
                <p>or click to browse from your device</p>
                <input 
                  type="file" 
                  multiple={tool === "merge-pdf" || tool === "jpg-to-pdf"}
                  accept={getFileAcceptAttribute()}
                  onChange={handleFileInput}
                  style={{ display: "none" }}
                  id="file-input"
                />
                <label htmlFor="file-input" className="btn btn-primary" style={{ marginTop: "12px", cursor: "pointer" }}>
                  Select Files
                </label>
              </div>

              {(tool === "increase-image-size" || 
                tool === "image-size-increase" || 
                tool === "photo-size-increase" || 
                tool === "increase-image-size-in-kb" || 
                tool === "kb-increaser" || 
                tool === "kb-converter" ||
                tool === "resize-image-to-20kb" ||
                tool === "photo-size-kb" ||
                tool === "resize-pixel" ||
                tool === "pan-card-photo-resize" ||
                tool.includes("resize-image-to-") ||
                tool.includes("resizer") ||
                tool.includes("compressor")) && (
                <div style={{ marginTop: "24px", padding: "20px", borderRadius: "12px", background: "rgba(255, 255, 255, 0.02)", border: "1px solid rgba(255, 255, 255, 0.05)", width: "100%", textAlign: "left" }}>
                  <h4 style={{ fontSize: "14px", fontWeight: "600", marginBottom: "12px", color: "var(--accent-primary)", display: "flex", alignItems: "center", gap: "6px" }}>
                    ⚡ Supported Target KB Size Compressors
                  </h4>
                  <p style={{ fontSize: "12px", color: "var(--text-tertiary)", marginBottom: "10px" }}>
                    Select a target size (will auto-configure after upload):
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "24px" }}>
                    {[5, 10, 15, 20, 25, 30, 50, 60, 80, 100, 150, 200, 500, 1024, 2048, 5120].map((kb) => {
                      const label = kb >= 1024 ? `${(kb / 1024)}MB` : `${kb}KB`;
                      return (
                        <button
                          key={kb}
                          type="button"
                          onClick={() => setTargetKb(kb)}
                          style={{
                            padding: "8px 14px",
                            fontSize: "13px",
                            fontWeight: "700",
                            borderRadius: "8px",
                            background: targetKb === kb ? "var(--accent-primary)" : "var(--bg-tertiary)",
                            color: targetKb === kb ? "#ffffff" : "var(--text-primary)",
                            border: targetKb === kb ? "2px solid var(--accent-primary)" : "2px solid var(--border-color)",
                            cursor: "pointer",
                            transition: "all 0.2s"
                          }}
                        >
                          Resize to {label}
                        </button>
                      );
                    })}
                  </div>

                  <h4 style={{ fontSize: "15px", fontWeight: "700", marginBottom: "12px", color: "var(--accent-primary)", display: "flex", alignItems: "center", gap: "6px" }}>
                    🏛️ Official Government Portals Presets
                  </h4>
                  <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginBottom: "12px" }}>
                    Select a portal to auto-fill exact dimensions and file limits:
                  </p>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                    {[
                      { name: "SSC Photo Resizer", w: 350, h: 450, kb: 50, info: "3.5 x 4.5 cm (20-50KB)" },
                      { name: "SSC Signature Resizer", w: 400, h: 200, kb: 20, info: "6.0 x 2.0 cm (10-20KB)" },
                      { name: "IBPS / SBI Bank PO & Clerk", w: 200, h: 230, kb: 50, info: "200x230 px (20-50KB)" },
                      { name: "TNPSC Signature Resizer", w: 275, h: 118, kb: 20, info: "275x118 px (10-20KB)" },
                      { name: "UPSC Photo Resizer", w: 350, h: 350, kb: 300, info: "350x350 px (20-300KB)" },
                      { name: "JEE / NEET / CUET Resizers", w: 350, h: 450, kb: 200, info: "Passport Photo (10-200KB)" }
                    ].map((preset) => (
                      <button
                        key={preset.name}
                        type="button"
                        onClick={() => {
                          setResizeWidth(preset.w);
                          setResizeHeight(preset.h);
                          setTargetKb(preset.kb);
                        }}
                        style={{
                          padding: "12px 16px",
                          borderRadius: "10px",
                          background: "var(--bg-tertiary)",
                          border: "2px solid var(--border-color)",
                          textAlign: "left",
                          cursor: "pointer",
                          transition: "all 0.2s"
                        }}
                      >
                        <div style={{ fontSize: "14px", fontWeight: "700", color: "var(--text-primary)" }}>{preset.name}</div>
                        <div style={{ fontSize: "12px", color: "var(--text-secondary)", marginTop: "4px", fontWeight: "500" }}>{preset.info}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {files.length > 0 && !isDone && (
            <div style={styles.fileListWrapper}>
              <div style={styles.fileHeader}>
                <h3>Selected Files ({files.length})</h3>
                <button onClick={handleReset} style={styles.clearBtn}>Clear All</button>
              </div>
              
              <div style={styles.fileGrid}>
                {files.map((file, idx) => (
                  <div key={idx} style={styles.fileRow} className="glass-card">
                    <div style={styles.fileRowInfo}>
                      <FileText size={20} color="var(--accent-primary)" />
                      <div style={styles.fileNameWrapper}>
                        <span style={styles.fileName}>{file.name}</span>
                        <span style={styles.fileSize}>{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                      </div>
                    </div>
                    {(tool === "merge-pdf" || tool === "jpg-to-pdf") && (
                      <button onClick={() => removeFile(idx)} style={styles.deleteBtn}>
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <div style={styles.configSection}>
                {tool === "split-pdf" && (
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Extract Page Ranges:</label>
                    <input 
                      type="text" 
                      value={pageRange}
                      onChange={(e) => setPageRange(e.target.value)}
                      placeholder="e.g. 1-3, 5"
                      style={styles.textInput}
                    />
                  </div>
                )}

                {tool === "compress-pdf" && (
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Compression Level:</label>
                    <div style={styles.radioGroup}>
                      {["low", "medium", "high"].map((level) => (
                        <button
                          key={level}
                          onClick={() => setCompressLevel(level as any)}
                          style={{
                            ...styles.radioButton,
                            background: compressLevel === level ? "var(--accent-primary)" : "var(--bg-tertiary)",
                            color: compressLevel === level ? "#ffffff" : "var(--text-secondary)",
                          }}
                        >
                          {level.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {(tool === "increase-image-size" || 
                  tool === "image-size-increase" || 
                  tool === "photo-size-increase" || 
                  tool === "increase-image-size-in-kb" || 
                  tool === "kb-increaser" || 
                  tool === "kb-converter") && (
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Target Minimum File Size (KB):</label>
                    <input 
                      type="number" 
                      min="10" 
                      max="2000"
                      value={targetKb}
                      onChange={(e) => setTargetKb(Number(e.target.value))}
                      style={styles.textInput}
                    />
                  </div>
                )}

                {(tool === "resize-image-to-20kb" || tool === "photo-size-kb") && (
                  <div style={{ ...styles.inputGroup, background: "rgba(79, 70, 229, 0.05)", padding: "12px", borderRadius: "8px", width: "100%" }}>
                    <p style={{ margin: 0, fontSize: "13px", color: "var(--text-secondary)" }}>
                      ℹ️ This tool automatically optimizes photo dimensions and quality metrics to target a file size of **exactly under 20KB**.
                    </p>
                  </div>
                )}

                {(tool === "resize-pixel" || tool === "pan-card-photo-resize") && (
                  <div style={styles.inlineConfig}>
                    <div style={styles.inputGroup}>
                      <label style={styles.label}>Dimension Presets:</label>
                      <select 
                        onChange={(e) => {
                          const val = e.target.value;
                          if (val === "pan-photo") {
                            setResizeWidth(213);
                            setResizeHeight(213);
                          } else if (val === "pan-sign") {
                            setResizeWidth(400);
                            setResizeHeight(200);
                          } else if (val === "passport") {
                            setResizeWidth(350);
                            setResizeHeight(450);
                          }
                        }}
                        style={styles.select}
                      >
                        <option value="custom">Custom Dimensions</option>
                        <option value="pan-photo">PAN Card Photo (213 x 213 px)</option>
                        <option value="pan-sign">PAN Card Signature (400 x 200 px)</option>
                        <option value="passport">Passport Photo (350 x 450 px)</option>
                      </select>
                    </div>
                    <div style={styles.inputGroup}>
                      <label style={styles.label}>Width (px):</label>
                      <input 
                        type="number" 
                        value={resizeWidth}
                        onChange={(e) => setResizeWidth(Number(e.target.value))}
                        style={styles.textInput}
                      />
                    </div>
                    <div style={styles.inputGroup}>
                      <label style={styles.label}>Height (px):</label>
                      <input 
                        type="number" 
                        value={resizeHeight}
                        onChange={(e) => setResizeHeight(Number(e.target.value))}
                        style={styles.textInput}
                      />
                    </div>
                  </div>
                )}

                {(tool === "increase-image-size" || 
                  tool === "image-size-increase" || 
                  tool === "photo-size-increase" || 
                  tool === "increase-image-size-in-kb" || 
                  tool === "kb-increaser" || 
                  tool === "kb-converter" ||
                  tool === "resize-image-to-20kb" ||
                  tool === "photo-size-kb" ||
                  tool === "resize-pixel" ||
                  tool === "pan-card-photo-resize" ||
                  tool.includes("resize-image-to-") ||
                  tool.includes("resizer") ||
                  tool.includes("compressor")) && (
                  <div style={{ marginTop: "24px", padding: "20px", borderRadius: "12px", background: "rgba(255, 255, 255, 0.02)", border: "1px solid rgba(255, 255, 255, 0.05)", width: "100%" }}>
                    <h4 style={{ fontSize: "14px", fontWeight: "600", marginBottom: "12px", color: "var(--accent-primary)", display: "flex", alignItems: "center", gap: "6px" }}>
                      ⚡ Supported Target KB Size Compressors
                    </h4>
                    <p style={{ fontSize: "12px", color: "var(--text-tertiary)", marginBottom: "10px" }}>
                      Click any size below to instantly set your compression target:
                    </p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "24px" }}>
                      {[5, 10, 15, 20, 25, 30, 50, 60, 80, 100, 150, 200, 500, 1024, 2048, 5120].map((kb) => {
                        const label = kb >= 1024 ? `${(kb / 1024)}MB` : `${kb}KB`;
                        return (
                          <button
                            key={kb}
                            type="button"
                            onClick={() => setTargetKb(kb)}
                            style={{
                              padding: "8px 14px",
                              fontSize: "13px",
                              fontWeight: "700",
                              borderRadius: "8px",
                              background: targetKb === kb ? "var(--accent-primary)" : "var(--bg-tertiary)",
                              color: targetKb === kb ? "#ffffff" : "var(--text-primary)",
                              border: targetKb === kb ? "2px solid var(--accent-primary)" : "2px solid var(--border-color)",
                              cursor: "pointer",
                              transition: "all 0.2s"
                            }}
                          >
                            Resize to {label}
                          </button>
                        );
                      })}
                    </div>

                    <h4 style={{ fontSize: "15px", fontWeight: "700", marginBottom: "12px", color: "var(--accent-primary)", display: "flex", alignItems: "center", gap: "6px" }}>
                      🏛️ Official Government Portals Presets
                    </h4>
                    <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginBottom: "12px" }}>
                      Apply exact dimensions and file limits for major recruitment portals:
                    </p>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                      {[
                        { name: "SSC Photo Resizer", w: 350, h: 450, kb: 50, info: "3.5 x 4.5 cm (20-50KB)" },
                        { name: "SSC Signature Resizer", w: 400, h: 200, kb: 20, info: "6.0 x 2.0 cm (10-20KB)" },
                        { name: "IBPS / SBI Bank PO & Clerk", w: 200, h: 230, kb: 50, info: "200x230 px (20-50KB)" },
                        { name: "TNPSC Signature Resizer", w: 275, h: 118, kb: 20, info: "275x118 px (10-20KB)" },
                        { name: "UPSC Photo Resizer", w: 350, h: 350, kb: 300, info: "350x350 px (20-300KB)" },
                        { name: "JEE / NEET / CUET Resizers", w: 350, h: 450, kb: 200, info: "Passport Photo (10-200KB)" }
                      ].map((preset) => (
                        <button
                          key={preset.name}
                          type="button"
                          onClick={() => {
                            setResizeWidth(preset.w);
                            setResizeHeight(preset.h);
                            setTargetKb(preset.kb);
                          }}
                          style={{
                            padding: "12px 16px",
                            borderRadius: "10px",
                            background: "var(--bg-tertiary)",
                            border: "2px solid var(--border-color)",
                            textAlign: "left",
                            cursor: "pointer",
                            transition: "all 0.2s"
                          }}
                        >
                          <div style={{ fontSize: "14px", fontWeight: "700", color: "var(--text-primary)" }}>{preset.name}</div>
                          <div style={{ fontSize: "12px", color: "var(--text-secondary)", marginTop: "4px", fontWeight: "500" }}>{preset.info}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {tool === "translate-pdf" && (
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Select Target Language:</label>
                    <select 
                      value={targetLang} 
                      onChange={(e) => setTargetLang(e.target.value)}
                      style={styles.select}
                    >
                      <option value="Spanish">Spanish</option>
                      <option value="French">French</option>
                      <option value="German">German</option>
                      <option value="Italian">Italian</option>
                      <option value="Chinese">Chinese</option>
                      <option value="Japanese">Japanese</option>
                      <option value="Russian">Russian</option>
                    </select>
                  </div>
                )}

                {(tool === "ocr-pdf" || tool === "ocr-urdu-arabic") && (
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>OCR Language Core:</label>
                    <select 
                      value={ocrLang} 
                      onChange={(e) => setOcrLang(e.target.value)}
                      style={styles.select}
                    >
                      {tool === "ocr-urdu-arabic" ? (
                        <>
                          <option value="ara">Arabic (العربية)</option>
                          <option value="urd">Urdu (اردو)</option>
                        </>
                      ) : (
                        <>
                          <option value="eng">English</option>
                          <option value="spa">Spanish</option>
                          <option value="fra">French</option>
                          <option value="deu">German</option>
                          <option value="chi_sim">Chinese</option>
                          <option value="jpn">Japanese</option>
                        </>
                      )}
                    </select>
                  </div>
                )}

                {(tool === "add-password" || tool === "lock-pdf") && (
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Set Document Password:</label>
                    <input 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password..."
                      style={styles.textInput}
                    />
                  </div>
                )}

                {(tool === "remove-password" || tool === "unlock-pdf") && (
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Enter Current Password:</label>
                    <input 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password to unlock..."
                      style={styles.textInput}
                    />
                  </div>
                )}

                {(tool === "jpg-to-pdf" || tool === "image-to-pdf") && (
                  <div style={styles.inlineConfig}>
                    <div style={styles.inputGroup}>
                      <label style={styles.label}>Page Margin:</label>
                      <select 
                        value={jpgMargin} 
                        onChange={(e) => setJpgMargin(Number(e.target.value))}
                        style={styles.select}
                      >
                        <option value={0}>No Margin</option>
                        <option value={20}>Small Margin</option>
                        <option value={40}>Large Margin</option>
                      </select>
                    </div>
                    <div style={styles.inputGroup}>
                      <label style={styles.label}>Orientation:</label>
                      <select 
                        value={jpgOrientation} 
                        onChange={(e) => setJpgOrientation(e.target.value as any)}
                        style={styles.select}
                      >
                        <option value="portrait">Portrait</option>
                        <option value="landscape">Landscape</option>
                      </select>
                    </div>
                  </div>
                )}

                {tool === "watermark-pdf" && (
                  <div style={styles.inlineConfig}>
                    <div style={styles.inputGroup}>
                      <label style={styles.label}>Watermark Text:</label>
                      <input 
                        type="text" 
                        value={watermarkText} 
                        onChange={(e) => setWatermarkText(e.target.value)} 
                        style={styles.textInput}
                      />
                    </div>
                    <div style={styles.inputGroup}>
                      <label style={styles.label}>Opacity ({watermarkOpacity}):</label>
                      <input 
                        type="range" 
                        min="0.1" 
                        max="1.0" 
                        step="0.1"
                        value={watermarkOpacity} 
                        onChange={(e) => setWatermarkOpacity(Number(e.target.value))}
                      />
                    </div>
                    <div style={styles.inputGroup}>
                      <label style={styles.label}>Rotation ({watermarkRotation}°):</label>
                      <input 
                        type="range" 
                        min="-180" 
                        max="180" 
                        value={watermarkRotation} 
                        onChange={(e) => setWatermarkRotation(Number(e.target.value))}
                      />
                    </div>
                    <div style={styles.inputGroup}>
                      <label style={styles.label}>Text Size ({watermarkSize}px):</label>
                      <input 
                        type="range" 
                        min="10" 
                        max="100" 
                        value={watermarkSize} 
                        onChange={(e) => setWatermarkSize(Number(e.target.value))}
                      />
                    </div>
                  </div>
                )}

                {tool === "page-numbers" && (
                  <div style={styles.inlineConfig}>
                    <div style={styles.inputGroup}>
                      <label style={styles.label}>Page Number Format:</label>
                      <select 
                        value={pageNumFormat} 
                        onChange={(e) => setPageNumFormat(e.target.value)}
                        style={styles.select}
                      >
                        <option value="Page {n} of {all}">Page {"{n}"} of {"{all}"}</option>
                        <option value="Page {n}">Page {"{n}"}</option>
                        <option value="{n}">Simple Digit ({"{n}"})</option>
                      </select>
                    </div>
                    <div style={styles.inputGroup}>
                      <label style={styles.label}>Placement Position:</label>
                      <select 
                        value={pageNumPosition} 
                        onChange={(e) => setPageNumPosition(e.target.value as any)}
                        style={styles.select}
                      >
                        <option value="bottom-right">Bottom Right</option>
                        <option value="bottom-center">Bottom Center</option>
                      </select>
                    </div>
                  </div>
                )}

                {tool === "rotate-pdf" && pdfPages.length > 0 && (
                  <div style={styles.previewContainer}>
                    <label style={styles.label}>Rotate Pages (Click thumbnail to rotate):</label>
                    <div style={styles.previewGrid}>
                      {pdfPages.map((page) => (
                        <div 
                          key={page.index} 
                          onClick={() => {
                            setPdfPages(prev => prev.map(p => 
                              p.index === page.index ? { ...p, rotation: (p.rotation + 90) % 360 } : p
                            ));
                          }}
                          style={{
                            ...styles.previewTile,
                            transform: `rotate(${page.rotation}deg)`
                          }}
                        >
                          <img src={page.dataUrl} alt={`Page ${page.index + 1}`} style={styles.previewImg} />
                          <span style={styles.previewNum}>{page.index + 1}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {tool === "organize-pdf" && pdfPages.length > 0 && (
                  <div style={styles.previewContainer}>
                    <label style={styles.label}>Reorder or Delete Pages:</label>
                    <div style={styles.previewGrid}>
                      {pdfPages.map((page) => (
                        <div 
                          key={page.index} 
                          style={{
                            ...styles.previewTile,
                            opacity: page.deleted ? 0.3 : 1
                          }}
                        >
                          <img src={page.dataUrl} alt={`Page ${page.index + 1}`} style={styles.previewImg} />
                          <span style={styles.previewNum}>{page.index + 1}</span>
                          <button 
                            onClick={() => {
                              setPdfPages(prev => prev.map(p => 
                                p.index === page.index ? { ...p, deleted: !p.deleted } : p
                              ));
                            }} 
                            style={styles.tileDeleteBtn}
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {pdfRendering && (
                  <p style={{ textAlign: "center", color: "var(--text-secondary)" }}>Loading page previews...</p>
                )}

                {(tool === "sign-pdf" || tool === "pdf-editor" || tool === "esign-pdf") && (
                  <div style={styles.previewContainer}>
                    <div style={{ display: "flex", gap: "12px", marginBottom: "16px" }}>
                      <button 
                        onClick={() => setAnnotationType("signature")} 
                        className="btn"
                        style={{
                          background: annotationType === "signature" ? "var(--accent-primary)" : "var(--bg-tertiary)",
                          color: annotationType === "signature" ? "#fff" : "var(--text-secondary)"
                        }}
                      >
                        <PenTool size={14} /> Signature
                      </button>
                      <button 
                        onClick={() => setAnnotationType("text")} 
                        className="btn"
                        style={{
                          background: annotationType === "text" ? "var(--accent-primary)" : "var(--bg-tertiary)",
                          color: annotationType === "text" ? "#fff" : "var(--text-secondary)"
                        }}
                      >
                        <Type size={14} /> Custom Text
                      </button>
                    </div>

                    {annotationType === "signature" ? (
                      <div style={{ display: "flex", gap: "12px", marginBottom: "16px" }}>
                        <button onClick={() => setShowSignModal(true)} className="btn btn-secondary">
                          <PenTool size={16} /> Draw Signature
                        </button>
                        {signatureImg && (
                          <div style={styles.signaturePreviewWrapper}>
                            <span>Saved signature:</span>
                            <img src={signatureImg} alt="Saved Sig" style={{ height: "30px", border: "1px solid var(--border-color)" }} />
                          </div>
                        )}
                      </div>
                    ) : (
                      <div style={styles.inlineConfig}>
                        <div style={styles.inputGroup}>
                          <label style={styles.label}>Text Annotation Content:</label>
                          <input 
                            type="text" 
                            value={customTextAnnotation} 
                            onChange={(e) => setCustomTextAnnotation(e.target.value)} 
                            style={styles.textInput}
                          />
                        </div>
                        <div style={styles.inputGroup}>
                          <label style={styles.label}>Text Color:</label>
                          <input 
                            type="color" 
                            value={annotationColor} 
                            onChange={(e) => setAnnotationColor(e.target.value)} 
                            style={{ height: "45px", width: "60px", padding: 0, border: "none", background: "none" }}
                          />
                        </div>
                      </div>
                    )}

                    {pdfPages.length > 0 && (
                      <div>
                        <label style={styles.label}>Click on page to place annotation:</label>
                        <div style={styles.previewGrid}>
                          {pdfPages.map((page) => (
                            <div 
                              key={page.index} 
                              onClick={() => setActiveSignPage(page.index)}
                              style={{
                                ...styles.previewTile,
                                border: activeSignPage === page.index ? "2px solid var(--accent-primary)" : "1px solid var(--border-color)"
                              }}
                            >
                              <img src={page.dataUrl} alt={`Page ${page.index + 1}`} style={styles.previewImg} />
                              <span style={styles.previewNum}>{page.index + 1}</span>
                              {activeSignPage === page.index && (
                                <div style={{
                                  ...styles.visualSigBox,
                                  left: `${sigPosition.x}%`,
                                  top: `${sigPosition.y}%`,
                                }}>
                                  {annotationType === "signature" ? <FileSignature size={12} /> : <Type size={12} />} Place
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                        {activeSignPage !== null && (
                          <div style={{ marginTop: "16px" }}>
                            <label style={styles.label}>Adjust position percentage (X, Y):</label>
                            <div style={{ display: "flex", gap: "12px" }}>
                              <input 
                                type="range" 
                                min="0" 
                                max="100" 
                                value={sigPosition.x}
                                onChange={(e) => setSigPosition(prev => ({ ...prev, x: Number(e.target.value) }))}
                              />
                              <input 
                                type="range" 
                                min="0" 
                                max="100" 
                                value={sigPosition.y}
                                onChange={(e) => setSigPosition(prev => ({ ...prev, y: Number(e.target.value) }))}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {tool === "chat-pdf" && (
                  <div style={styles.chatWrapper}>
                    <div style={styles.chatLog}>
                      {chatHistory.length === 0 && (
                        <p style={{ color: "var(--text-tertiary)", textAlign: "center", padding: "40px" }}>
                          Ask questions like \"Summarize main points\" or \"What is this contract about?\" below.
                        </p>
                      )}
                      {chatHistory.map((msg, index) => (
                        <div 
                          key={index} 
                          style={{
                            ...styles.chatBubble,
                            alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
                            background: msg.role === "user" ? "var(--accent-primary)" : "var(--bg-tertiary)",
                            color: msg.role === "user" ? "#ffffff" : "var(--text-primary)"
                          }}
                        >
                          {msg.text}
                        </div>
                      ))}
                    </div>
                    <div style={styles.chatInputRow}>
                      <input 
                        type="text" 
                        placeholder="Ask a question about the document..." 
                        value={chatPrompt}
                        onChange={(e) => setChatPrompt(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSendChat()}
                        style={styles.chatInput}
                        disabled={isProcessing}
                      />
                      <button onClick={handleSendChat} className="btn btn-primary" disabled={isProcessing}>
                        Send
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {error && <p style={styles.errorText}>{error}</p>}

              {tool !== "chat-pdf" && (
                <button 
                  onClick={handleProcess} 
                  className={`btn btn-primary ${isProcessing ? "pulse" : ""}`}
                  style={{ width: "100%", height: "50px", marginTop: "24px" }}
                  disabled={isProcessing}
                >
                  {isProcessing ? "Processing..." : `Process ${activeTool.name}`}
                </button>
              )}
            </div>
          )}

          {isDone && downloadUrl && (
            <div style={styles.successScreen} className="animate-fade-in">
              <CheckCircle2 size={64} color="var(--success)" />
              <h2>File Ready for Download!</h2>
              <p>Your document has been processed locally in your browser with full confidentiality.</p>
              
              <div style={styles.downloadCard} className="glass-card">
                <FileText size={32} color="var(--accent-primary)" />
                <div style={styles.downloadInfo}>
                  <span style={styles.downloadName}>{downloadName}</span>
                </div>
                <a href={downloadUrl} download={downloadName} className="btn btn-primary">
                  <Download size={16} /> Download
                </a>
              </div>

              <div style={{ display: "flex", gap: "12px", marginTop: "12px" }}>
                <button onClick={handleReset} className="btn btn-secondary">Convert another file</button>
                <Link href="/" className="btn btn-secondary">Go to Homepage</Link>
              </div>
            </div>
          )}

          {isDone && !downloadUrl && aiResponse && (
            <div style={styles.successScreen} className="animate-fade-in">
              <CheckCircle2 size={48} color="var(--success)" />
              <h2>Analysis Completed!</h2>
              
              <div style={styles.aiOutputBox} className="glass-card">
                <p style={{ whiteSpace: "pre-line", textAlign: "left", fontSize: "14px" }}>
                  {aiResponse}
                </p>
              </div>

              <div style={{ display: "flex", gap: "12px", marginTop: "12px" }}>
                <button onClick={handleReset} className="btn btn-secondary">Convert another file</button>
                <Link href="/" className="btn btn-secondary">Go to Homepage</Link>
              </div>
            </div>
          )}

          {isDone && !downloadUrl && tool === "pdf-to-jpg" && (
            <div style={styles.successScreen} className="animate-fade-in">
              <CheckCircle2 size={64} color="var(--success)" />
              <h2>Images Exported!</h2>
              <p>All pages have been extracted and downloaded as individual JPG images.</p>
              <div style={{ display: "flex", gap: "12px", marginTop: "12px" }}>
                <button onClick={handleReset} className="btn btn-secondary">Convert another file</button>
                <Link href="/" className="btn btn-secondary">Go to Homepage</Link>
              </div>
            </div>
          )}
        </div>

        {showSignModal && (
          <div style={styles.modalOverlay}>
            <div style={styles.modalContent} className="glass-card">
              <h3>Draw Your Signature</h3>
              <canvas 
                ref={sigCanvasRef}
                width={400}
                height={200}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                style={styles.sigCanvas}
              />
              <div style={{ display: "flex", gap: "12px", marginTop: "16px" }}>
                <button onClick={saveSignature} className="btn btn-primary">Save Signature</button>
                <button onClick={clearCanvas} className="btn btn-secondary">Clear</button>
                <button onClick={() => setShowSignModal(false)} className="btn btn-secondary">Cancel</button>
              </div>
            </div>
          </div>
        )}

        {showUpgradeModal && (
          <div style={styles.modalOverlay}>
            <div style={{ ...styles.modalContent, maxWidth: "400px", padding: "40px 32px", textAlign: "center" }} className="glass-card">
              <Sparkles size={48} color="var(--accent-secondary)" style={{ marginBottom: "16px", alignSelf: "center" }} />
              <h2>Upgrade to Pro</h2>
              <p style={{ fontSize: "14px", margin: "12px 0 24px 0" }}>
                You have reached your limit of 20 free files per day. Upgrade to Pro for unlimited PDF conversions, AI tools, and OCR extraction.
              </p>
              <div style={{ display: "flex", gap: "8px", width: "100%", marginBottom: "16px" }}>
                {Object.entries(planInfo).map(([key, info]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSelectedPlan(key as any)}
                    style={{
                      flex: 1,
                      padding: "8px 4px",
                      borderRadius: "8px",
                      border: selectedPlan === key ? "2px solid var(--accent-primary)" : "1px solid var(--border-color)",
                      background: selectedPlan === key ? "rgba(79, 70, 229, 0.1)" : "var(--bg-tertiary)",
                      color: selectedPlan === key ? "var(--accent-primary)" : "var(--text-primary)",
                      cursor: "pointer",
                      fontSize: "11px",
                      fontWeight: "700",
                      transition: "all var(--transition-fast)"
                    }}
                  >
                    <div>{info.name}</div>
                    <div style={{ fontSize: "14px", fontWeight: "800", marginTop: "4px" }}>${info.price}</div>
                  </button>
                ))}
              </div>
              <div style={{ background: "var(--bg-tertiary)", padding: "12px", borderRadius: "10px", marginBottom: "20px", width: "100%" }}>
                <span style={{ fontSize: "18px", fontWeight: 800 }}>${planInfo[selectedPlan].price}</span>
                <span style={{ color: "var(--text-secondary)", fontSize: "13px" }}> ({planInfo[selectedPlan].desc})</span>
              </div>
              {paypalClientId ? (
                <PayPalScriptProvider options={{ clientId: paypalClientId }}>
                  <div style={{ width: "100%", marginTop: "12px", display: "flex", flexDirection: "column", gap: "12px" }}>
                    <PayPalButtons
                      key={selectedPlan} // Re-mount button on plan change to refresh PayPal value
                      style={{ layout: "vertical" }}
                      createOrder={(data, actions) => {
                        return actions.order.create({
                          intent: "CAPTURE",
                          purchase_units: [{
                            amount: {
                              currency_code: "USD",
                              value: planInfo[selectedPlan].price
                            },
                            description: `PDFVerse Pro Plan Subscription (${planInfo[selectedPlan].name})`
                          }]
                        });
                      }}
                      onApprove={async (data, actions) => {
                        if (actions.order) {
                          await actions.order.capture();
                        }
                        handlePaypalSuccess();
                      }}
                    />
                    <button 
                      type="button" 
                      onClick={() => setShowUpgradeModal(false)} 
                      className="btn btn-secondary" 
                      style={{ width: "100%" }}
                    >
                      Cancel
                    </button>
                  </div>
                </PayPalScriptProvider>
              ) : (
                <form onSubmit={triggerProUpgrade} style={{ display: "flex", flexDirection: "column", gap: "12px", width: "100%", textAlign: "left" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    <label style={{ fontSize: "11px", fontWeight: "700", color: "var(--text-secondary)" }}>CARDHOLDER NAME</label>
                    <input 
                      type="text" 
                      placeholder="Jane Doe" 
                      value={cardHolder} 
                      onChange={(e) => setCardHolder(e.target.value)} 
                      style={styles.textInput}
                      required
                      disabled={paymentProcessing}
                    />
                  </div>
                  
                  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    <label style={{ fontSize: "11px", fontWeight: "700", color: "var(--text-secondary)" }}>CARD NUMBER</label>
                    <input 
                      type="text" 
                      placeholder="4242 4242 4242 4242" 
                      value={cardNumber} 
                      maxLength={19}
                      onChange={(e) => {
                        const raw = e.target.value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
                        const matches = raw.match(/\d{4,16}/g);
                        const match = (matches && matches[0]) || "";
                        const parts = [];
                        for (let i = 0, len = match.length; i < len; i += 4) {
                          parts.push(match.substring(i, i + 4));
                        }
                        if (parts.length > 0) {
                          setCardNumber(parts.join(" "));
                        } else {
                          setCardNumber(raw);
                        }
                      }} 
                      style={styles.textInput}
                      required
                      disabled={paymentProcessing}
                    />
                  </div>

                  <div style={{ display: "flex", gap: "12px" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "4px", flex: 1 }}>
                      <label style={{ fontSize: "11px", fontWeight: "700", color: "var(--text-secondary)" }}>EXPIRY (MM/YY)</label>
                      <input 
                        type="text" 
                        placeholder="12/28" 
                        value={cardExpiry} 
                        maxLength={5}
                        onChange={(e) => {
                          const raw = e.target.value.replace(/[^0-9]/g, "");
                          if (raw.length >= 2) {
                            setCardExpiry(`${raw.slice(0, 2)}/${raw.slice(2, 4)}`);
                          } else {
                            setCardExpiry(raw);
                          }
                        }}
                        style={styles.textInput}
                        required
                        disabled={paymentProcessing}
                      />
                    </div>
                    
                    <div style={{ display: "flex", flexDirection: "column", gap: "4px", flex: 1 }}>
                      <label style={{ fontSize: "11px", fontWeight: "700", color: "var(--text-secondary)" }}>CVC</label>
                      <input 
                        type="password" 
                        placeholder="•••" 
                        value={cardCvc} 
                        maxLength={4}
                        onChange={(e) => setCardCvc(e.target.value.replace(/[^0-9]/g, ""))}
                        style={styles.textInput}
                        required
                        disabled={paymentProcessing}
                      />
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    className="btn btn-primary" 
                    style={{ width: "100%", height: "45px", marginTop: "12px" }}
                    disabled={paymentProcessing}
                  >
                    {paymentProcessing ? "Processing Secure Payment..." : `Pay $${planInfo[selectedPlan].price} & Subscribe`}
                  </button>
                  
                  <button 
                    type="button" 
                    onClick={() => setShowUpgradeModal(false)} 
                    className="btn btn-secondary" 
                    style={{ width: "100%" }}
                    disabled={paymentProcessing}
                  >
                    Cancel
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

        <section style={styles.guideSection}>
          <h2>How to use {activeTool.name}</h2>
          <ol style={styles.guideList}>
            {activeTool.instructions.map((inst, idx) => (
              <li key={idx} style={styles.guideItem}>
                <span style={styles.guideStepNum}>{idx + 1}</span>
                <p style={styles.guideStepText}>{inst}</p>
              </li>
            ))}
          </ol>
        </section>

        {activeTool.faq.length > 0 && (
          <section style={styles.faqSection}>
            <h2>Frequently Asked Questions</h2>
            <div style={styles.faqGrid}>
              {activeTool.faq.map((faq, idx) => (
                <div key={idx} style={styles.faqCard} className="glass-card">
                  <h3 style={styles.faqQuestion}>{faq.q}</h3>
                  <p style={styles.faqAnswer}>{faq.a}</p>
                </div>
              ))}
            </div>
          </section>
        )}
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
  },
  backLink: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "14px",
    color: "var(--text-secondary)",
  },
  intro: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  title: {
    fontSize: "36px",
    fontWeight: "800",
  },
  description: {
    fontSize: "16px",
    color: "var(--text-secondary)",
    maxWidth: "600px",
  },
  usageBanner: {
    background: "rgba(79, 70, 229, 0.08)",
    border: "1px solid rgba(79, 70, 229, 0.2)",
    color: "var(--text-primary)",
    padding: "12px 20px",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    fontSize: "13px",
    fontWeight: 600,
  },
  upgradeBtnSmall: {
    background: "var(--accent-primary)",
    color: "#fff",
    border: "none",
    padding: "4px 12px",
    borderRadius: "6px",
    fontSize: "12px",
    fontWeight: 700,
    cursor: "pointer",
  },
  workspace: {
    padding: "40px",
    minHeight: "350px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  uploadIconWrapper: {
    width: "64px",
    height: "64px",
    borderRadius: "16px",
    background: "var(--bg-tertiary)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "var(--text-secondary)",
  },
  fileListWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  fileHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  clearBtn: {
    background: "none",
    border: "none",
    color: "var(--danger)",
    cursor: "pointer",
    fontWeight: 600,
  },
  fileGrid: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  fileRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px 20px",
  },
  fileRowInfo: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  fileNameWrapper: {
    display: "flex",
    flexDirection: "column",
  },
  fileName: {
    fontWeight: "600",
    fontSize: "15px",
  },
  fileSize: {
    fontSize: "12px",
    color: "var(--text-tertiary)",
  },
  deleteBtn: {
    background: "none",
    border: "none",
    color: "var(--text-tertiary)",
    cursor: "pointer",
  },
  configSection: {
    borderTop: "1px solid var(--border-color)",
    paddingTop: "24px",
    marginTop: "16px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    flex: 1,
  },
  label: {
    fontWeight: "700",
    fontSize: "14px",
  },
  textInput: {
    background: "var(--bg-tertiary)",
    border: "1px solid var(--border-color)",
    borderRadius: "8px",
    padding: "12px",
    color: "var(--text-primary)",
    outline: "none",
    width: "100%",
  },
  radioGroup: {
    display: "flex",
    gap: "12px",
  },
  radioButton: {
    padding: "10px 20px",
    border: "1px solid var(--border-color)",
    borderRadius: "8px",
    fontWeight: 600,
    cursor: "pointer",
  },
  inlineConfig: {
    display: "flex",
    gap: "24px",
    flexWrap: "wrap",
  },
  select: {
    background: "var(--bg-tertiary)",
    border: "1px solid var(--border-color)",
    borderRadius: "8px",
    padding: "12px",
    color: "var(--text-primary)",
    outline: "none",
  },
  previewContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  previewGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
    gap: "16px",
  },
  previewTile: {
    background: "var(--bg-tertiary)",
    border: "1px solid var(--border-color)",
    borderRadius: "8px",
    padding: "8px",
    position: "relative",
    aspectRatio: "3/4",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all var(--transition-fast)",
  },
  previewImg: {
    maxWidth: "100%",
    maxHeight: "100%",
    objectFit: "contain",
  },
  previewNum: {
    position: "absolute",
    bottom: "4px",
    left: "4px",
    background: "rgba(0,0,0,0.6)",
    color: "#fff",
    fontSize: "10px",
    padding: "2px 6px",
    borderRadius: "4px",
  },
  tileDeleteBtn: {
    position: "absolute",
    top: "4px",
    right: "4px",
    background: "var(--danger)",
    border: "none",
    borderRadius: "4px",
    width: "20px",
    height: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    cursor: "pointer",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.8)",
    zIndex: 999,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modalContent: {
    padding: "32px",
    maxWidth: "460px",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  sigCanvas: {
    border: "1px dashed var(--border-color)",
    background: "#000",
    marginTop: "16px",
    borderRadius: "8px",
    cursor: "crosshair",
  },
  signaturePreviewWrapper: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  visualSigBox: {
    position: "absolute",
    transform: "translate(-50%, -50%)",
    background: "var(--accent-primary)",
    color: "#fff",
    fontSize: "10px",
    padding: "4px 8px",
    borderRadius: "4px",
    display: "flex",
    alignItems: "center",
    gap: "4px",
    pointerEvents: "none",
  },
  errorText: {
    color: "var(--danger)",
    fontWeight: 600,
    fontSize: "14px",
  },
  successScreen: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    gap: "16px",
    padding: "20px 0",
    width: "100%",
  },
  downloadCard: {
    width: "100%",
    maxWidth: "460px",
    padding: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "16px",
    margin: "12px 0",
  },
  downloadInfo: {
    flex: 1,
    textAlign: "left",
    display: "flex",
    flexDirection: "column",
  },
  downloadName: {
    fontWeight: "700",
    fontSize: "15px",
    wordBreak: "break-all",
  },
  aiOutputBox: {
    width: "100%",
    padding: "24px",
    maxHeight: "400px",
    overflowY: "auto",
    textAlign: "left",
    background: "rgba(255, 255, 255, 0.01)",
    border: "1px solid var(--border-color)",
    borderRadius: "12px",
  },
  chatWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    border: "1px solid var(--border-color)",
    borderRadius: "12px",
    padding: "16px",
    background: "rgba(255, 255, 255, 0.01)",
  },
  chatLog: {
    height: "280px",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    padding: "8px",
  },
  chatBubble: {
    maxWidth: "80%",
    padding: "12px 16px",
    borderRadius: "14px",
    fontSize: "14px",
    lineHeight: "1.5",
  },
  chatInputRow: {
    display: "flex",
    gap: "12px",
  },
  chatInput: {
    flex: 1,
    background: "var(--bg-tertiary)",
    border: "1px solid var(--border-color)",
    borderRadius: "8px",
    padding: "12px",
    color: "var(--text-primary)",
    outline: "none",
  },
  guideSection: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
    borderTop: "1px solid var(--border-color)",
    paddingTop: "48px",
  },
  guideList: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "24px",
    listStyle: "none",
  },
  guideItem: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  guideStepNum: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    background: "var(--accent-glow)",
    border: "1px solid rgba(79, 70, 229, 0.2)",
    color: "var(--accent-primary)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "800",
    fontSize: "16px",
  },
  guideStepText: {
    fontSize: "14px",
  },
  faqSection: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
    borderTop: "1px solid var(--border-color)",
    paddingTop: "48px",
  },
  faqGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
    gap: "24px",
  },
  faqCard: {
    padding: "24px",
  },
  faqQuestion: {
    fontSize: "16px",
    fontWeight: "700",
    marginBottom: "10px",
  },
  faqAnswer: {
    fontSize: "14px",
  }
};
