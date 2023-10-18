import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request, params) {
  const code = params.params.code;
  try {
    const questions = await db.question.findUnique({
      where: {
        q_code: code,
      },
      include: {
        Answer: true,
      },
    });
    return NextResponse.json(
      {
        message: "success",
        res: questions,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: code,
      },
      { status: 500 }
    );
  }
}
