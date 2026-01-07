import { NextResponse } from "next/server";
import { connectDB } from "@/src/lib/mongodb";
import { Product } from "@/src/models/Product";
import { Types } from "mongoose";

type Params = {
  params: { id: string };
};

export async function GET(
  _: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  await connectDB();
  const product = await Product.findById(id).lean();

  if (!product) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({
    _id: product._id.toString(),
    name: product.name,
    price: product.price,
    stock: product.stock,
    imageUrl: product.imageUrl ?? "",
    description:product.description??"",
    category:product.category??"",
  });
}
export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  await connectDB();

  if (!Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  const body = await req.json();

  const updated = await Product.findByIdAndUpdate(id, body, {
    new: true,
  });

  return NextResponse.json({
    _id: updated._id.toString(),
    name: updated.name,
    price: updated.price,
    stock: updated.stock,
    imageUrl: updated.imageUrl ?? "",
  });
}
export async function DELETE(
  _: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  await connectDB();
  await Product.findByIdAndDelete(id);

  return NextResponse.json({ success: true });
}

