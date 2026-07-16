import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { signupSchema } from "@/validators/auth";
import bcrypt from "bcryptjs";
import { resend } from "@/lib/resend";
import { checkRateLimit } from "@/lib/ratelimit";

function generateCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(req: Request) {
  try {
    const ip = (req.headers.get("x-forwarded-for") || "unknown").split(",")[0].trim();
    const limit = await checkRateLimit(`signup:${ip}`);
    if (!limit.success) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    const body = await req.json();
    const parsed = signupSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const { name, email, password } = parsed.data;

    const existing = await db.user.findUnique({ where: { email } });
    if (existing && existing.emailVerified) {
      return NextResponse.json({ error: "Email already in use" }, { status: 409 });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const user = existing
      ? await db.user.update({
          where: { email },
          data: { name, passwordHash },
        })
      : await db.user.create({
          data: { name, email, passwordHash },
        });

    const code = generateCode();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await db.verificationCode.create({
      data: { userId: user.id, code, expiresAt },
    });

    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: email,
      subject: "Verify your account",
      html: `<p>Your verification code is: <strong>${code}</strong></p>`,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}