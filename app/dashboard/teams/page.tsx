"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Users, UserPlus, Shield, Info, ArrowLeft, KeyRound, Database } from "lucide-react";
import confetti from "canvas-confetti";

interface TeamMember {
  id: string;
  email: string;
  role: "Owner" | "Admin" | "Member" | "Guest";
  addedAt: string;
}

export default function TeamDashboard() {
  const [members, setMembers] = useState<TeamMember[]>([
    { id: "1", email: "ceo@pdfverse.com", role: "Owner", addedAt: "2026-06-01" },
    { id: "2", email: "cto@pdfverse.com", role: "Admin", addedAt: "2026-06-05" },
    { id: "3", email: "developer@pdfverse.com", role: "Member", addedAt: "2026-06-10" }
  ]);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<"Admin" | "Member" | "Guest">("Member");

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail.trim()) return;

    const newMember: TeamMember = {
      id: String(members.length + 1),
      email: inviteEmail,
      role: inviteRole,
      addedAt: new Date().toISOString().split("T")[0]
    };

    setMembers(prev => [...prev, newMember]);
    setInviteEmail("");
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
          <h1 style={styles.title}>Team Workspace Settings</h1>
          <p style={styles.subtitle}>Manage team members, single sign-on (SSO), and shared usage limits.</p>
        </div>

        <div style={styles.dashboardGrid}>
          {/* Members Column */}
          <div style={styles.colMain}>
            <div style={styles.card} className="glass-card">
              <div style={styles.cardHeader}>
                <div style={styles.cardIconWrapper}>
                  <Users size={20} />
                </div>
                <h3>Active Team Members</h3>
              </div>
              
              <div style={styles.memberList}>
                {members.map((member) => (
                  <div key={member.id} style={styles.memberRow} className="glass-card">
                    <div>
                      <span style={styles.memberEmail}>{member.email}</span>
                      <span style={styles.memberDate}>Added on {member.addedAt}</span>
                    </div>
                    <div style={styles.roleWrapper}>
                      <Shield size={14} color="var(--accent-primary)" />
                      <span style={styles.memberRole}>{member.role}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Invite Form */}
            <div style={styles.card} className="glass-card">
              <div style={styles.cardHeader}>
                <div style={styles.cardIconWrapper}>
                  <UserPlus size={20} />
                </div>
                <h3>Invite Member</h3>
              </div>
              <form onSubmit={handleInvite} style={styles.inviteForm}>
                <input 
                  type="email" 
                  placeholder="Enter email address..." 
                  value={inviteEmail} 
                  onChange={(e) => setInviteEmail(e.target.value)}
                  style={styles.textInput}
                  required
                />
                <select 
                  value={inviteRole} 
                  onChange={(e) => setInviteRole(e.target.value as any)}
                  style={styles.select}
                >
                  <option value="Member">Member</option>
                  <option value="Admin">Admin</option>
                  <option value="Guest">Guest</option>
                </select>
                <button type="submit" className="btn btn-primary">Invite</button>
              </form>
            </div>
          </div>

          {/* Sidebar Config (SSO & SOC2 Checklists) */}
          <div style={styles.colSidebar}>
            {/* SSO Card */}
            <div style={styles.card} className="glass-card">
              <div style={styles.cardHeader}>
                <div style={styles.cardIconWrapper}>
                  <KeyRound size={20} />
                </div>
                <h3>SSO / SAML</h3>
              </div>
              <p style={styles.infoText}>
                Connect Okta, Azure AD, or Google Workspace to enforce single sign-on authentication.
              </p>
              <div style={styles.infoBox}>
                <Info size={16} color="var(--accent-secondary)" style={{ flexShrink: 0 }} />
                <span style={{ fontSize: "12px", color: "var(--text-secondary)" }}>
                  SSO integration templates are available under active enterprise licenses.
                </span>
              </div>
            </div>

            {/* SOC2 Security Card */}
            <div style={styles.card} className="glass-card">
              <div style={styles.cardHeader}>
                <div style={styles.cardIconWrapper}>
                  <Database size={20} />
                </div>
                <h3>SOC2 Compliance Info</h3>
              </div>
              <ul style={styles.auditList}>
                <li style={styles.auditItem}>🔒 **AES-256 Encryption** applied at rest</li>
                <li style={styles.auditItem}>🕵️‍♂️ **Immutability Logging** tracking API calls</li>
                <li style={styles.auditItem}>🛡️ **Least Privilege Role Policies** configured</li>
              </ul>
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
  dashboardGrid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "32px",
  },
  colMain: {
    flex: "3 1 600px",
    display: "flex",
    flexDirection: "column",
    gap: "32px",
  },
  colSidebar: {
    flex: "1 1 280px",
    display: "flex",
    flexDirection: "column",
    gap: "32px",
  },
  card: {
    padding: "32px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  cardHeader: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  cardIconWrapper: {
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
  memberList: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  memberRow: {
    padding: "16px 24px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  memberEmail: {
    fontWeight: "700",
    fontSize: "15px",
    display: "block",
  },
  memberDate: {
    fontSize: "12px",
    color: "var(--text-tertiary)",
    display: "block",
  },
  roleWrapper: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    background: "rgba(79, 70, 229, 0.05)",
    padding: "4px 12px",
    borderRadius: "100px",
    border: "1px solid rgba(79, 70, 229, 0.1)",
  },
  memberRole: {
    fontSize: "13px",
    fontWeight: "600",
  },
  inviteForm: {
    display: "flex",
    gap: "16px",
  },
  textInput: {
    flex: 1,
    background: "var(--bg-tertiary)",
    border: "1px solid var(--border-color)",
    borderRadius: "8px",
    padding: "12px",
    color: "var(--text-primary)",
    outline: "none",
  },
  select: {
    background: "var(--bg-tertiary)",
    border: "1px solid var(--border-color)",
    borderRadius: "8px",
    padding: "12px",
    color: "var(--text-primary)",
    outline: "none",
  },
  infoText: {
    fontSize: "14px",
    color: "var(--text-secondary)",
    lineHeight: "1.6",
  },
  infoBox: {
    display: "flex",
    gap: "10px",
    background: "rgba(6, 182, 212, 0.05)",
    border: "1px solid rgba(6, 182, 212, 0.1)",
    padding: "12px",
    borderRadius: "8px",
  },
  auditList: {
    listStyle: "none",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  auditItem: {
    fontSize: "13px",
    lineHeight: "1.6",
  }
};
