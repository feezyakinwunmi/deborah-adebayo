import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import fs from "fs/promises";
import path from "path";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const subscribersFile = path.join(process.cwd(), "data", "subscribers.json");



export async function POST(req: NextRequest) {
  console.log("=== SUBSCRIBE ROUTE CALLED ===");
  console.log("Method:", req.method);
  console.log("Headers:", Object.fromEntries(req.headers));

  try {
    let body;
    try {
      body = await req.json();
      console.log("Parsed body:", body);
    } catch (jsonErr) {
      console.error("JSON parse failed:", jsonErr);
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const { name, email } = body;
console.log("Preparing sendMail - to value:", email); 

if (!email || typeof email !== "string" || !email.includes("@")) {
  console.log("Invalid to address - aborting");
  return NextResponse.json({ error: "Invalid recipient email" }, { status: 400 });
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";


await transporter.sendMail({
  from: `"Deborah Adebayo" <${process.env.EMAIL_USER}>`,
  to: email.trim(), // ← trim any whitespace + explicit guard
  subject: "Here is your copy (and a warm welcome)",
  html: `
    <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
      <h2 style="color: #6b21a8;">Hi ${name},</h2>
      <p>Thank you for allowing me to be in your inbox. As promised, here is the link to download the first chapter of my book, <strong>Names I've Worn</strong>.</p>
      <p style="text-align: center; margin: 30px 0;">
        <a href="${baseUrl}/downloads/chapter-one.pdf" 
           style="background: #9333ea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold;">
          Download Chapter One
        </a>
      </p>
      <p>Writing this book was not just a literary exercise; it was an act of excavation. I had to dig through layers of silence, migration, and memory to find the truth of who I am. I hope that as you read these pages, you see a reflection of your own strength.</p>
      <p>You are now part of my inner circle. Over the next few days, I’ll share a little more about the story behind the story.</p>
      <p style="margin-top: 30px;">In grace,<br><strong>Deborah Adebayo</strong><br>Author & Founder, Anevisas Place</p>
    </div>
  `,
});
    // If using Nodemailer (your current code)
  
    console.log("Email 1 sent successfully");

    // ... your subscriber saving code ...
       let subscribers = [];
    try {
      const data = await fs.readFile(subscribersFile, "utf-8");
      subscribers = JSON.parse(data);
    } catch (err) {
      // File doesn't exist or is empty → create it
      console.log("subscribers.json not found → creating new file");
      await fs.mkdir(path.dirname(subscribersFile), { recursive: true });
      await fs.writeFile(subscribersFile, JSON.stringify([], null, 2));
    }

    const now = Date.now();
    subscribers.push({
      name,
      email,
      email2Sent: false,
      email2Date: now + 2 * 24 * 60 * 60 * 1000, // +2 days
      email3Sent: false,
      email3Date: now + 6 * 24 * 60 * 60 * 1000, // +4 more days (total 6 from now)
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Subscribe route crashed:", error);
    return NextResponse.json(
      { error: "Server error", details: (error as Error).message },
      { status: 500 }
    );
  }
}