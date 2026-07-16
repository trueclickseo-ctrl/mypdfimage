import React from "react";

// Simple SEO/AEO/GEO comparison table component
export default function AeoGeoTable() {
  const tableStyle: React.CSSProperties = {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "24px",
    background: "var(--bg-tertiary)",
    borderRadius: "8px",
    overflow: "hidden",
  };

  const thStyle: React.CSSProperties = {
    background: "var(--accent-primary)",
    color: "white",
    padding: "12px",
    textAlign: "center",
    fontWeight: 600,
  };

  const tdStyle: React.CSSProperties = {
    padding: "12px",
    borderBottom: "1px solid var(--border-color)",
    textAlign: "center",
    color: "var(--text-primary)",
  };

  const rows = [
    {
      aspect: "Primary Goal",
      seo: "Rank higher in traditional SERPs",
      aeo: "Earn citations in AI‑generated answers",
      geo: "Featured in generative AI overviews & snippets",
    },
    {
      aspect: "Content Focus",
      seo: "Keyword‑rich, evergreen content",
      aeo: "Direct answer‑oriented, concise snippets",
      geo: "Contextual, multi‑modal data for AI models",
    },
    {
      aspect: "Key Metrics",
      seo: "Organic traffic, backlinks, CTR",
      aeo: "Answer impressions, citation count",
      geo: "AI overview placement, content freshness",
    },
    {
      aspect: "Optimization Tactics",
      seo: "On‑page SEO, link building, technical audit",
      aeo: "Structured data, schema, quick answer formatting",
      geo: "Rich media, multimodal assets, knowledge graph linking",
    },
  ];

  return (
    <table style={tableStyle}>
      <thead>
        <tr>
          <th style={thStyle}>Aspect</th>
          <th style={thStyle}>SEO</th>
          <th style={thStyle}>AEO</th>
          <th style={thStyle}>GEO</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, idx) => (
          <tr key={idx}>
            <td style={tdStyle}>{row.aspect}</td>
            <td style={tdStyle}>{row.seo}</td>
            <td style={tdStyle}>{row.aeo}</td>
            <td style={tdStyle}>{row.geo}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
