import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const randomDelay = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;

  await new Promise((resolve) => setTimeout(resolve, randomDelay));

  //   throw new Error("에러 발생!");

  return NextResponse.json({ response: "완료!" });
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  const { name, description } = body;
  console.log("name", name);
  console.log("description", description);

  return NextResponse.json({ response: "완료" });
}
