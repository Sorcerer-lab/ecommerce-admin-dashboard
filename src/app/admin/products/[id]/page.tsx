import ProductForm from "@/src/components/ProductForm";
import { Product } from "@/src/types/product";
import { headers } from "next/headers";

async function getProduct(id: string): Promise<Product> {
  const headersList = await headers();
  const host = headersList.get("host");

  if (!host) {
    throw new Error("Unable to determine host");
  }

  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";

  const res = await fetch(
    `${protocol}://${host}/api/products/${id}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }

  return res.json();
}

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product = await getProduct(id);

  return (<ProductForm initialData={product} />);
}
