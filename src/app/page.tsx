import Image from "next/image";
import { Container } from "@/components/container";
import { IdCard, IdCardLanyard, Gamepad, SmilePlus } from "lucide-react";
import { Header } from "@/components/header";
import DarkVeil from '@/components/darkVeil';
import githubHero from '@/assets/github-hero.png'
import { CardInfo } from "@/components/cardInfo";

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

                            <h1 className="leading-16 max-sm:leading-12 text-6xl max-sm:text-5xl text-primarybege font-lalezar">Veja Quanto Você Gerou de valor com Seus <span className="bg-gradient-to-r from-secondarypurple to-secondarygreen bg-clip-text text-transparent">Commits</span> no GitHub!
                            </h1>

                            <form
                                className="flex items-center justify-between p-2 rounded-full bg-primarybege w-full max-w-md"
                            >
                                <input 
                                    type="text" 
                                    className="w-full max-w-70 pl-2 text-black outline-none"
                                    placeholder="Digite seu nickname do github"
                                />
                                <button
                                    className="flex items-center px-3 py-2 rounded-full bg-secondarypurple text-white gap-1 font-medium whitespace-nowrap"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#fff" d="M5 2h4v2H7v2H5zm0 10H3V6h2zm2 2H5v-2h2zm2 2v-2H7v2H3v-2H1v2h2v2h4v4h2v-4h2v-2zm0 0v2H7v-2zm6-12v2H9V4zm4 2h-2V4h-2V2h4zm0 6V6h2v6zm-2 2v-2h2v2zm-2 2v-2h2v2zm0 2h-2v-2h2zm0 0h2v4h-2z"/></svg>
                                    Saber agora
                                </button>
                            </form>
                        </div>

                        <Image 
                            src={githubHero}
                            alt="Gihub foto"
                            className="max-w-500 hidden xl:flex"
                        />
                    </section>

                    <section className="mt-24">
                        <h2 className="text-3xl font-bold text-primarybege">Como funciona?</h2>

                        <div className="flex flex-wrap justify-around mt-3 gap-6">
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
