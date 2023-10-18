import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { compare } from "bcrypt";
export async function POST(request) {
  const body = await request.json();
  const { password, code } = body;

  try {
    const question = await db.question.findUnique({
      where: {
        q_code: code,
      },
    });
    const passwordMatch = await compare(password, question.q_password);
    if (!passwordMatch) {
      return NextResponse.json(
        {
          message: "success",
          res: "unverify",
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          message: "success",
          res: "verify",
        },
        { status: 200 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        message: code,
      },
      { status: 500 }
    );
  }
}
