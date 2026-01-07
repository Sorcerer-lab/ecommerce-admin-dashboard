"use client";
import {Product} from "@/src/types/product"
import{useState} from "react";
import{useRouter} from "next/navigation";
import {productSchema} from "@/src/lib/validations/product";
type ProductFormProps={
  initialData?:Product|null;
};
export default function NewProductPage({initialData}:ProductFormProps){

    const router=useRouter();
    const [step,setStep]=useState(1);
    const[formData,setFormData]=useState(
        {
            name: initialData?.name ?? "",
            price: initialData?.price ?? 0,
            stock: initialData?.stock ?? 0,
            imageUrl: initialData?.imageUrl ?? "",
            description:initialData?.description??"",
            category:initialData?.category??"",
        }
    );
    const[imageFile,setImageFile]=useState<File|null>(null);
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
    const [loading, setLoading] = useState(false);

const handleSubmit=async () => {
  if(loading) return; 
  setLoading(true);


  const result=productSchema.safeParse(formData);
  if (!result.success) {
    alert(result.error.issues[0].message);
    setLoading(false);
    return;
  }

  try{
    let imageUrl="";

    if (imageFile){
      const formDataImage=new FormData();
      formDataImage.append("file",imageFile);

      const uploadRes=await fetch("/api/upload", {
        method:"POST",
        body:formDataImage,
      });

      const uploadData=await uploadRes.json();
      imageUrl=uploadData.url;
    }

    const payload={ ...formData, imageUrl };
    const method = initialData ? "PATCH" : "POST";
    const url = initialData
      ? `/api/products/${initialData._id}`
      : "/api/products";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    router.push("/admin/products");
  } catch (err){
    alert("Something went wrong");
    setLoading(false);
  }
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
                type="file"
                accept="image/*"
                name="image"
                placeholder="Image"
                className="border p-2 w-full mb-3"
                onChange={(e)=>setImageFile(e.target.files?.[0]||null)}
                />
                <div className="flex justify-between">
                    <button onClick={prevStep}>Back</button>
                    <button
                 onClick={handleSubmit}
                 disabled={loading}
                 className={`btn-primary ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
>
  {loading
    ? initialData
      ? "Updating..."
      : "Creating..."
    : initialData
    ? "Update Product"
    : "Add Product"}
                  </button>


                </div>
                </>
            )}
        </div>
    );
}