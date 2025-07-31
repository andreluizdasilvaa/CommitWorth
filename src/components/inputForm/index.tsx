"use client"

import React from "react"
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader } from 'lucide-react'

export function InputForm() {
    const router = useRouter()
    const [loading, setLoading] = React.useState(false)
    const [input, setInput] = React.useState("")

    async function setNameUser(e: React.FormEvent) {
        e.preventDefault()

        if(!input.trim()) {
            toast.warning("Preencha o campo com seu @nickname do github")
            return;
        }
        setLoading(true)
        router.replace(`/dashboard/?user=${input}`)
    }

    return (
        <form
            className="flex items-center justify-between p-2 rounded-full bg-primarybege w-full max-w-md"
            onSubmit={setNameUser}
        >
            <input 
                type="text" 
                className="w-full max-w-70 pl-2 text-black outline-none"
                placeholder="Digite seu nickname do github"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <button
                className="flex items-center px-3 py-2 rounded-full bg-secondarypurple text-white gap-1 font-medium whitespace-nowrap disabled:cursor-not-allowed"
                type="submit"
                disabled={loading}
            >
                {loading && (
                    <Loader size={24} color="#fff" className="animate-spin" />
                )}
                {!loading && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#fff" d="M5 2h4v2H7v2H5zm0 10H3V6h2zm2 2H5v-2h2zm2 2v-2H7v2H3v-2H1v2h2v2h4v4h2v-4h2v-2zm0 0v2H7v-2zm6-12v2H9V4zm4 2h-2V4h-2V2h4zm0 6V6h2v6zm-2 2v-2h2v2zm-2 2v-2h2v2zm0 2h-2v-2h2zm0 0h2v4h-2z"/></svg>
                )}
                Saber agora
            </button>
        </form>
    )
}