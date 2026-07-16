import { NextResponse } from "next/server";
import crypto from "crypto";
import { auth } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const timestamp = Math.round(Date.now() / 1000);
    const folder = body?.folder || "virtual-lab-assets";

    const raw = `folder=${folder}&timestamp=${timestamp}${process.env.CLOUDINARY_API_SECRET}`;
    const signature = crypto.createHash("sha1").update(raw).digest("hex");

    return NextResponse.json({
      timestamp,
      signature,
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
      apiKey: process.env.CLOUDINARY_API_KEY,
      folder,
    });
  } catch {
    return NextResponse.json({ error: "Failed to create signature" }, { status: 500 });
  }
}