import Image from "next/image"
import { api } from "@/lib/api"
import {
    Star,
    Box,
    GitCommit,
    DollarSign,
    GitFork
} from 'lucide-react'
import { formatDistanceStrict } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { isAxiosError } from "axios"
import { Footer } from "../components/footer"
import { Container } from "@/components/container"
import { ButtonGithub } from "../components/buttonGithub"
import { Modal } from "../components/modal"
import { redirect } from "next/navigation"
import { CardInfoUserSmall } from "../components/cardInfoUserSmall"
import { RateLimitModal, RateLimitProps } from "../components/rateLimitModal"
import { UserProps } from "@/types/user"
import { getGitHubStatsGraphQL } from "@/lib/github"

import { CardInfoUserBigNumber } from "../components/cardInfoUserBigNumber"
import { CardLanguageChart } from "../components/charts/cardLanguageChart"
import { CardPopularReposChart } from "../components/charts/cardPopularReposChart"
import { WellStructuredRepoScoresChart } from "../components/charts/wellStructuredRepoScoresChart"
import LightRays from '@/components/LightRaysBG'
import { Header } from "@/components/header"

interface UserStaticsProps {
    totalStars: number;
    totalForks: number;
    repoCountExcludingForks: number;
    popularContributions: {
        name: string;
        stars: number;
    }[];
    wellStructuredRepoScores: {
        name: string;
        score: number;
    }[];
    wellStructuredRepos?: { // talves use isso para algo futuro
        name: string
        description: string | null
        homepageUrl: string | null
        stars: number
        forks: number
        mainLanguage?: string
    }[];
    totalCommits: number;
    valorAgregado: number;
    pontosTotais: number;
    languageRepoCount: {
        language: string;
        count: number;
    }[]
}

type ParamsProps = { params: { user: string } }
export default async function UserDeitais({ params }: ParamsProps) {  
    const { user } = await params

    let userData: UserProps
    let rateLimitData: RateLimitProps
    let userDataInfos: UserStaticsProps

    try {
        const response = await api.get(`/${user}`)

        const now = new Date()
        const resetDate = new Date(Number(response.headers['x-ratelimit-reset']) * 1000)
        const tempoRestante = formatDistanceStrict(resetDate, now, {
            locale: ptBR,
            addSuffix: true,
            roundingMethod: 'floor'
        })
        const rateLimit = {
            totalLimit: response.headers['x-ratelimit-limit'],
            remainder: response.headers['x-ratelimit-remaining'],
            reset: `Faltam ${tempoRestante} para resetar`
        }

        rateLimitData = rateLimit
        userData = response.data

        const resp = await getGitHubStatsGraphQL(user)
        console.log(resp)
        userDataInfos = resp
        console.log(userDataInfos)

    } catch (error) {
        console.log(error)
        if (isAxiosError(error)) {
            if (error.response?.status === 404) {
                console.log('Usuário não existe')
                return <Modal />
            }

            if (error.response?.status === 403) {
                console.log('Limite de requisições a api do github atingida, volte mais tarde')
                redirect('/')
            }
        }
        console.log('Erro interno/desconhecido')
        redirect('/')
    }

    return (
        <div className="w-screen h-screen overflow-x-hidden fixed">
            <div className="fixed inset-0">
                <LightRays
                    raysOrigin="top-center"
                    raysColor="#748CAB"
                    raysSpeed={1.5}
                    lightSpread={1}
                    rayLength={1.2}
                    followMouse={true}
                    mouseInfluence={0.1}
                    noiseAmount={0.5}
                    distortion={0.1}
                    className="custom-rays"
                />
            </div>


            <div className="relative z-10">
                <Header isDashboard={true} />
                <Container>
                    <RateLimitModal
                        remainder={rateLimitData.remainder}
                        reset={rateLimitData.reset}
                        totalLimit={rateLimitData.totalLimit}
                    />

                    <section>
                        <div className="flex flex-wrap justify-between items-end">
                            <>
                                <ButtonGithub />
                                <div className="flex flex-wrap gap-4 items-center justify-end mt-3 max-sm:ml-auto">
                                    <div>
                                        <h2 className="text-primarybege font-inter text-4xl font-black">
                                            {userData.name}
                                        </h2>
                                        <p className="text-primarybege font-medium">
                                            @{userData.login}
                                        </p>
                                    </div>

                                    <Image
                                        src={userData.avatar_url}
                                        alt={`Avatar do @${userData.login}`}
                                        width={120}
                                        height={120}
                                        className="rounded-full"
                                    />
                                </div>
                            </>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 my-4 mt-12 gap-8">
                            <CardInfoUserSmall
                                Icon={Star}
                                title="Total de estrelas"
                                value={userDataInfos.totalStars}
                            />
                            <CardInfoUserSmall
                                Icon={Box}
                                title="Total de Repositorios"
                                value={userDataInfos.repoCountExcludingForks}
                            />
                            <CardInfoUserSmall
                                Icon={GitCommit}
                                title="Total de Commits"
                                value={userDataInfos.totalCommits}
                            />
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 my-4 mt-8 gap-8">
                            <CardInfoUserBigNumber
                                Icon={DollarSign}
                                title="Valor agregado"
                                value={userDataInfos.valorAgregado}
                                about="Valor fictício estimado com base na sua atividade pública no GitHub, considerando estrelas, forks e commits."
                            />

                            {userDataInfos.languageRepoCount.length > 1 && (
                                <CardLanguageChart
                                    title="Linguagens mais utilizadas"
                                    value={userDataInfos.languageRepoCount}
                                />
                            )}

                            <CardInfoUserBigNumber
                                isPoints={true}
                                title="Seus Pontos"
                                value={userDataInfos.pontosTotais}
                                about="Pontos calculados com base em seus commits, estrelas, forks e bônus por repositórios bem estruturados."
                            />

                            {userDataInfos.popularContributions.length > 1 && (
                                <CardPopularReposChart
                                    title="Repositórios populares"
                                    value={userDataInfos.popularContributions}
                                />
                            )}

                            {userDataInfos.wellStructuredRepoScores.length > 1 && (
                                <WellStructuredRepoScoresChart
                                    title="Repositórios bem estruturados"
                                    value={userDataInfos.wellStructuredRepoScores}
                                    about="Repositórios com descrição, página inicial e issues habilitadas, ranqueados por popularidade."
                                />
                            )}

                            <CardInfoUserBigNumber
                                Icon={GitFork}
                                title="Total Forks"
                                value={userDataInfos.totalForks}
                                isFork={true}
                            />
                        </div>
                    </section>
                        
                    <h2 className="text-primarybege text-4xl font-bold mb-2 mt-12">Gere seu card!</h2>
                    <Footer 
                        avatar_url={userData.avatar_url}
                        name={userData.name}
                        userNick={userData.login}
                        pontosTotais={userDataInfos.pontosTotais}
                        totalCommits={userDataInfos.totalCommits}
                        valorAgregado={userDataInfos.valorAgregado}
                        
                    />
                </Container>
            </div>
        </div>
    )
}
