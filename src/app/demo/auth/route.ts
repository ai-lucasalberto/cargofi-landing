import { NextRequest, NextResponse } from "next/server";

const DEMO_PASSWORD = process.env.DEMO_PASSWORD || "Lucas.2026";
const COOKIE_NAME = "cargofi_demo_auth";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { password, from } = body;

  if (password === DEMO_PASSWORD) {
    const response = NextResponse.json({ ok: true });
    response.cookies.set(COOKIE_NAME, DEMO_PASSWORD, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });
    return response;
  }

  return NextResponse.json({ ok: false, error: "Contraseña incorrecta" }, { status: 401 });
}
