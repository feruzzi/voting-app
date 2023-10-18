import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const questions = await db.question.findMany({
      where: {
        q_status: "1",
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
        message: "failed",
      },
      { status: 500 }
    );
  }
}
