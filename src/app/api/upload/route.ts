import {NextResponse} from "next/server";
import cloudinary from "@/src/lib/cloudinary"
import {UploadApiResponse} from "cloudinary";
export async function POST(req:Request){
    const data=await req.formData();
    const file=data.get("file")as File;

    if(!file){
        return NextResponse.json({error:"No file uploaded"},{status:400});
    }
    const bytes=await file.arrayBuffer();
    const buffer=Buffer.from(bytes);
    const uploadResult= await new Promise<UploadApiResponse>((resolve,reject)=>{cloudinary.uploader
        .upload_stream({folder:"products"},(error,result)=>{
            if(error)reject(error);
            else resolve(result as UploadApiResponse);
        })
        .end(buffer);
    });
      return NextResponse.json({url: uploadResult.secure_url});
}