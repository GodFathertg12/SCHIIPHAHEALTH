import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  try {
    const { code } = await request.json();
    console.log("Referral used:", code);
    // 🔹 Later, connect this to your DB
    // Example: await prisma.referral.update({ where: { code }, data: { uses: { increment: 1 } } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating referral:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
