import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://pdfverse-ai.com"; // Replace with your production domain

  const tools = [
    "merge-pdf",
    "split-pdf",
    "compress-pdf",
    "chat-pdf",
    "summarize-pdf",
    "translate-pdf",
    "review-pdf",
    "ocr-pdf",
    "excel-to-pdf",
    "pdf-to-excel",
    "pdf-to-word",
    "word-to-pdf",
    "pdf-to-jpg",
    "jpg-to-pdf",
    "rotate-pdf",
    "organize-pdf",
    "add-password",
    "remove-password",
    "sign-pdf"
  ];

  const categories = [
    "convert",
    "organize",
    "security",
    "optimize",
    "ai"
  ];

  const guides = [
    "how-to-merge-pdfs-locally",
    "extract-text-scanned-pdf-ocr",
    "pdf-password-encryption-guide",
    "converting-pdf-tables-to-excel"
  ];

  const toolUrls = tools.map((tool) => ({
    url: `${baseUrl}/tools/${tool}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const categoryUrls = categories.map((cat) => ({
    url: `${baseUrl}/categories/${cat}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const guideUrls = guides.map((slug) => ({
    url: `${baseUrl}/guides/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/tools`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/guides`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/security`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
    ...toolUrls,
    ...categoryUrls,
    ...guideUrls,
  ];
}
