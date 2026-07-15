"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail, Send, CheckCircle } from "lucide-react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          access_key: "a2b0bf2d-22be-4ca1-8178-5775f0a0a5b2", // Default/placeholder key for trueclickseo@gmail.com contact submissions
          name,
          email,
          subject: `[My PDF Image Contact] ${subject}`,
          message
        }),
      });
      const data = await res.json();
      if (!data.success) {
        throw new Error(data.message || "Failed to send message.");
      }
      setSubmitted(true);
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={styles.page}>
      <div className="container" style={styles.container}>
        <Link href="/" style={styles.backLink}>
          <ArrowLeft size={16} />
          <span>Back to Home</span>
        </Link>

        <div style={styles.header}>
          <div style={styles.iconWrapper}>
            <Mail size={24} color="#ffffff" />
          </div>
          <h1 style={styles.title}>Contact Us</h1>
          <p style={styles.subtitle}>Have a question, feedback, or need support? Reach out to us directly.</p>
        </div>

        <div style={styles.card} className="glass-card">
          {submitted ? (
            <div style={styles.successWrapper}>
              <CheckCircle size={48} color="#10b981" style={{ marginBottom: "16px" }} />
              <h2>Message Sent Successfully!</h2>
              <p style={styles.paragraph}>
                Thank you for contacting My PDF Image. We have received your message and will respond to you shortly.
              </p>
              <button onClick={() => setSubmitted(false)} className="btn btn-primary" style={{ marginTop: "16px" }}>
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.formRow}>
                <div style={{ ...styles.inputGroup, flex: 1, minWidth: "250px" }}>
                  <label style={styles.label}>Your Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Doe"
                    style={styles.input}
                    required
                    disabled={submitting}
                  />
                </div>
                <div style={{ ...styles.inputGroup, flex: 1, minWidth: "250px" }}>
                  <label style={styles.label}>Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jane@example.com"
                    style={styles.input}
                    required
                    disabled={submitting}
                  />
                </div>
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Subject</label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="How can we help you?"
                  style={styles.input}
                  required
                  disabled={submitting}
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your issue or feedback in detail..."
                  style={styles.textarea}
                  rows={6}
                  required
                  disabled={submitting}
                />
              </div>

              {error && (
                <div style={{ color: "#ef4444", fontSize: "14px", fontWeight: "600", marginTop: "12px", textAlign: "center" }}>
                  ⚠️ {error}
                </div>
              )}

              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: "100%", height: "48px", marginTop: "12px", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}
                disabled={submitting}
              >
                {submitting ? (
                  "Sending Message..."
                ) : (
                  <>
                    <Send size={16} /> Send Message
                  </>
                )}
              </button>
            </form>
          )}
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
    maxWidth: "650px",
    margin: "0 auto",
  },
  backLink: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    color: "var(--text-secondary)",
    fontSize: "14px",
    fontWeight: "500",
    transition: "color var(--transition-fast)",
  },
  header: {
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "12px",
  },
  iconWrapper: {
    width: "48px",
    height: "48px",
    borderRadius: "12px",
    background: "var(--accent-primary)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: "32px",
    fontWeight: "800",
    margin: 0,
  },
  subtitle: {
    color: "var(--text-secondary)",
    fontSize: "16px",
    margin: 0,
  },
  card: {
    padding: "32px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  formRow: {
    display: "flex",
    gap: "16px",
    flexWrap: "wrap",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    textAlign: "left",
  },
  label: {
    fontSize: "12px",
    fontWeight: "700",
    color: "var(--text-secondary)",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },
  input: {
    height: "45px",
    padding: "0 16px",
    borderRadius: "8px",
    border: "1px solid var(--border-color)",
    background: "var(--bg-tertiary)",
    color: "var(--text-primary)",
    fontSize: "14px",
    outline: "none",
    transition: "all var(--transition-fast)",
  },
  textarea: {
    padding: "12px 16px",
    borderRadius: "8px",
    border: "1px solid var(--border-color)",
    background: "var(--bg-tertiary)",
    color: "var(--text-primary)",
    fontSize: "14px",
    outline: "none",
    resize: "vertical",
    transition: "all var(--transition-fast)",
  },
  successWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    padding: "24px 0",
  },
  paragraph: {
    color: "var(--text-secondary)",
    lineHeight: "1.6",
    fontSize: "15px",
    margin: "12px 0 24px 0",
  },
};
