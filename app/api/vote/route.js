import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    const body = await request.json();
    const { q_id, answer } = body;
    const now = new Date();
    const storeRespond = await db.responds.create({
      data: {
        q_id: parseInt(q_id),
        a_id: parseInt(answer),
        authorId: session.user.id,
        voteAt: now,
      },
    });
    return NextResponse.json(
      {
        message: "success",
        res: answer,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: error,
      },
      { status: 500 }
    );
  }
}
