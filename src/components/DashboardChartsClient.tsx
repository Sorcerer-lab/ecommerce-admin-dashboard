"use client";
type Product={
    _id:string;
    name:string;
    price:number;
    stock:number;
    image?:string;
}
import dynamic from "next/dynamic";
const ProductCharts=dynamic(
    ()=>import("./ProductCharts"),
    {ssr:false}
);
export default function DashboardChartsClient({products}:{products:Product[]}){
    return<ProductCharts products={products}/>;
}