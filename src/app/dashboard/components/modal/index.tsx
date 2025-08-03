"use client"

import React, { FormEvent } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export function Modal() {
    const [userNick, setUserNick] = React.useState('')
    const router = useRouter()

    function handleRedirect(e: FormEvent) {
        e.preventDefault()

        if(!userNick) {
            toast.warning("Informe seu nickname")
            return;
        }

        router.replace(`/dashboard/${userNick}`)
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">

            <div className="flex flex-col gap-1 w-fit max-w-xl mx-3  p-6 bg-white/10 shadow-2xl backdrop-blur-2xl rounded-2xl">
                <h1 className="text-primarybege font-lalezar text-5xl">Você não informou seu nickname do github ou algo deu errado</h1>
                <p className="text-primarylightblue">Você deve ter enviado seu nome incorreto ou vazio, para conseguimos calcular quanto você gerou de valor com seus commits no github precisamos do seu nickname, digite ele no campo abaixo</p>

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
                        className="bg-white/30 text-primarybege py-2 w-40 font-medium active:scale-102"
                        type="submit"
                    >
                        Saber agora
                    </button>
                </form>
            </div>
        </div>
    )
}