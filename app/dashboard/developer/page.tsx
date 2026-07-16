"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { KeyRound, Eye, EyeOff, Copy, Check, ArrowLeft, Terminal, ShieldAlert, History } from "lucide-react";
import confetti from "canvas-confetti";

interface AuditLog {
  timestamp: string;
  userId: string;
  action: string;
  resourceId: string;
  status: "success" | "failure";
  ipAddress: string;
  details: string;
}

export default function DeveloperDashboard() {
  const [apiKey, setApiKey] = useState("pdfv_live_test_key_12345");
  const [revealKey, setRevealKey] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [loadingLogs, setLoadingLogs] = useState(false);

  // Load audit logs (client-side)
  const fetchLogs = async () => {
    setLoadingLogs(true);
    try {
      setAuditLogs([
        { timestamp: new Date().toISOString(), userId: "dev-001", action: "API Key Generated", resourceId: "key-001", status: "success", ipAddress: "127.0.0.1", details: "New API key created" },
        { timestamp: new Date(Date.now() - 3600000).toISOString(), userId: "api-client", action: "PDF Extraction", resourceId: "doc-042", status: "success", ipAddress: "192.168.1.1", details: "Text extracted from PDF" },
        { timestamp: new Date(Date.now() - 7200000).toISOString(), userId: "api-client", action: "OCR Request", resourceId: "doc-041", status: "success", ipAddress: "192.168.1.1", details: "OCR completed successfully" },
      ]);
    } catch (e) {
      console.error("Failed to load audit logs", e);
    } finally {
      setLoadingLogs(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGenerateKey = () => {
    const random = Math.floor(10000 + Math.random() * 90000);
    const newKey = `pdfv_live_dev_key_${random}`;
    setApiKey(newKey);
    confetti();
  };

  return (
    <div style={styles.page}>
      <div className="container" style={styles.container}>
        <Link href="/" style={styles.backLink}>
          <ArrowLeft size={16} />
          <span>Back to Home</span>
        </Link>

        <div style={styles.header}>
          <h1 style={styles.title}>Developer Platform</h1>
          <p style={styles.subtitle}>Integrate PDFVerse AI conversions and OCR engines into your developer systems.</p>
        </div>

        <div style={styles.grid}>
          {/* Key Management & Code Card */}
          <div style={styles.main}>
            {/* Key Manager */}
            <div style={styles.card} className="glass-card">
              <div style={styles.cardHeader}>
                <div style={styles.iconWrapper}>
                  <KeyRound size={20} />
                </div>
                <h3>Developer Credentials</h3>
              </div>
              
              <p style={styles.desc}>
                Your API calls are rate-limited to 60 requests/minute. Authenticate calls using Bearer token authorization headers.
              </p>

              <div style={styles.keyRow} className="glass-card">
                <span style={styles.keyLabel}>SECRET KEY</span>
                <span style={styles.keyText}>
                  {revealKey ? apiKey : "••••••••••••••••••••••••••••"}
                </span>
                <div style={{ display: "flex", gap: "8px" }}>
                  <button onClick={() => setRevealKey(!revealKey)} style={styles.iconBtn}>
                    {revealKey ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                  <button onClick={handleCopy} style={styles.iconBtn}>
                    {copied ? <Check size={16} color="var(--success)" /> : <Copy size={16} />}
                  </button>
                </div>
              </div>

              <button onClick={handleGenerateKey} className="btn btn-secondary" style={{ alignSelf: "flex-start" }}>
                Re-generate Secret Key
              </button>
            </div>

            {/* Test Snippet */}
            <div style={styles.card} className="glass-card">
              <div style={styles.cardHeader}>
                <div style={styles.iconWrapper}>
                  <Terminal size={20} />
                </div>
                <h3>Test API Call (cURL)</h3>
              </div>
              <div style={styles.codeBlock}>
                <code>{`curl -X POST https://pdfverse-ai.com/api/v1/ocr \\
  -H "Authorization: Bearer ${apiKey}" \\
  -F "file=@your-document.pdf"`}</code>
              </div>
            </div>
          </div>

          {/* Audit Logs Column */}
          <div style={styles.sidebar}>
            <div style={styles.card} className="glass-card">
              <div style={{ ...styles.cardHeader, justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <div style={styles.iconWrapper}>
                    <ShieldAlert size={20} />
                  </div>
                  <h3>SOC2 Security Audit Log</h3>
                </div>
                <button onClick={fetchLogs} style={styles.refreshBtn} disabled={loadingLogs}>
                  {loadingLogs ? "..." : <History size={16} />}
                </button>
              </div>

              <div style={styles.logList}>
                {auditLogs.length === 0 ? (
                  <p style={{ color: "var(--text-tertiary)", fontSize: "13px", textAlign: "center", padding: "20px" }}>
                    No security events logged yet. Try performing actions or API calls.
                  </p>
                ) : (
                  auditLogs.map((log, idx) => (
                    <div key={idx} style={styles.logRow}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                        <span style={styles.logAction}>{log.action}</span>
                        <span style={{ 
                          ...styles.logStatus, 
                          color: log.status === "success" ? "var(--success)" : "var(--danger)" 
                        }}>
                          {log.status.toUpperCase()}
                        </span>
                      </div>
                      <p style={styles.logDetail}>{log.details}</p>
                      <span style={styles.logTime}>{log.timestamp.split('T')[1].split('.')[0]}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  page: {
    padding: "60px 0 80px 0",
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
  header: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  title: {
    fontSize: "36px",
    fontWeight: "800",
  },
  subtitle: {
    color: "var(--text-secondary)",
    fontSize: "16px",
  },
  grid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "32px",
  },
  main: {
    flex: "2 1 500px",
    display: "flex",
    flexDirection: "column",
    gap: "32px",
  },
  sidebar: {
    flex: "1 1 300px",
    display: "flex",
    flexDirection: "column",
  },
  card: {
    padding: "32px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    height: "100%",
  },
  cardHeader: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  iconWrapper: {
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
  desc: {
    fontSize: "14px",
    color: "var(--text-secondary)",
    lineHeight: "1.6",
  },
  keyRow: {
    padding: "16px 20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "16px",
  },
  keyLabel: {
    fontSize: "10px",
    fontWeight: "800",
    color: "var(--text-tertiary)",
    letterSpacing: "0.05em",
  },
  keyText: {
    fontFamily: "monospace",
    fontSize: "14px",
    flex: 1,
    textAlign: "center",
  },
  iconBtn: {
    background: "none",
    border: "none",
    color: "var(--text-secondary)",
    cursor: "pointer",
  },
  codeBlock: {
    background: "var(--bg-tertiary)",
    border: "1px solid var(--border-color)",
    padding: "20px",
    borderRadius: "8px",
    fontFamily: "monospace",
    fontSize: "13px",
    lineHeight: "1.5",
    color: "var(--text-primary)",
    overflowX: "auto",
  },
  refreshBtn: {
    background: "none",
    border: "none",
    color: "var(--text-secondary)",
    cursor: "pointer",
  },
  logList: {
    maxHeight: "360px",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  logRow: {
    borderBottom: "1px solid var(--border-color)",
    paddingBottom: "12px",
  },
  logAction: {
    fontWeight: "700",
    fontSize: "12px",
  },
  logStatus: {
    fontSize: "10px",
    fontWeight: "800",
  },
  logDetail: {
    fontSize: "13px",
    color: "var(--text-secondary)",
    margin: "4px 0",
  },
  logTime: {
    fontSize: "10px",
    color: "var(--text-tertiary)",
  }
};
