import { connectDB } from "@/src/lib/db";
import Product from "@/src/models/Product"
export default async function DashboardPage(){
await connectDB();

const products =await Product.find().lean();

return (
    <main className= "p-8">
        <h1 className="text-2xl font-bold mb-6">
        Admin Dashboard
        </h1>

        {products.length===0 ?(
            <p className="text-gray-600">
            No products found.
            </p>
        ):(
            <ul className="space-y-2">
                {products.map((product)=>(
                    <li
                    key={product._id}
                    className="border p-4 rounded"
                    >
                        <p><strong>Name:</strong>{product.name}</p>
                        <p><strong>Price:</strong>Rs.{product.price}</p>
                        <p><strong>Stock:</strong>{product.stock}</p>
                    </li>
                ))}
            </ul>
        )}
    </main>
);
}