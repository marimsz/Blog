"use client"
import { useEffect, useState } from "react"

type Post = {
  id: number
  titulo: string
  conteudo: string
  createdAt: string
}

export default function Posts() {
  const [posts, setPosts] = useState<Post[]>([])
  const [titulo, setTitulo] = useState("")
  const [conteudo, setConteudo] = useState("")
  const [logado, setLogado] = useState(false)

  // verifica se tem token
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) setLogado(true)

    buscarPosts()
  }, [])

  // buscar posts do backend
  const buscarPosts = async () => {
    const res = await fetch("http://localhost:3000/posts")
    const data = await res.json()
    setPosts(data)
  }

  // criar novo post
  const criarPost = async (e: React.FormEvent) => {
    e.preventDefault()

    const token = localStorage.getItem("token")

    const res = await fetch("http://localhost:3000/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ titulo, conteudo })
    })

    if (res.ok) {
      setTitulo("")
      setConteudo("")
      buscarPosts()
    } else {
      alert("Erro ao criar post")
    }
  }

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold mb-6">Posts do Blog</h1>

      {/* FORMULÁRIO — só aparece se estiver logado */}
      {logado && (
        <form onSubmit={criarPost} className="flex flex-col gap-3 max-w-md mb-8">
          <input
            type="text"
            placeholder="Título"
            className="border p-2"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />

          <textarea
            placeholder="Conteúdo"
            className="border p-2"
            value={conteudo}
            onChange={(e) => setConteudo(e.target.value)}
          />

          <button className="bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-700 transition duration-200 font-semibold shadow cursor-pointer">
            Criar Post
          </button>
        </form>
      )}

      {/* LISTA DE POSTS */}
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="border p-4 rounded shadow">
            <h2 className="text-xl font-bold">{post.titulo}</h2>
            <p className="text-gray-700">{post.conteudo}</p>
            <span className="text-sm text-gray-500">
              {new Date(post.createdAt).toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </main>
  )
}