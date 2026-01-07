"use client"
import {useState} from "react";
import {useRouter} from "next/navigation";
export default function LoginPage(){
    const router=useRouter();
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState("");
    async function handleLogin(){
        setLoading(true);
        setError("");

        const res=await fetch("/api/login",{
            method:"POST",
            headers:{"Content-Type":"appliacation/json"},
            body:JSON.stringify({email,password}),
        });
        if(!res.ok){
            setError("Invalid credentials");
            setLoading(false);
            return;
        }
        router.push("/admin/dashboard");
    }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-700">
    <div className="bg-black p-8 rounded shadow w-96 space-y-4">
    <h1 className="text-2xl font-bold text-center">Admin Login</h1>

        <input
          className="w-full border p-2 rounded"
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          className="w-full border p-2 rounded"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        {error&&<p className="text-red-500 text-sm">{error}</p>}

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded disabled:opacity-50"
        >
        {loading?"Logging in...":"Login"}
        </button>
        </div>
        </div>
);}