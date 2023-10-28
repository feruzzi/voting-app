import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export async function GET(request, params) {
  const searchParams = request.nextUrl.searchParams;
  const search = searchParams.get("search");
  const filter = searchParams.get("filter");
  try {
    const session = await getServerSession(authOptions);
    const userId = session.user.id;
    const questions = await db.question.findMany({
      where: {
        authorId: userId,
        OR: [
          { q_code: { contains: search, mode: "insensitive" } },
          { q_title: { contains: search, mode: "insensitive" } },
        ],
        NOT: {
          q_status: filter,
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
