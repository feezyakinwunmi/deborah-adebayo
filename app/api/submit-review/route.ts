import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { review, recommendTo, name, anonymous, email } = body;

    if (!review) {
      return NextResponse.json({ error: "Review is required" }, { status: 400 });
    }

    const displayName = anonymous ? "Anonymous" : (name || "Anonymous");

    await resend.emails.send({
      from: "Deborah Adebayo <onboarding@resend.dev>", // Use Resend's free domain for now
      to: "info@craftsandimpressions.com",              // Client's email
      replyTo: email || "onboarding@resend.dev",
      subject: `New Book Review from ${displayName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
          <h2 style="color: #6b21a8;">New Review for Names I've Worn</h2>
          
          <p><strong>Name:</strong> ${displayName}</p>
          ${email ? `<p><strong>Email:</strong> ${email}</p>` : ""}
          
          <h3 style="margin-top: 20px;">Review:</h3>
          <p style="white-space: pre-wrap; line-height: 1.6;">${review}</p>
          
          <h3 style="margin-top: 20px;">Who would you recommend it to?</h3>
          <p style="white-space: pre-wrap;">${recommendTo || "Not specified"}</p>
          
          <p style="margin-top: 30px; font-size: 14px; color: #666;">
            Submitted via the website on ${new Date().toLocaleString()}
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Review submission error:", error);
    return NextResponse.json(
      { error: "Failed to send review", details: (error as Error).message },
      { status: 500 }
    );
  }
}