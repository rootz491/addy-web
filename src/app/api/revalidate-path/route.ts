import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");
  const path = req.nextUrl.searchParams.get("path");

  if (secret !== process.env.SANITY_WEBHOOK_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  if (!path) {
    return NextResponse.json({ message: "Missing path" }, { status: 400 });
  }

  try {
    revalidatePath(path);
    console.log(`✅ Revalidated: ${path}`);
    return NextResponse.json({ revalidated: true, path });
  } catch (err: unknown) {
    console.error("Error revalidating path:", err);
    return NextResponse.json(
      {
        message: "Error revalidating",
        error: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
