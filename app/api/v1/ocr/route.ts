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
    
    // Set headers
    const headers = {
      "X-RateLimit-Limit": String(limit),
      "X-RateLimit-Remaining": String(remaining),
    };

    if (!allowed) {
      await AuditLogger.log({
        userId: apiKey.substring(0, 15),
        action: "API_OCR_RATE_LIMIT",
        resourceId: "API",
        status: "failure",
        ipAddress: request.headers.get("x-forwarded-for") || "unknown",
        details: "API Rate limit exceeded."
      });
      return NextResponse.json({ error: "Too many requests. Rate limit exceeded." }, { status: 429, headers });
    }

    // Process OCR request
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "Missing file parameter." }, { status: 400, headers });
    }

    // Simulate OCR text extraction for API
    const extractedText = `[OCR Text Extraction from API]
Document Name: ${file.name}
Extracted at: ${new Date().toISOString()}

Operational parameters are correctly established. Systems are active.`;

    await AuditLogger.log({
      userId: apiKey.substring(0, 15),
      action: "API_OCR_EXTRACTION",
      resourceId: file.name,
      status: "success",
      ipAddress: request.headers.get("x-forwarded-for") || "unknown",
      details: `OCR text extracted from ${file.name}`
    });

    return NextResponse.json({ success: true, text: extractedText }, { headers });

  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
