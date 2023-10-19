import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const questions = await db.question.findMany({
      where: {
        NOT: {
          q_status: "0",
        },
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
