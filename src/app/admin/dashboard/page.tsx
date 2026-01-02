import DashboardCard from "@/src/components/DashboardCard";
import ProductCharts from "@/src/components/ProductCharts";
async function getProducts(){
    const res=await fetch("http:/localhost:3000/api/products",{
        cache:"no-store",
    });
    return res.json();
}
export default async function DashboardPage(){
    const products=await getProducts();
    return(
        <div className="p-6 space-y-6">
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <DashboardCard products={products}/>
            <ProductCharts products={products}/>``
        </div>
    )
}