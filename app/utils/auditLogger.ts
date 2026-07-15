import fs from "fs";
import path from "path";

export interface AuditLogEntry {
  timestamp: string;
  userId: string;
  action: string;
  resourceId: string;
  status: "success" | "failure";
  ipAddress: string;
  details: string;
}

/**
 * Audit Logger utility for SOC2 trace compliance.
 * Logs security and data actions locally or to a simulated store.
 */
export class AuditLogger {
  private static logFilePath = path.join(process.cwd(), "logs", "audit.log");

  /**
   * Log an audit event.
   */
  public static async log(entry: Omit<AuditLogEntry, "timestamp">) {
    const fullEntry: AuditLogEntry = {
      timestamp: new Date().toISOString(),
      ...entry,
    };

    console.log(`[AUDIT LOG] ${JSON.stringify(fullEntry)}`);

    try {
      const logsDir = path.join(process.cwd(), "logs");
      if (!fs.existsSync(logsDir)) {
        fs.mkdirSync(logsDir, { recursive: true });
      }

      fs.appendFileSync(this.logFilePath, JSON.stringify(fullEntry) + "\n", "utf8");
    } catch (error) {
      console.error("Failed to write to audit log file:", error);
    }
  }

  /**
   * Retrieve recent logs (for dashboard views).
   */
  public static getRecentLogs(limit: number = 20): AuditLogEntry[] {
    try {
      if (!fs.existsSync(this.logFilePath)) return [];
      
      const fileContent = fs.readFileSync(this.logFilePath, "utf8");
      const lines = fileContent.trim().split("\n").filter(Boolean);
      
      return lines
        .map((line) => JSON.parse(line) as AuditLogEntry)
        .reverse()
        .slice(0, limit);
    } catch (e) {
      console.error("Failed to read audit logs:", e);
      return [];
    }
  }
}
