import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ success: false, error: "All fields are required." }, { status: 400 });
    }

    const messageData = {
      name,
      email,
      subject,
      message,
      timestamp: new Date().toISOString(),
      recipient: "trueclickseo@gmail.com"
    };

    // Print to Vercel console logs (always visible in your Vercel Dashboard logs tab!)
    console.log(`[CONTACT FORM INQUIRY]:`, messageData);

    // If SMTP Env Variables are configured in Vercel, send the actual email!
    const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
    const smtpPort = Number(process.env.SMTP_PORT) || 465;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (smtpUser && smtpPass) {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      await transporter.sendMail({
        from: `"${name}" <${smtpUser}>`,
        to: "trueclickseo@gmail.com",
        replyTo: email,
        subject: `[My PDF Image Contact] ${subject}`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        html: `
          <h3>New Message from My PDF Image</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap; background: #f4f4f5; padding: 12px; border-radius: 6px;">${message}</p>
        `,
      });
      
      console.log("Email dispatched successfully via SMTP.");
    } else {
      console.log("SMTP environment variables not set. Email not dispatched, logged to console instead.");
    }

    return NextResponse.json({ 
      success: true, 
      message: "Message received successfully." 
    });
  } catch (error: any) {
    console.error("Contact Form Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
