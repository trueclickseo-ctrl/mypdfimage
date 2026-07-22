"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sun, Moon, Sparkles, Menu, X, FileText } from "lucide-react";

export default function Header() {
  const [theme, setTheme] = useState("light");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "All Tools", href: "/tools" },
    { name: "Contact Us", href: "/contact" },
    { name: "Developer API", href: "/dashboard/developer" },
  ];

  return (
    <header style={styles.header}>
      <div className="container" style={styles.container}>
        <Link href="/" style={styles.logo}>
          <img 
            src="/logo_icon.jpg" 
            alt="My PDF Image" 
            style={{ width: "32px", height: "32px", borderRadius: "8px", boxShadow: "0 4px 10px rgba(79, 70, 229, 0.3)" }} 
          />
          <span style={styles.logoText}>
            My PDF <span style={styles.logoAccent}>Image</span>
          </span>
          <span style={styles.badge}>Pro Tools</span>
        </Link>

        {/* Desktop Navigation */}
        <nav style={styles.nav}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                ...styles.navLink,
                color: pathname === link.href ? "var(--accent-primary)" : "var(--text-primary)",
                fontWeight: pathname === link.href ? "800" : "600",
              }}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div style={styles.actions}>
          <button onClick={toggleTheme} style={styles.themeToggle} aria-label="Toggle Theme">
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          
          <button 
            style={styles.mobileMenuToggle} 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMenuOpen && (
        <div style={styles.mobileDrawer} className="animate-fade-in">
          <nav style={styles.mobileNav}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                style={{
                  ...styles.mobileNavLink,
                  color: pathname === link.href ? "var(--accent-primary)" : "var(--text-secondary)",
                }}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  header: {
    borderBottom: "1px solid var(--border-color)",
    background: "var(--bg-header)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    position: "sticky",
    top: 0,
    zIndex: 100,
    transition: "background-color var(--transition-normal), border-color var(--transition-normal)",
  },
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: "72px",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    textDecoration: "none",
  },
  logoIcon: {
    background: "linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)",
    borderRadius: "8px",
    width: "32px",
    height: "32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 4px 10px rgba(79, 70, 229, 0.3)",
  },
  logoText: {
    fontSize: "20px",
    fontWeight: "800",
    letterSpacing: "-0.02em",
    color: "var(--text-primary)",
  },
  logoAccent: {
    background: "linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  badge: {
    fontSize: "11px",
    padding: "2px 8px",
    borderRadius: "10px",
    background: "rgba(79, 70, 229, 0.1)",
    border: "1px solid rgba(79, 70, 229, 0.2)",
    color: "var(--accent-primary)",
    fontWeight: 600,
  },
  nav: {
    display: "flex",
    alignItems: "center",
    gap: "32px",
  },
  navLink: {
    fontSize: "16px",
    letterSpacing: "-0.01em",
    transition: "all var(--transition-fast)",
  },
  actions: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  themeToggle: {
    background: "var(--bg-tertiary)",
    border: "1px solid var(--border-color)",
    color: "var(--text-primary)",
    width: "40px",
    height: "40px",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "all var(--transition-fast)",
  },
  mobileMenuToggle: {
    background: "none",
    border: "none",
    color: "var(--text-primary)",
    cursor: "pointer",
    display: "none",
  },
  mobileDrawer: {
    position: "absolute",
    top: "72px",
    left: 0,
    right: 0,
    background: "var(--bg-secondary)",
    borderBottom: "1px solid var(--border-color)",
    padding: "24px",
    zIndex: 99,
  },
  mobileNav: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  mobileNavLink: {
    fontSize: "16px",
    fontWeight: "500",
  },
};

// Add responsive media query CSS styles via React tags or external style fixes
if (typeof window !== "undefined") {
  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = `
    @media (max-width: 768px) {
      header nav { display: none !important; }
      header button[aria-label="Toggle Menu"] { display: flex !important; }
    }
    header nav a {
      transition: all 0.2s ease-in-out !important;
    }
    header nav a:hover {
      color: var(--accent-primary) !important;
      transform: scale(1.08);
      text-shadow: 0 0 10px rgba(79, 70, 229, 0.2);
    }
  `;
  document.head.appendChild(styleSheet);
}
