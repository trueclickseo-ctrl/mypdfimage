import Link from "next/link";
import React from "react";

// Simple Related Tools component – shows a few hub‑and‑spoke links
export default function RelatedTools({ currentTool }: { currentTool: string }) {
  // Define a static mapping of related tool keys (could be expanded later)
  const relatedMap: { [key: string]: string[] } = {
    "merge-pdf": ["split-pdf", "compress-pdf", "pdf-editor", "page-numbers"],
    "split-pdf": ["merge-pdf", "compress-pdf", "pdf-to-word", "pdf-to-jpg"],
    "compress-pdf": ["merge-pdf", "split-pdf", "image-to-pdf", "pdf-editor"],
    // fallback for any other tool – show a handful of popular tools
    "default": ["merge-pdf", "split-pdf", "compress-pdf", "pdf-editor"],
  };

  const related = relatedMap[currentTool] || relatedMap["default"];

  const cardStyle: React.CSSProperties = {
    border: "1px solid var(--border-color)",
    borderRadius: "10px",
    padding: "12px 16px",
    background: "var(--bg-tertiary)",
    textAlign: "center",
    transition: "transform var(--transition-fast)",
    cursor: "pointer",
  };

  return (
    <div style={{ marginTop: "24px" }}>
      <h3 style={{ fontSize: "20px", fontWeight: 600, marginBottom: "12px" }}>
        Related Tools
      </h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
          gap: "12px",
        }}
      >
        {related.map((toolKey) => (
          <Link key={toolKey} href={`/tools/${toolKey}`} style={cardStyle}>
            {toolKey.replace(/-/g, " ")}
          </Link>
        ))}
      </div>
    </div>
  );
}
