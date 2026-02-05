import Image from "next/image";

export default function Home() {
  return (
    <main className="p-10">
    <h1 className="text-3x1 font-bold">Blog</h1>
    <div className="mt-6 space-x-4">
     <a href="/Cadastro" className="text-blue-600 underline">Cadastro</a>
     <a href="/Login" className="text-blue-600 underline">Login</a>
     <a href="/Posts" className="text-blue-600 underline">Posts</a>
    </div>
    </main>
  );
}
