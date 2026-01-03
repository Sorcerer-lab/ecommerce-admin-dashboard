import AdminSidebar from "@/src/components/adminsidebar";
export default function AdminLayout({children,}:{children :React.ReactNode;})
{
    return(
    <div className="flex">
      <AdminSidebar/>
      <main className="flex-1 bg-neutral-900 text-white min-h-screen">
        {children}
      </main>
    </div>
  );
 }
