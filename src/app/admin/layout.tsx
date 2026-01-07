import AdminSidebar from "@/src/components/adminsidebar";
export default function AdminLayout({children,}:{children :React.ReactNode;})
{
    return(
    <div className="flex">
      <AdminSidebar/>
      <main className="flex-1 p-6 bg-gray-700">
        {children}
      </main>
    </div>
  );
 }
