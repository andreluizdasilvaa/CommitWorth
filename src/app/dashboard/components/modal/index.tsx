"use client"

import React, { FormEvent } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Loader } from "lucide-react"

export function Modal() {
    const [userNick, setUserNick] = React.useState('')
    const [loading, setLoading] = React.useState(false)
    const router = useRouter()

    async function handleRedirect(e: React.FormEvent) {
        e.preventDefault()

        if(!userNick.trim()) {
            toast.warning("Preencha o campo com seu @nickname do github")
            return;
        }
        setLoading(true)
        const response = await fetch(`https://api.github.com/users/${userNick}`)
        if(!response || response.status === 404) {
            toast.warning("Usuário não encontrado, envie um usenick valido")
            setLoading(false)
            return;
        }
        
        router.replace(`/dashboard/${userNick}`)
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">

            <div className="flex flex-col gap-1 w-fit max-w-xl mx-3  p-6 bg-white/10 shadow-2xl backdrop-blur-2xl rounded-2xl">
                <h1 className="text-primarybege font-lalezar text-5xl">Você informou seu nickname do github errado ou vazio</h1>
                <p className="text-primarylightblue">Precisamos do seu nickname de <strong>usuário</strong> do github, para conseguimos calcular quanto você gerou de valor, digite ele no campo abaixo 👇</p>

                <form
                    className="flex justify-between bg-white/20 w-full mt-6"
                    onSubmit={handleRedirect}
                >
                    <input 
                        type="text" 
                        className="w-full pl-3 text-primarybege outline-none"
                        placeholder="Digite seu nickname do github"
                        value={userNick}
                        onChange={(e) => setUserNick(e.target.value)}
                    />

                    <button
                        className="flex items-center justify-center bg-white/30 text-primarybege py-2 w-40 font-medium active:scale-102"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? (
                            <Loader size={24} color="#fff" className="animate-spin" />
                        ) : (
                            'Saber agora'
                        )}
                    </button>
                </form>
            </div>
        </div>
    )
}