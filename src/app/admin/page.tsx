import { connectDB } from "@/src/lib/db";
export default async function Home() {
   await connectDB();
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">
       Database connected successfully
      </h1>
    </main>
  );
}
