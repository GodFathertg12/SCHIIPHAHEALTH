import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { code }: any = await request.json();
    console.log("Referral used:", code);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error updating referral:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
