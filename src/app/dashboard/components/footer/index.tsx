"use client"

import { useRef, useState } from "react"
import { toPng } from "html-to-image"
import { Logo } from '@/components/logo';
import { ModalShareCard } from "../modalShareCard";
import { toast } from "sonner";
import Image from "next/image";
import githubLogo from '@/assets/github-logo.svg'
import { Achievement } from "@/lib/types";
import { StackAnalysis } from "@/lib/calcs/stackAnalysis";

interface CardFooter {
    valorAgregado: number;
    totalCommits: number;
    pontosTotais: number;
    name: string;
    nickname: string;
    avatar_url: string;
    achievements: Achievement[];
    stackAnalysis: StackAnalysis;
}

export function Footer({
    avatar_url,
    name,
    pontosTotais,
    totalCommits,
    nickname,
    valorAgregado,
    achievements,
    stackAnalysis
}: CardFooter) {
    const [showModal, setShowModal] = useState(false)
    const cardRef = useRef<HTMLDivElement>(null)

    const handleDownload = async () => {
        if (!cardRef.current) return

        try {
            const dataUrl = await toPng(cardRef.current, { cacheBust: true })

            const link = document.createElement("a")
            link.download = "meu-card.png"
            link.href = dataUrl
            link.click()
            setShowModal(true)
        } catch (err) {
            toast.error('Erro ao gerar imagem, tente novamente mais tarde')
        }
    }

    return (
        <>
            {showModal && (
                <ModalShareCard nickname={nickname} setShowModal={setShowModal}/>
            )}
            <footer className="w-full">
                <div className="flex items-center justify-center xl:justify-between flex-wrap px-4 sm:px-12 pb-8 sm:pt-12 h-full bg-primaryblue rounded-t-3xl gap-8">

                    <div className="flex items-center justify-center max-w-[500px] max-h-[257px] scale-[0.30] sm:scale-[0.45] ">

                        <div
                            ref={cardRef}
                            key={nickname}
                            className='select-none flex flex-col items-center justify-between bg-primarydark pt-5 px-8 w-full min-w-[1200px] min-h-[630px] scale-90'
                        >
                            <Logo
                                isImg={true}
                                className="absolute top-8 left-8 opacity-50"
                            />
                            
                            <h1 className='text-primarybege text-5xl text-center mx-auto font-black max-w-2xl py-4 pt-6'>
                                Veja Quanto eu Gerei com meus{" "}
                                <span className="bg-gradient-to-r from-secondarypurple to-secondarygreen bg-clip-text text-transparent">
                                    Commits
                                </span>{" "}
                                no GitHub!
                            </h1>

                            <div className='w-full rounded-t-2xl bg-primaryblue px-6 pt-6'>
                                <div className='flex items-start justify-between'>

                                    <div className='flex flex-wrap gap-3 w-full max-w-xl'>

                                        {achievements.filter(item => item.completed === true).map(item => (
                                            <div key={item.id} className="flex items-center justify-center gap-2 w-fit h-fit px-2.5 py-1 rounded-full border-1 border-secondarygreen shadow-[0_0_8px_2px_rgba(126,197,67,0.5)]">
                                                <div className='w-3 h-3 rounded-full bg-secondarygreen' />
                                                <span className="text-secondarygreen text-shadow-lg font-medium">{item.name}</span>
                                            </div>
                                        ))}
                                        
                                    </div>

                                    <div className="flex gap-4 items-center justify-end">
                                        <div>
                                            <h2 className="text-primarybege text-4xl font-black">
                                                {name}
                                            </h2>
                                            <p className="text-primarybege font-medium">
                                                @{nickname}
                                            </p>
                                        </div>

                                        <Image
                                            key={avatar_url}
                                            src={avatar_url}
                                            alt={`Avatar do @${name}`}
                                            width={120}
                                            height={120}
                                            className="rounded-full"
                                            unoptimized
                                        />
                                    </div>
                                </div>

                                <div className='flex justify-around items-center mt-4 gap-3'>

                                    <div className='flex flex-col items-center'>
                                        <p className='text-3xl text-primarybege font-bold'>Total de commits</p>
                                        <p className='text-4xl text-secondarypurple font-black'>+{totalCommits}</p>
                                    </div>

                                    <div className='flex flex-col items-center py-8 justify-between border-x-2 border-t-2 rounded-t-2xl border-primarymediumblue w-xl h-50'>
                                        <div className='flex items-center justify-between w-full px-12'>
                                            <p className='text-primarybege text-2xl font-bold'>Valor agregado</p>
                                            <Image
                                                src={githubLogo}
                                                alt='Github Logo'
                                                width={25}
                                            />
                                        </div>
                                        <p className='text-7xl font-black text-secondarygreen'>R${valorAgregado.toLocaleString('pt-BR')}</p>
                                    </div>

                                    <div className='flex flex-col items-center'>
                                        <p className='text-3xl text-primarybege font-bold'>Meus pontos</p>
                                        <p className='text-4xl text-secondarygreen font-black'>+{pontosTotais}</p>
                                    </div>
                                </div>

                                <div className='flex justify-around items-center gap-6 py-2 border-t-2 border-primarymediumblue'>
                                    <div className='flex flex-col items-center'>
                                        <p className='text-2xl text-primarybege font-bold'>Stack Principal</p>
                                        <p className='text-3xl text-secondarygreen font-black'>{stackAnalysis.primaryStack}</p>
                                    </div>

                                    <div className='flex flex-col items-center'>
                                        <p className='text-2xl text-primarybege font-bold'>Senioridade</p>
                                        <p className='text-3xl text-secondaryyellow font-black'>{stackAnalysis.seniorityLevel}</p>
                                        <p className='text-sm text-primarybege opacity-80'>Score: {stackAnalysis.seniorityScore}/100</p>
                                    </div>

                                    <div className='flex flex-col items-center'>
                                        <p className='text-2xl text-primarybege font-bold'>Experiência</p>
                                        <p className='text-xl text-secondarypurple font-black'>{stackAnalysis.stackSummary.experienceRange}</p>
                                        <p className='text-sm text-primarybege opacity-80'>{stackAnalysis.stackSummary.totalLanguages} linguagens</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="flex flex-col items-end  sm:items-start text-primarybege max-w-xl gap-4">
                        <h2 className="text-2xl sm:text-4xl font-inter font-bold">
                            Compartilhe seu card em suas redes sociais!!
                        </h2>
                        <p className="text-primarylightblue max-sm:text-sm">
                            Gere seu Card clicando no Botão abaixo! e mostre para o mundo quanto você já contribuiu com seus codigos.
                        </p>

                        <button onClick={handleDownload} className="w-fit text-xl font-bold bg-secondarygreen px-3 py-2 rounded-full pulse-scale shadow-2xl">
                            Gerar agora
                        </button>
                    </div>
                </div>
            </footer>
        </>
    )
}
