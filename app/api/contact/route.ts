import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ success: false, error: "All fields are required." }, { status: 400 });
    }

    const messageData = {
      id: Date.now().toString(),
      name,
      email,
      subject,
      message,
      timestamp: new Date().toISOString(),
      recipient: "trueclickseo@gmail.com"
    };

    // Save locally to public/contact_messages.json so they never lose messages
    const logPath = path.join(process.cwd(), "public", "contact_messages.json");
    let messages = [];

    if (fs.existsSync(logPath)) {
      try {
        const fileContent = fs.readFileSync(logPath, "utf8");
        messages = JSON.parse(fileContent);
      } catch (err) {
        messages = [];
      }
    }

    messages.push(messageData);
    fs.writeFileSync(logPath, JSON.stringify(messages, null, 2), "utf8");

    // Print to console logs for local review
    console.log(`[CONTACT FORM] Message received for trueclickseo@gmail.com:`, messageData);

    return NextResponse.json({ 
      success: true, 
      message: "Message received. Notification saved locally." 
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
