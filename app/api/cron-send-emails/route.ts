import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { Redis } from "@upstash/redis";

const resend = new Resend(process.env.RESEND_API_KEY!);
const redis = Redis.fromEnv();

export async function GET(req: NextRequest) {
  // Optional: Secure with Vercel Cron secret or IP check
  const auth = req.headers.get("authorization");
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {  // Add CRON_SECRET to env
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const now = Date.now();
const queuedEmailsWithScores = await redis.zrange(
  "email-queue",
  0,
  now,
  { byScore: true, withScores: true }
);
// Returns: [member1, score1, member2, score2, ...] (flat array)
    for (const item of queuedEmailsWithScores) {
      const { email, name, type } = JSON.parse(item as string);
      let subject = "";
      let html = "";
      const fromEmail = "Deborah Adebayo <info@craftsandimpressions.com>";

      if (type === "email2") {
        subject = "They tried to rename us...";
        html = `
          <p>Hi ${name},</p>
          <p>There is a specific kind of exhaustion that comes from wearing a mask.</p>
          <p>For years, I navigated spaces—corporate boardrooms, new countries, and community expectations—trying to fit the "name" that was given to me. I was the "Strong One." The "Migrant." The "Worker."</p>
          <p>But in the quiet moments, I asked myself: Who am I when the world isn't watching?</p>
          <p>In Names I've Worn, I talk about the "sacred labor of healing." I realized that healing wasn't going to happen to me; I had to participate in it. I had to be willing to look at the pain of the past—from Ibadan to Vancouver—and decide what to keep and what to release.</p>
          <p>If you are currently holding onto a name that no longer fits you, I want you to know: You have permission to put it down.</p>
          <p><a href="https://craftsandimpressions.com/pages/books">Order the Full Copy of Names I've Worn</a></p>
          <p>Talk soon,<br>Deborah</p>
        `;
      } else if (type === "email3") {
        subject = "Beauty you can hold";
        html = `
          <p>Hi ${name},</p>
          <p>I believe that the stories we tell should be reflected in the spaces we inhabit.</p>
          <p>While my writing focuses on the internal work of the soul, my store, Crafts & Impressions, focuses on the external beauty of our lives.</p>
          <p>Whether it is the books we read or the items we bring into our homes, everything carries a vibration. Through Anevisas Place, I curate items that remind us of our heritage, our faith, and our joy.</p>
          <p>I’d love for you to take a look. If you enjoyed the themes in Names I've Worn, I think you’ll find something special here.</p>
          <p><a href="https://craftsandimpressions.com">Visit the Shop</a></p>
          <p>Stay resilient,<br>Deborah Adebayo</p>
        `;
      }

      await resend.emails.send({
        from: fromEmail,
        to: email,
        subject,
        html,
      });

      // Remove sent item (use a unique key if needed)
      await redis.zrem("email-queue", item);
    }

    return NextResponse.json({ success: true, sent: queuedEmailsWithScores.length });
  } catch (error) {
    console.error("Cron error:", error);
    return NextResponse.json({ error: "Failed to send emails" }, { status: 500 });
  }
}