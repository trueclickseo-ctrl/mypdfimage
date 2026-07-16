import Head from "next/head";
import Image from "next/image";
import AeoGeoTable from "@/app/components/AeoGeoTable";

export default function AboutPage() {
  const styles = {
    page: {
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "40px 0",
    },
    container: {
      maxWidth: "960px",
      width: "100%",
      background: "white",
      borderRadius: "12px",
      boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
      overflow: "hidden",
    },
    hero: {
      position: "relative",
      height: "280px",
      background: "linear-gradient(120deg, #4f46e5, #6d28d9)",
      color: "white",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      padding: "0 20px",
    },
    title: {
      fontSize: "36px",
      fontWeight: 800,
      marginBottom: "12px",
    },
    tagline: {
      fontSize: "18px",
      fontWeight: 600,
      color: "#f3f4f6",
    },
    section: {
      padding: "32px 24px",
      borderBottom: "1px solid #e5e7eb",
    },
    sectionTitle: {
      fontSize: "24px",
      fontWeight: 700,
      marginBottom: "16px",
    },
    paragraph: {
      lineHeight: "1.6",
      color: "#4b5563",
    },
    teamGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: "24px",
    },
    memberCard: {
      textAlign: "center",
    },
    memberImg: {
      borderRadius: "50%",
      marginBottom: "12px",
    },
    memberName: {
      fontWeight: 600,
      fontSize: "18px",
      marginBottom: "4px",
    },
    memberRole: {
      fontSize: "14px",
      color: "#6b7280",
    },
  } as const;

  const team = [
    { name: "Alex Patel", role: "Founder & Chief Engineer", img: "/logo_icon.jpg" },
    { name: "Priya Singh", role: "Lead UX Designer", img: "/logo_icon.jpg" },
    { name: "Rohit Kumar", role: "Senior Backend Engineer", img: "/logo_icon.jpg" },
    { name: "Mia Chen", role: "AI & Data Scientist", img: "/logo_icon.jpg" },
  ];

  return (
    <>
      <Head>
        <title>About My PDF Image – Trusted PDF & Image Tools</title>
        <meta name="description" content="Learn about My PDF Image, the team behind the fastest, privacy‑first PDF and image processing tools. Our mission, expertise, and commitment to security." />
        <meta name="robots" content="index, follow" />
      </Head>
      <div style={styles.page}>
        <div style={styles.container}>
          <section style={styles.hero}>
            <h1 style={styles.title}>We Power Your Documents</h1>
            <p style={styles.tagline}>Secure, fast, client‑side PDF & image tools built for creators, businesses, and governments.</p>
          </section>
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>Our Mission</h2>
            <p style={styles.paragraph}>At My PDF Image we believe every user should have full control over their data. All our tools run entirely in the browser – no files are ever uploaded to a server. We combine modern WebAssembly‑powered PDF processing with a sleek UI that feels premium on any device.</p>
          </section>
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>Our Team</h2>
            <div style={styles.teamGrid}>
              {team.map((member) => (
                <div key={member.name} style={styles.memberCard}>
                  <Image src={member.img} alt={member.name} width={120} height={120} style={styles.memberImg} />
                  <div style={styles.memberName}>{member.name}</div>
                  <div style={styles.memberRole}>{member.role}</div>
                </div>
              ))}
            </div>
          </section>
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>Why Trust Us</h2>
            <p style={styles.paragraph}>• All operations are performed locally – your documents never leave your device.<br />• Open‑source libraries such as <code>pdf‑lib</code> and <code>tesseract.js</code> are audited regularly.<br />• We comply with GDPR and CCPA, offering transparent privacy policies.</p>
          
          </section>
        </div>
      </div>
    </>
  );
}
