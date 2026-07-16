import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyCodeSchema } from "@/validators/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = verifyCodeSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const { email, code } = parsed.data;
    const user = await db.user.findUnique({ where: { email } });
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const record = await db.verificationCode.findFirst({
      where: {
        userId: user.id,
        code,
        used: false,
        expiresAt: { gt: new Date() },
      },
      orderBy: { createdAt: "desc" },
    });

    if (!record) {
      return NextResponse.json({ error: "Invalid or expired code" }, { status: 400 });
    }

    await db.$transaction([
      db.verificationCode.update({ where: { id: record.id }, data: { used: true } }),
      db.user.update({ where: { id: user.id }, data: { emailVerified: new Date() } }),
    ]);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}