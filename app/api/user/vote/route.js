import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    const userId = session.user.id;
    const questions = await db.question.findMany({
      where: {
        authorId: userId,
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
