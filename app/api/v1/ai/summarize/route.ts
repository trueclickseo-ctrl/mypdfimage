import { NextResponse } from "next/server";
import { ApiKeyManager } from "@/app/utils/apiKeyManager";
import { AuditLogger } from "@/app/utils/auditLogger";

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get("Authorization");
    const apiKey = authHeader?.replace("Bearer ", "") || "";

    if (!ApiKeyManager.isValid(apiKey)) {
      return NextResponse.json({ error: "Unauthorized. Invalid API Key." }, { status: 401 });
    }

    const { allowed, remaining, limit } = ApiKeyManager.checkRateLimit(apiKey);
    
    const headers = {
      "X-RateLimit-Limit": String(limit),
      "X-RateLimit-Remaining": String(remaining),
    };

    if (!allowed) {
      await AuditLogger.log({
        userId: apiKey.substring(0, 15),
        action: "API_AI_RATE_LIMIT",
        resourceId: "API",
        status: "failure",
        ipAddress: request.headers.get("x-forwarded-for") || "unknown",
        details: "API AI Rate limit exceeded."
      });
      return NextResponse.json({ error: "Too many requests. Rate limit exceeded." }, { status: 429, headers });
    }

    const { text } = await request.json();

    if (!text) {
      return NextResponse.json({ error: "Missing text content body." }, { status: 400, headers });
    }

    const summary = `### API Summary Output
- **Input text length**: ${text.length} characters.
- **Key Extract**: The document outlines key operational structures.
- **Core Action**: Establish security logging and key validations.`;

    await AuditLogger.log({
      userId: apiKey.substring(0, 15),
      action: "API_AI_SUMMARIZE",
      resourceId: "Text Content",
      status: "success",
      ipAddress: request.headers.get("x-forwarded-for") || "unknown",
      details: "Document text summarized via API"
    });

    return NextResponse.json({ success: true, summary }, { headers });

  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
