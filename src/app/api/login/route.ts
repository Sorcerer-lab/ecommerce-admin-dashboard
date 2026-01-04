import {NextResponse} from "next/server";

export async function POST(req:Request) {
  const {email,password}=await req.json();

  if(
    email===process.env.ADMIN_EMAIL &&
    password===process.env.ADMIN_PASSWORD
  ) {
    const res=NextResponse.json({ success:true });
    res.cookies.set("admin-auth","true",{
      httpOnly:true,
      secure:true,
      sameSite:"strict",
      path:"/",
    });
    return res;
  }
     return NextResponse.json({ error:"Unauthorized" },{ status:401});
}
