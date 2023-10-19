import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
export async function uploadImage(img, title) {
  try {
    if(img==null){
      return null
    }
    return await new Promise((resolve, reject) => {
      cloudinary.v2.uploader.upload(
        img,
        { public_id: title },
        function (error, result) {
          if (error) {
            reject(error);
          } else {
            resolve(result.secure_url);
          }
        }
      );
    });

  } catch(error){
    return NextResponse.json({ success: false, body: error });
  }
}
