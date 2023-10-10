import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export async function POST(request) {
  const body = await request.json();
  const session = await getServerSession(authOptions);
  const { question, answer } = body;
  //question insert
  let code = 0;
  let isCodeUnique = false;
  let checkUniqueCode = null;
  while (isCodeUnique == false) {
    code = (Math.floor(Math.random() * 90000) + 10000).toString();
    checkUniqueCode = await db.question.findUnique({
      where: { q_code: code },
    });
    if (checkUniqueCode == null) {
      isCodeUnique = true;
    }
  }
  let now = new Date();
  let q_endAt = null;
  if (question.qForm.q_endAt) {
    q_endAt = new Date(question.qForm.q_endAt);
  }
  //answer insert
  let d_answer = [];
  answer.map((e) => {
    d_answer.push({
      answer: e.val.aForm.answer,
      a_image: e.val.aForm.a_image,
      a_updatedAt: now,
    });
  });
  const storeQuestion = await db.question.create({
    data: {
      q_title: question.qForm.q_title,
      question: question.qForm.question,
      q_code: code,
      q_password: question.qForm.q_password,
      q_status: "1",
      q_image: question.qForm.q_image,
      authorId: session.user.id,
      q_endAt: q_endAt,
      q_updatedAt: now,
      Answer: {
        create: d_answer,
      },
    },
  });

  return NextResponse.json(
    {
      message: "api vote create",
      question: question.qForm,
      answer: d_answer,
      check: now,
    },
    { status: 201 }
  );
}
