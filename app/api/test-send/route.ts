// import { NextResponse } from "next/server";
// import nodemailer from "nodemailer";

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// export async function GET() {
//   console.log("Test send started - creds:", {
//     user: process.env.EMAIL_USER,
//     passExists: !!process.env.EMAIL_PASS,
//   });

//   try {
//     await transporter.sendMail({
//       from: process.env.EMAIL_USER,
//       to: "info@craftsandimpressions.com", // use your own email for test
//       subject: "Test Send - 2026",
//       text: "If you see this email, Nodemailer + Gmail is working!",
//     });
//     return NextResponse.json({ success: true, message: "Test email sent!" });
//   } catch (error) {
//     console.error("Test send failed:", error);
//     return NextResponse.json({ error: (error as Error).message }, { status: 500 });
//   }
// }