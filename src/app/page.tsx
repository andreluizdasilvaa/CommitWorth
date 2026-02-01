import Image from "next/image"
import { IdCard, IdCardLanyard, Gamepad, SmilePlus } from "lucide-react"
import githubHero from '@/assets/github-hero.png'

import { Container } from "@/components/container"
import { Header } from "@/components/header"
import LightPillar from '@/components/LightPillar'
import { InputForm } from "@/components/inputForm"
import { CardInfo } from "@/components/cardInfo"
import { GradientText } from "@/components/gradientText"

export default function Home() {
    return (
        <div className="w-screen h-screen overflow-x-hidden relative">
            <div className="fixed inset-0 z-0">
                <LightPillar
                    topColor="#1D2D44"
                    bottomColor="#613DC1"
                    intensity={1.2}
                    rotationSpeed={0.4}
                    glowAmount={0.005}
                    pillarWidth={3.5}
                    pillarHeight={0.5}
                    noiseIntensity={1}
                    pillarRotation={-25}
                    interactive={false}
                    mixBlendMode="color"
                    quality="high"
                />
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
                            alt="Github foto"
                            className="max-w-135 flex max-xl:hidden drop-shadow-[0_0_20px_rgba(97,61,193,0.8)] select-none"
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
                                description="Seu valor é calculado com base nos seus commits, estrelas, forks e um bonus em repositórios bem documentados. Quanto mais você contribui de forma relevante, maior será seu reconhecimento."
                                title="Valores e Estatísticas"
                            />

                            <CardInfo
                                icon={SmilePlus}
                                description="Geramos um card exclusivo com seu valor acumulado, pronto para compartilhar no LinkedIn, Twitter e outras redes sociais."
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
