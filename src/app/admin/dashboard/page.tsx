
export const dynamic = "force-dynamic";
import DashboardCard from "@/src/components/DashboardCard";
import DashboardChartsClient from "@/src/components/DashboardCard"
import {headers} from "next/headers";

async function getProducts(){
    const headersList=headers();
    const host =(await headersList).get("host");
       const res=await fetch(`https://${host}/api/products`,{
        cache:"no-store",
    });
    if(!res.ok){
    throw new Error("Failed to fetch products");
}
    return res.json();
}

export default async function DashboardPage(){
    const products=await getProducts();
    return(
        <div className="p-6 space-y-6">
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <DashboardCard products={products}/>
            <DashboardChartsClient products={products}/>``
        </div>
    )
}