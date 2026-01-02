"use client";

import{
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
} from "recharts";
type Product={
    _id:string;
    name:string;
    price:number;
    stock:number;
    image?:string;
}
export default function ProductCharts({products}:{products:Product[]}){
    const stockData=products.map((p)=>({
        name:p.name,
        stock:p.stock,
    }));
    const pieData=[{
        name:"In Stock",
        value:products.filter((p)=>p.stock>0).length,
    },
   { name:"Out of Stock",
    value:products.filter((p)=>p.stock===0).length,
   },
];
    const COLORS=["#16a34a","#dc2626"];
    return (
        <div className="grid md:grid-cols-2 gap-6">
            {/*bar chart*/}
            <div className="bg-black p-4 shadow rounded">
                <h2 className="font-semibold mb-2">Stock per Product</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={stockData}>
                        <XAxis dataKey="name" hide/>
                        <YAxis/>
                        <Tooltip/>
                        <Bar dataKey="stock" fill="#2563eb"/>
                    </BarChart>
                </ResponsiveContainer>
            </div>
            {/*PieChart*/}
            <div className="bg-black p-4 shadow ronded">
                <h2 className="font-semibold mb-2">Stock Status</h2>
                <ResponsiveContainer width="100%"  height={300}>
                    <PieChart>
                        <Pie data={pieData} dataKey="value" label>
                            {pieData.map((_,index)=>(<Cell key={index} fill={COLORS[index]}/>))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}