import { NextResponse } from "next/server";
import { AuditLogger } from "@/app/utils/auditLogger";

export async function GET() {
  try {
    const logs = AuditLogger.getRecentLogs(20);
    return NextResponse.json({ success: true, logs });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
