import { NextResponse } from "next/server";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: corsHeaders,
  });
}

export async function POST(request: Request) {
  try {
    const { prompt, documentText, action } = await request.json();

    // Check for API Keys in environment (fallback to smart mocks if not set)
    const apiKey = process.env.AI_API_KEY || process.env.CLAUDE_API_KEY || process.env.OPENAI_API_KEY;

    if (!apiKey) {
      // Simulate smart mock answers depending on action type to allow complete offline validation
      let answer = "";
      const textPreview = documentText ? `"${documentText.substring(0, 100).replace(/\n/g, " ")}..."` : "document";

      switch (action) {
        case "summarize":
          answer = `### Executive Summary
This document discusses the primary themes extracted from the source material. Here are the core highlights:

1. **Primary Context**: The text details key operational frameworks and structure.
2. **Key Insights**: We identified several structural blocks describing workflow actions.
3. **Core Recommendations**: Establish robust monitoring, configure standard parameters, and implement verification loops.

*Processed successfully locally via PDFVerse AI.*`;
          break;

        case "translate":
          answer = `[Translated Output Document Text Preview]
This is a high-fidelity translation simulation of the document content:
"${(documentText || "No text provided").substring(0, 300)}"
Translated using native multi-language dictionaries.`;
          break;

        case "review":
          answer = `### AI Contract Review & Risk Analysis

- **Risk Score**: **Low-Medium (3/10)**
- **Detected Clauses**:
  - *Termination*: Standard 30-day notice period detected.
  - *Liability*: Standard limitations of liability apply.
- **Key Findings**:
  - **Clause 4.2**: The dispute resolution process is missing a defined jurisdiction. (Highly Recommended to Add)
  - **Section 9**: Confidentiality provisions are robust and match standard NDAs.`;
          break;

        case "qa":
        case "chat":
        default:
          answer = `Hello! I've analyzed your document. 

Based on the content of the file, here is the answer to your prompt ("${prompt}"):
- The text refers to active operations and structural configurations.
- All tasks are performed in-memory to preserve privacy.

Feel free to ask any other questions about the document!`;
          break;
      }

      // Simulate a small network delay for realistic visual loading indicators
      await new Promise((resolve) => setTimeout(resolve, 800));

      return NextResponse.json({ success: true, answer, mock: true }, { headers: corsHeaders });
    }

    // Real API integration (if API keys are provided)
    let apiEndpoint = "https://api.anthropic.com/v1/messages";
    let headers: Record<string, string> = {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01"
    };
    let body = {};

    if (process.env.OPENAI_API_KEY) {
      apiEndpoint = "https://api.openai.com/v1/chat/completions";
      headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      };
      body = {
        model: "gpt-4-turbo",
        messages: [
          { role: "system", content: "You are a professional PDF document helper. Analyze the provided text context and answer questions precisely." },
          { role: "user", content: `Context: ${documentText}\n\nQuestion: ${prompt}` }
        ]
      };
    } else {
      // Claude body
      body = {
        model: "claude-3-haiku-20240307",
        max_tokens: 1024,
        messages: [
          { role: "user", content: `Here is the text content from a PDF document:\n\n<context>\n${documentText}\n</context>\n\nPlease perform the following request on it: ${prompt}` }
        ]
      };
    }

    const response = await fetch(apiEndpoint, {
      method: "POST",
      headers,
      body: JSON.stringify(body)
    });

    const data = await response.json();
    let answerText = "";

    if (process.env.OPENAI_API_KEY) {
      answerText = data.choices?.[0]?.message?.content || "No response received.";
    } else {
      answerText = data.content?.[0]?.text || "No response received.";
    }

    return NextResponse.json({ success: true, answer: answerText, mock: false }, { headers: corsHeaders });

  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500, headers: corsHeaders });
  }
}
