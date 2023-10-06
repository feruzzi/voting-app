import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { hash } from "bcrypt";

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, name, password, status } = body;
    const hashPassword = await hash(password, 10);
    //cek email exist
    const checkExistEmail = await db.user.findUnique({
      where: { email: email },
    });
    if (checkExistEmail) {
      return NextResponse.json(
        { message: "email Already Exist", user: null },
        { status: 409 }
      );
    }
    const storeUser = await db.user.create({
      data: {
        email,
        name,
        password: hashPassword,
        status,
      },
    });
    return NextResponse.json(
      { message: "User Created", user: storeUser },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ success: false, body: error });
  }
}
