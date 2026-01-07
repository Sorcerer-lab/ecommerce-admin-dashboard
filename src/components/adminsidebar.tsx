"use client";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {useRouter} from "next/navigation";

const links=[
    {name:"Products",href:"/admin/dashboard"},
    {name:"Analytics",href:"/admin/analytics"},
    {name:"Add product",href:"/admin/products/new"}
]
export default function AdminSidebar(){
    const pathname=usePathname();
    const router=useRouter();
    async function handleLogout() {
    await fetch("/api/logout", { method: "POST" });
    router.push("/");
  }
    return (
        <aside className="w-64 bg-black min-h-screen p-6">
            <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
            <nav className="space-y-3">
                {links.map((link)=>(<Link 
                key={link.href}
                href={link.href}
            className={`block px-4 py-2 rounded-lg transition${pathname===link.href?
                "text-yellow-500":
                "hover:bg-gray-800"}`}>
                {link.name}
                </Link>
            ))}
            </nav>
             <button
        onClick={handleLogout}
        className="w-full bg-red-600 hover:bg-red-700 p-2 rounded"
      >
        Logout
      </button>
        </aside>
    );
}