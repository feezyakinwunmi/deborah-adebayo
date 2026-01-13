import { NextResponse } from "next/server";
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

export async function GET() {
  try {
    const data = await fs.readFile(subscribersFile, "utf-8");
    let subscribers = JSON.parse(data);

    const now = Date.now();
    let sentCount = 0;

    for (let i = 0; i < subscribers.length; i++) {
      const sub = subscribers[i];

      // Email 2: "They tried to rename us..." (2 days after subscription)
      if (!sub.email2Sent && now >= sub.email2Date) {
        await transporter.sendMail({
          from: `"Deborah Adebayo" <${process.env.EMAIL_USER}>`,
          to: sub.email,
          subject: "They tried to rename us...",
          html: `
            <div style="font-family: Inter, Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333333; line-height: 1.6; font-size: 16px;">
              <h2 style="color: #6b21a8; text-align: center; margin: 30px 0;">Hi ${sub.name},</h2>
              
              <p>There is a specific kind of exhaustion that comes from wearing a mask.</p>
              
              <p>For years, I navigated spaces—corporate boardrooms, new countries, and community expectations—trying to fit the "name" that was given to me. I was the "Strong One." The "Migrant." The "Worker."</p>
              
              <p>But in the quiet moments, I asked myself: Who am I when the world isn't watching?</p>
              
              <p>In <em>Names I've Worn</em>, I talk about the "sacred labor of healing." I realized that healing wasn't going to happen to me; I had to participate in it. I had to be willing to look at the pain of the past—from Ibadan to Vancouver—and decide what to keep and what to release.</p>
              
              <p>If you are currently holding onto a name that no longer fits you, I want you to know: <strong>You have permission to put it down.</strong></p>
              
              <p style="text-align: center; margin: 40px 0;">
                <a href="https://craftsandimpressions.com/pages/books" 
                   style="background-color: #9333ea; color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 18px; display: inline-block;">
                  Order the Full Copy of Names I've Worn
                </a>
              </p>
              
              <p>Talk soon,<br><strong>Deborah</strong></p>
              
              <p style="font-size: 14px; color: #666; margin-top: 40px; text-align: center;">
                You're receiving this because you subscribed on the Deborah Adebayo website.
              </p>
            </div>
          `,
        });
        sub.email2Sent = true;
        sentCount++;
      }

      // Email 3: "Beauty you can hold" (6 days total after subscription)
      if (!sub.email3Sent && now >= sub.email3Date) {
        await transporter.sendMail({
          from: `"Deborah Adebayo" <${process.env.EMAIL_USER}>`,
          to: sub.email,
          subject: "Beauty you can hold",
          html: `
            <div style="font-family: Inter, Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333333; line-height: 1.6; font-size: 16px;">
              <h2 style="color: #6b21a8; text-align: center; margin: 30px 0;">Hi ${sub.name},</h2>
              
              <p>I believe that the stories we tell should be reflected in the spaces we inhabit.</p>
              
              <p>While my writing focuses on the internal work of the soul, my store, Crafts & Impressions, focuses on the external beauty of our lives.</p>
              
              <p>Whether it is the books we read or the items we bring into our homes, everything carries a vibration. Through Anevisas Place, I curate pieces that speak to heritage, faith, and joy. They are simple reminders of where we come from and what grounds us.</p>
              
              <p>If the themes in Names I've Worn resonated with you, I think you may find something here that feels familiar in a good way.</p>
              
              <p style="text-align: center; margin: 40px 0;">
                <a href="https://craftsandimpressions.com" 
                   style="background-color: #9333ea; color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 18px; display: inline-block;">
                  Explore the Collection
                </a>
              </p>
              
              <p>Stay resilient,<br><strong>Deborah Adebayo</strong></p>
              
              <p style="font-size: 14px; color: #666; margin-top: 40px; text-align: center;">
                You're receiving this because you subscribed on the Deborah Adebayo website.
              </p>
            </div>
          `,
        });
        sub.email3Sent = true;
        sentCount++;
      }
    }

    await fs.writeFile(subscribersFile, JSON.stringify(subscribers, null, 2));

    return NextResponse.json({ success: true, sent: sentCount });
  } catch (error) {
    console.error("Cron error:", error);
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}