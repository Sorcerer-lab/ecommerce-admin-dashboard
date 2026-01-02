export const dynamic = "force-dynamic";
import {Product} from "@/src/models/Product"
import {connectDB} from "@/src/lib/mongodb"
export default async function ProductsPage(){
    await connectDB();
    const products = await Product.find().sort({createdAt:-1});
    return (
        <div className="p-8">
         <h1 className="text-2xl font-bold mb-6">Products</h1>
         {products.length===0?(
            <p>NO PRODUCTS FOUND</p>
         ):(
            <table className="w-full border">
                <thead>
                    <tr className="border-b">
                        <th className="p-2 text-left">Name</th>
                        <th className="p-2">Price</th>
                        <th className="p-2">Stock</th>
                        <th className="p-2">Category</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product)=>(
                        <tr key={product._id.toString()} className="border-b">
                            <td className="p-2">{product.name}</td>
                            <td className="p-2 text-center">Rs.{product.price}</td>
                            <td className="p-2 text-center">{product.stock}</td>
                            <td className="p-2 text-center">{product.category}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
         )}
        </div>
    );
}
    
