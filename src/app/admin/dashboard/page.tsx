export const dynamic = "force-dynamic";
import DashboardCard from "@/src/components/DashboardCard";
import dynamicImport from "next/dynamic";
const ProductCharts=dynamicImport(
    ()=>import("@/src/components/ProductCharts"),
    {ssr:false}
);

async function getProducts(){
    const baseUrl=process.env.NEXT_PUBLIC_BASE_URL||"http://localhost:3000";
    const res=await fetch(`${baseUrl}/api/products`,{
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