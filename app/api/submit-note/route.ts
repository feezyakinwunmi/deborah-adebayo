import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { message, name, email } = await req.json();

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    await resend.emails.send({
      from: "Deborah Adebayo <onboarding@resend.dev>", // Use this for testing (free domain)
      to: "info@craftsandimpressions.com",
      replyTo: email || "onboarding@resend.dev",
      subject: `Personal Note from ${name || "Anonymous"}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
          <h2 style="color: #6b21a8;">New Personal Note for Deborah</h2>
          <p><strong>From:</strong> ${name || "Anonymous"}</p>
          ${email ? `<p><strong>Email:</strong> ${email}</p>` : ""}
          <h3 style="margin-top: 20px;">Message:</h3>
          <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
          <p style="margin-top: 30px; font-size: 14px; color: #666;">
            Sent via the website on ${new Date().toLocaleString()}
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Note submission error:", error);
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}