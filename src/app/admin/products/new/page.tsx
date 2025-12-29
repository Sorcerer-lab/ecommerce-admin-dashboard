"use client";

import{useState} from "react";
import{useRouter} from "next/navigation";
import {productSchema} from "@/src/lib/validations/product";
export default function NewProductPage(){
    const router=useRouter();
    const [step,setStep]=useState(1);
    const[formData,setFormData]=useState(
        {
            name:"",
            description:"",
            price:"",
            stock:"",
            category:"",
            imageurl:"",
        }
    );
    const nextStep=()=>setStep((s)=>s+1);
    const prevStep=()=>setStep((s)=>s-1);
    const handleChange=(
        e:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>
    )=>{
        const {name,value}=e.target;
        setFormData((prev)=>({
            ...prev,
            [name]:
            name==="price"||name==="stock"?Number(value):value
,
        }));
    };
    const handleSubmit=async()=>{
        const result=productSchema.safeParse(formData);
        if(!result.success){
            alert(result.error.issues[0].message);
            return;
        }
        await fetch("/api/products",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(formData),
        });
        router.push("admin/products");
    };
    return (
        <div className="p-8 max-w-xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Add Product</h1>
            {step===1&&(
                <>
                <input
                name="name"
                placeholder="Product Name"
                className="border p-2 w-full mb-3"
                value={formData.name}
                onChange={handleChange}
                    />
                    <textarea
                    name="description"
                    placeholder="Description"
                    className="border p-2 w-full mb-3"
                    value={formData.description}
                    onChange={handleChange}/>
                <button onClick={nextStep} className="btn-primary">Next</button>
                </>

            )}
            {step===2&&(
                <>
                <input
                 type="number"
                 name="price"
                 placeholder="Price"
                 className="border p-2 w-full mb-3"
                 value={formData.price}
                 onChange={handleChange}
                />
                <input
                type="number"
                name="stock"
                placeholder="Stock"
                className="border p-2 w-full mb-3"
                value={formData.stock}
                onChange={handleChange}
                />
                <div className="flex justify-between">
                <button onClick={prevStep}>Back</button>
                <button onClick={nextStep}>Next</button>
                </div>
                </>
            )}
            {step===3 && (
                <>
                <input
                name="category"
                placeholder="Category"
                className="border p-2 w-full mb-3"
                value={formData.category}
                onChange={handleChange}
                />
                <input
                name="imageurl"
                placeholder="Image URL"
                className="border p-2 w-full mb-3"
                value={formData.imageurl}
                onChange={handleChange}
                />
                <div className="flex justify-between">
                    <button onClick={prevStep}>Back</button>
                    <button onClick={handleSubmit} className="btn-primary">
                    Create Product</button>
                </div>
                </>
            )}
        </div>
    );
}