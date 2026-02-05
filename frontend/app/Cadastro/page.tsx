"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";


export default function Cadastro() {

 const [email, setEmail] = useState("")
 const [senha, setSenha] = useState("")
 const router = useRouter()


  const cadastrar = async(e:any)=>{
  e.preventDefault()

  const res = await fetch("http://localhost:3000/usuarios",{
    method:'POST',
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({email,senha})
    
  })


if (res.ok) {
    alert("Usuario cadastrado com sucesso")
    router.push("/Login")
}else{
alert("Erro ao cadastrar")
}
    
}

  


    return (
    <main>
        <h1>Cadastro</h1>
        <form onSubmit={cadastrar}>
          <input 
          type="email" 
          placeholder="Digite seu email..."
          value={email}
          onChange={(e)=>{setEmail(e.target.value)}}
          />

           <input 
          type="password" 
          placeholder="Digite sua senha..."
          value={senha}
          onChange={(e)=>{setSenha(e.target.value)}}
          />

          <button className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 cursor-pointer">
            Cadastrar
          </button>
        </form>
    </main>
    )
}