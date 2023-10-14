import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { uploadImage } from "@/lib/uploader";
import { hash } from "bcrypt";

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
  const q_public_id = "question-" + code;
  answer.map(async (e, i) => {
    d_answer.push({
      answer: e.val.aForm.answer,
      a_image: await uploadImage(e.val.aForm.a_image, q_public_id + "-" + i),
      a_updatedAt: now,
    });
  });
  const q_img = await uploadImage(question.qForm.q_image, q_public_id);
  let hashPassword;
  let status;
  if (question.qForm.q_password != null) {
    hashPassword = await hash(question.qForm.q_password, 10);
    status = "1";
  } else {
    hashPassword = null;
    status = "2";
  }
  const storeQuestion = await db.question.create({
    data: {
      q_title: question.qForm.q_title,
      question: question.qForm.question,
      q_code: code,
      q_password: hashPassword,
      q_status: status,
      q_image: q_img,
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
