import React from "react"
import Image from "next/image"
import { Container } from "@/components/container"
import { IdCard, IdCardLanyard, Gamepad, SmilePlus } from "lucide-react"
import { Header } from "@/components/header"
import DarkVeil from '@/components/darkVeilBG'
import { InputForm } from "@/components/inputForm"
import githubHero from '@/assets/github-hero.png'
import { CardInfo } from "@/components/cardInfo"
import { GradientText } from "@/components/gradientText"

export default function Home() {
    return (
        <div className="w-screen h-screen overflow-x-hidden relative">
            <div className="absolute inset-0 z-0">
                <DarkVeil backgroundColor="#0D1321" />
            </div>

            <div className="relative z-10">
                <Header />
                <Container>
                    <section className="flex flex-wrap items-center justify-center xl:justify-between mt-8">
                        <div className="flex flex-col max-w-2xl gap-4 justify-center">
                            <div className="flex items-center justify-center gap-2 w-fit px-2.5 py-1 rounded-full border-1 border-secondarygreen shadow-[0_0_8px_2px_rgba(126,197,67,0.5)]">
                                <IdCard size={20} color="#32E875" />
                                <span className="text-secondarygreen text-shadow-lg font-medium">Seu card 100% gratuito!</span>
                            </div>

                            <h1 className="leading-1bhnhh6 max-sm:leading-12 text-6xl max-sm:text-5xl text-primarybege font-lalezar">
                                Veja Quanto Você Gerou de valor com Seus <GradientText
                                    colors={["#613DC1", "#32E875", "#E3B341", "#4079ff", "#40ffaa"]}
                                    animationSpeed={4}
                                    showBorder={false}
                                    className=""
                                >Commits</GradientText> do github!
                            </h1>
                            <InputForm />

                        </div>

                        <Image
                            src={githubHero}
                            alt="Gihub foto"
                            className="max-w-500 flex max-xl:hidden"
                        />
                    </section>

                    <section className="mt-24">
                        <h2 className="text-3xl max-xl:text-center font-bold text-primarybege">Como funciona?</h2>

                        <div className="flex flex-wrap justify-around max-xl:justify-center mt-3 gap-6">
                            <CardInfo
                                icon={IdCardLanyard}
                                description="Veja seus commits, repositórios e linguagens mais usadas. O CommitWorth analisa seus dados para mostrar sua evolução como desenvolvedor."
                                title="Adicione seu GitHub"
                            />

                            <CardInfo
                                icon={Gamepad}
                                description="Seu valor é calculado com base na qualidade dos commits, PRs aceitos e engajamento na comunidade. Quanto mais você contribui de forma relevante, maior será seu reconhecimento."
                                title="Estatísticas e Ranking"
                            />

                            <CardInfo
                                icon={SmilePlus}
                                description="Geramos um card exclusivo com seu valor acumulado, pronto para compartilhar no LinkedIn, Twitter e outras redes sociais. Destaque sua dedicação ao open-source!"
                                title="Compartilhe seu Impacto"
                            />
                        </div>
                    </section>

                    <p className="text-center my-2 mt-4 text-primarybege">Feito com ❤️ por <a href="https://github.com/andreluizdasilvaa">André</a></p>
                </Container>
            </div>
        </div>
    );
}
