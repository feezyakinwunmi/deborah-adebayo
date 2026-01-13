import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { Redis } from "@upstash/redis";

const resend = new Resend(process.env.RESEND_API_KEY!);
const redis = Redis.fromEnv();  // Auto-uses Vercel KV env vars

export async function POST(req: NextRequest) {
  try {
    const { name, email } = await req.json();

    if (!name || !email) {
      return NextResponse.json({ error: "Missing name or email" }, { status: 400 });
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const fromEmail = "Deborah Adebayo <info@craftsandimpressions.com>";  // Change to verified domain later

    // Send Email 1 immediately
    await resend.emails.send({
      from: fromEmail,
      to: email,
      subject: "Here is your copy (and a warm welcome)",
      html: `
        <p>Hi ${name},</p>
        <p>Thank you for allowing me to be in your inbox. As promised, here is the link to download the first chapter of my book, Names I’ve Worn.</p>
        <p><a href="${baseUrl}/downloads/chapter-one.pdf">DOWNLOAD CHAPTER ONE</a></p>
        <p>Writing this book was not just a literary exercise; it was an act of excavation. I had to dig through layers of silence, migration, and memory to find the truth of who I am. I hope that as you read these pages, you see a reflection of your own strength.</p>
        <p>You are now part of my inner circle. Over the next few days, I’ll share a little more about the story behind the story.</p>
        <p>In grace,<br>Deborah Adebayo<br>Author & Founder, Anevisas Place</p>
      `,
    });

    // Queue Email 2 (2 days later)
    const email2Timestamp = Date.now() + 2 * 24 * 60 * 60 * 1000;  // +48 hours in ms
    await redis.zadd("email-queue", { score: email2Timestamp, member: JSON.stringify({ email, name, type: "email2" }) });

    // Queue Email 3 (4 days later from now)
    const email3Timestamp = Date.now() + 4 * 24 * 60 * 60 * 1000;  // +96 hours in ms
    await redis.zadd("email-queue", { score: email3Timestamp, member: JSON.stringify({ email, name, type: "email3" }) });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Subscribe error:", error);
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}