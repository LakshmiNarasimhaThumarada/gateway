import { NextRequest, NextResponse } from "next/server";
import { adminLoginSchema } from "@/lib/validation";
import { dbStore } from "@/lib/store";
import { signAdminToken, setAdminSessionCookie } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const parseResult = adminLoginSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password format" },
        { status: 400 }
      );
    }

    const { email, password } = parseResult.data;

    const isValid = await dbStore.verifyAdminCredentials(email, password);
    if (!isValid) {
      return NextResponse.json(
        { success: false, message: "Invalid admin email or password" },
        { status: 401 }
      );
    }

    const token = signAdminToken({
      adminId: "admin_1",
      email,
      role: "ADMIN",
    });

    await setAdminSessionCookie(token);

    return NextResponse.json({
      success: true,
      message: "Admin authentication successful",
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json(
      { success: false, message: msg },
      { status: 500 }
    );
  }
}
