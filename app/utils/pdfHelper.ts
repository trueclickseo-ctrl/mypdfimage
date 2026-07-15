import { PDFDocument, rgb, degrees } from "pdf-lib";
import { encryptPDF } from "@pdfsmaller/pdf-encrypt";
import { decryptPDF } from "@pdfsmaller/pdf-decrypt";

// Initialize PDF.js worker
export async function getPdfJs() {
  const pdfjs = await import("pdfjs-dist");
  // Set worker Src to CDN to avoid webpack build errors for workers
  pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`;
  return pdfjs;
}

/**
 * Merge multiple PDFs into one
 */
export async function mergePDFs(files: File[]): Promise<Uint8Array> {
  const mergedPdf = await PDFDocument.create();
  
  for (const file of files) {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await PDFDocument.load(arrayBuffer);
    const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
    copiedPages.forEach((page) => mergedPdf.addPage(page));
  }
  
  return await mergedPdf.save();
}

/**
 * Split PDF pages
 */
export async function splitPDF(file: File, pageRangesStr: string): Promise<{ name: string; bytes: Uint8Array }[]> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await PDFDocument.load(arrayBuffer);
  const totalPages = pdf.getPageCount();
  
  // Parse ranges like "1-3, 5, 7-10"
  const pagesToExtract: number[] = [];
  const parts = pageRangesStr.split(",");
  
  for (const part of parts) {
    const range = part.trim().split("-");
    if (range.length === 1) {
      const pageNum = parseInt(range[0], 10);
      if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= totalPages) {
        pagesToExtract.push(pageNum - 1);
      }
    } else if (range.length === 2) {
      const start = parseInt(range[0], 10);
      const end = parseInt(range[1], 10);
      if (!isNaN(start) && !isNaN(end) && start <= end) {
        const clampStart = Math.max(1, start);
        const clampEnd = Math.min(totalPages, end);
        for (let i = clampStart; i <= clampEnd; i++) {
          pagesToExtract.push(i - 1);
        }
      }
    }
  }

  // Remove duplicates and sort
  const uniquePages = Array.from(new Set(pagesToExtract)).sort((a, b) => a - b);
  
  if (uniquePages.length === 0) {
    throw new Error("No valid pages selected for splitting.");
  }

  // Create new PDF with selected pages
  const newPdf = await PDFDocument.create();
  const copiedPages = await newPdf.copyPages(pdf, uniquePages);
  copiedPages.forEach((page) => newPdf.addPage(page));
  
  const bytes = await newPdf.save();
  return [{ name: `${file.name.replace(".pdf", "")}_split.pdf`, bytes }];
}

/**
 * Compress PDF (basic compression by rewriting structure & optimization)
 */
export async function compressPDF(file: File, quality: "low" | "medium" | "high"): Promise<Uint8Array> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await PDFDocument.load(arrayBuffer);
  
  // Save with stream compression
  return await pdf.save({
    useObjectStreams: true,
  });
}

/**
 * Add Password Encryption to PDF
 */
export async function addPasswordToPDF(file: File, password: string): Promise<Uint8Array> {
  const arrayBuffer = await file.arrayBuffer();
  const bytes = new Uint8Array(arrayBuffer);
  return await encryptPDF(bytes, password);
}

/**
 * Remove Password Encryption from PDF
 */
export async function removePasswordFromPDF(file: File, password: string): Promise<Uint8Array> {
  const arrayBuffer = await file.arrayBuffer();
  const bytes = new Uint8Array(arrayBuffer);
  return await decryptPDF(bytes, password);
}

/**
 * JPG/PNG to PDF
 */
export async function imagesToPDF(
  images: File[],
  options: { margin: number; orientation: "portrait" | "landscape" }
): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  
  for (const imgFile of images) {
    const arrayBuffer = await imgFile.arrayBuffer();
    let embeddedImg;
    
    if (imgFile.type === "image/png") {
      embeddedImg = await pdfDoc.embedPng(arrayBuffer);
    } else {
      embeddedImg = await pdfDoc.embedJpg(arrayBuffer);
    }
    
    const { width: imgW, height: imgH } = embeddedImg.scale(1);
    
    // Setup page orientation
    let pageW = imgW + options.margin * 2;
    let pageH = imgH + options.margin * 2;
    
    if (options.orientation === "landscape" && imgH > imgW) {
      pageW = imgH + options.margin * 2;
      pageH = imgW + options.margin * 2;
    }
    
    const page = pdfDoc.addPage([pageW, pageH]);
    
    // Draw image centered on page
    page.drawImage(embeddedImg, {
      x: (pageW - imgW) / 2,
      y: (pageH - imgH) / 2,
      width: imgW,
      height: imgH
    });
  }
  
  return await pdfDoc.save();
}

/**
 * Perform Tesseract OCR on a list of image URLs
 */
export async function performOCR(imageUrls: string[], lang: string = "eng"): Promise<string> {
  const Tesseract = await import("tesseract.js");
  let fullText = "";

  for (let i = 0; i < imageUrls.length; i++) {
    const url = imageUrls[i];
    const { data: { text } } = await Tesseract.default.recognize(url, lang);
    fullText += `\n--- OCR Page ${i + 1} ---\n\n${text}\n`;
  }

  return fullText;
}

/**
 * Excel (.xlsx) to PDF conversion
 */
export async function excelToPDF(file: File): Promise<Uint8Array> {
  const arrayBuffer = await file.arrayBuffer();
  const XLSX = await import("xlsx");
  const workbook = XLSX.read(new Uint8Array(arrayBuffer), { type: "array" });
  
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage();
  const { width, height } = page.getSize();
  
  // Get first sheet text representation
  const firstSheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[firstSheetName];
  const csvData = XLSX.utils.sheet_to_csv(worksheet);
  
  // Write lines on PDF
  const lines = csvData.split("\n").slice(0, 40); // clamp for rendering space
  let y = height - 50;
  
  page.drawText(`Excel Sheet: ${firstSheetName}`, { x: 50, y: y, size: 16 });
  y -= 30;

  for (const line of lines) {
    if (y < 40) break;
    const cleanLine = line.replace(/,/g, "  |  ");
    page.drawText(cleanLine.substring(0, 100), { x: 50, y: y, size: 9 });
    y -= 15;
  }
  
  return await pdfDoc.save();
}

/**
 * PDF to Excel (.xlsx) conversion
 */
export async function pdfToExcel(file: File): Promise<Uint8Array> {
  // Read text pages and convert to lines
  const arrayBuffer = await file.arrayBuffer();
  const pdfjs = await getPdfJs();
  const pdfDoc = await pdfjs.getDocument({ data: arrayBuffer }).promise;
  
  const XLSX = await import("xlsx");
  const wsData: string[][] = [["PDF Text Content Extraction (Tabular Grid)"]];

  for (let i = 1; i <= pdfDoc.numPages; i++) {
    const page = await pdfDoc.getPage(i);
    const textContent = await page.getTextContent();
    const pageLines: string[] = [];
    let currentY = -1;
    let lineStr = "";
    
    // Group text items roughly by lines
    for (const item of textContent.items as any[]) {
      if (currentY !== -1 && Math.abs(item.transform[5] - currentY) > 5) {
        if (lineStr.trim()) pageLines.push(lineStr.trim());
        lineStr = "";
      }
      currentY = item.transform[5];
      lineStr += " " + item.str;
    }
    if (lineStr.trim()) pageLines.push(lineStr.trim());
    
    wsData.push([`--- Page ${i} ---`]);
    pageLines.forEach(line => {
      // Split by multiple spaces to simulate columns
      const cols = line.split(/\s{2,}/);
      wsData.push(cols);
    });
  }

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet(wsData);
  XLSX.utils.book_append_sheet(wb, ws, "PDF Text");
  
  const out = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  return new Uint8Array(out);
}

/**
 * Generic format parsers
 */
export async function htmlToPDF(htmlContent: string): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage();
  const { width, height } = page.getSize();
  
  // Clean HTML tags and print text
  const cleanText = htmlContent.replace(/<[^>]*>/g, "\n");
  page.drawText(cleanText.substring(0, 1000), { x: 50, y: height - 100, size: 10, maxWidth: width - 100, lineHeight: 14 });
  
  return await pdfDoc.save();
}

export async function markdownToPDF(mdContent: string): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage();
  const { width, height } = page.getSize();
  
  // Render MD text block
  page.drawText(mdContent.substring(0, 1000), { x: 50, y: height - 100, size: 10, maxWidth: width - 100, lineHeight: 14 });
  return await pdfDoc.save();
}

export async function jsonToPDF(jsonContent: string): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage();
  const { width, height } = page.getSize();
  
  page.drawText(jsonContent.substring(0, 1200), { x: 50, y: height - 50, size: 9, maxWidth: width - 100, lineHeight: 12 });
  return await pdfDoc.save();
}

export async function csvToPDF(csvContent: string): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage();
  const { width, height } = page.getSize();
  
  const lines = csvContent.split("\n").slice(0, 50);
  let y = height - 50;
  for (const line of lines) {
    if (y < 40) break;
    page.drawText(line.replace(/,/g, "   |   ").substring(0, 90), { x: 50, y: y, size: 9 });
    y -= 15;
  }
  
  return await pdfDoc.save();
}

export async function xmlToPDF(xmlContent: string): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage();
  const { width, height } = page.getSize();
  
  page.drawText(xmlContent.substring(0, 1000), { x: 50, y: height - 50, size: 9, maxWidth: width - 100, lineHeight: 13 });
  return await pdfDoc.save();
}

/**
 * Add text watermark to all pages in a PDF
 */
export async function addWatermarkToPDF(
  file: File,
  text: string,
  options: { opacity: number; rotation: number; size: number }
): Promise<Uint8Array> {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);
  const pages = pdfDoc.getPages();

  for (const page of pages) {
    const { width, height } = page.getSize();
    page.drawText(text, {
      x: width / 2 - (text.length * options.size) / 4,
      y: height / 2,
      size: options.size,
      opacity: options.opacity,
      rotate: degrees(options.rotation),
      color: rgb(0.5, 0.5, 0.5)
    });
  }

  return await pdfDoc.save();
}

/**
 * Add page numbering to all pages in a PDF
 */
export async function addPageNumbersToPDF(
  file: File,
  format: string, // e.g. "Page {n}" or "Page {n} of {all}" or just "{n}"
  position: "bottom-right" | "bottom-center"
): Promise<Uint8Array> {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);
  const pages = pdfDoc.getPages();
  const totalPages = pages.length;

  for (let i = 0; i < totalPages; i++) {
    const page = pages[i];
    const { width, height } = page.getSize();
    const pageNum = i + 1;
    
    let text = format
      .replace("{n}", String(pageNum))
      .replace("{all}", String(totalPages));
      
    const fontSize = 10;
    const textWidth = text.length * 6;
    
    let drawX = width - textWidth - 40;
    if (position === "bottom-center") {
      drawX = (width - textWidth) / 2;
    }
    
    page.drawText(text, {
      x: drawX,
      y: 30,
      size: fontSize,
      color: rgb(0.3, 0.3, 0.3)
    });
  }

  return await pdfDoc.save();
}


