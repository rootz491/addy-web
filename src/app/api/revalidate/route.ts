import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const secret = req.nextUrl.searchParams.get("secret");
    if (secret !== process.env.SANITY_WEBHOOK_SECRET) {
      return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
    }

    const body = await req.json();
    console.log("🔔 Sanity webhook received:", JSON.stringify(body, null, 2));

    const pathsToRevalidate: string[] = ["/"];

    await Promise.all(
      pathsToRevalidate.map(async (path) => {
        try {
          await fetch(
            `${process.env.NEXT_PUBLIC_SITE_URL}/api/revalidate-path?path=${path}&secret=${process.env.SANITY_WEBHOOK_SECRET}`,
            { method: "POST" }
          );
        } catch (err) {
          console.error(`Error revalidating ${path}:`, err);
        }
      })
    );

    return NextResponse.json({ revalidated: true, paths: pathsToRevalidate });
  } catch (err: unknown) {
    console.error("❌ Revalidation error:", err);
    return NextResponse.json(
      {
        message: "Error revalidating",
        error: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
