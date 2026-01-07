"use client";
import { useRouter } from "next/navigation";
import { Product } from "@/src/types/product";

export default function ProductRow({ product }: { product: Product }) {
  const router = useRouter();

  async function deleteProduct() {
    if (!confirm("Delete this product?")) return;

    await fetch(`/api/products/${product._id}`, {
      method: "DELETE",
    });

    router.refresh();
  }

  return (
    <div className="flex gap-3">
      <button onClick={() => router.push(`/admin/products/${product._id}`)}>
        Edit
      </button>

      <button onClick={deleteProduct} className="text-red-600">
        Delete
      </button>
    </div>
  );
}
