export const dynamic = "force-dynamic";
import Image from "next/image";
import { connectDB } from "@/src/lib/db";
import { Product } from "@/src/models/Product";
import ProductRow from "@/src/components/ProductRow";

export default async function DashboardPage() {
  await connectDB();

  const rawProducts = await Product.find().lean();

  const products = rawProducts.map((p) => ({
    _id: p._id.toString(),
    name: p.name,
    price: p.price,
    stock: p.stock,
    imageUrl: p.imageUrl ?? "",
    description:p.description??"",
  }));

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <ul className="space-y-4">
          {products.map((product) => (
            <li key={product._id} className="border p-4 rounded">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={60}
            height={60}
            className="rounded object-cover"
          />
        ) : (
          <div className="w-[60px] h-[60px] bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">
            No Image
          </div>
        )}

              <p><strong>Name:</strong> {product.name}</p>
              <p><strong>Price:</strong> Rs. {product.price}</p>
              <p><strong>Stock:</strong> {product.stock}</p>

              <ProductRow product={product} />
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
