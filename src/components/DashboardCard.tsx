"use client";
type Product={
    price:number;
    stock:number;
}
export default function DashboardCard({products}:{products:Product[]}){
    const totalProducts=products.length;
    const totalStock=products.reduce((a,p)=>a+p.stock,0);
    const outofstock=products.filter(p=>p.stock===0).length;
    const avgPrice=totalProducts>0?(products.reduce((a,p)=>a+p.price,0)/totalProducts).toFixed(2):0;
    return(
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card title="Products" value={totalProducts}/>
            <Card title="Total Stock" value={totalStock}/>
            <Card title="Out of Stock" value={outofstock}/>
            <Card title="Avg Price" value={`Rs${avgPrice}`}/>
        </div>
    );

}
function Card({title,value}:{title:string;value:string|number}){
    return(<div className="bg-white shadow rounded p-4">
        <p className="text-gray-800 text-sm">{title}</p>
        <p className="text-xl font-bold text-amber-400">{value}</p>
    </div>);
}