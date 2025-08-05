import Image from "next/image"
import {
    Star,
    Box,
    GitCommit,
    DollarSign,
    GitFork,
} from 'lucide-react'
import { redirect, notFound } from "next/navigation"
import { cache } from 'react'

import { getGitHubStatsGraphQL, GitHubCompleteData } from "@/lib/getGithubData"

import { Footer } from "../components/footer"
import { CardInfoUserSmall } from "../components/cardInfoUserSmall"
import { CardInfoUserBigNumber } from "../components/cardInfoUserBigNumber"
import { CardLanguageChart } from "../components/charts/cardLanguageChart"
import { CardPopularReposChart } from "../components/charts/cardPopularReposChart"
import { WellStructuredRepoScoresChart } from "../components/charts/wellStructuredRepoScoresChart"
import { RateLimitModal } from "../components/rateLimitModal"
import { ConquestModal } from "../components/conquestCard"

import { Container } from "@/components/container"
import LightRays from '@/components/LightRaysBG'
import { Header } from "@/components/header"
import { Metadata } from "next"
import { GenerateMetadataModel } from "../utils/generateMetadata"

// Função com cache para buscar TODOS os dados com UMA única requisição
const getCompleteGitHubData = cache(async (user: string): Promise<GitHubCompleteData> => {
    try {
        const data = await getGitHubStatsGraphQL(user)
        return data

    } catch (error: any) {
        if (error?.response?.errors) {
            const errors = error.response.errors
            // usuário não encontrado
            if (errors.some((err: any) => err.type === 'NOT_FOUND')) {
                notFound()
            }
        }

        if (error?.response?.status === 403) {
            redirect('/')
        }
        
        throw error
    }
})

// Tipos corrigidos para Next.js 15
interface PageProps {
    params: Promise<{ user: string }>
}

// Função para gerar metadata usando os dados em cache
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { user } = await params

    const { userData, totalStars, totalCommits, valorAgregado } = await getCompleteGitHubData(user)
    
    return GenerateMetadataModel({ totalCommits, totalStars, userData, valorAgregado })
}

export default async function UserDetails({ params }: PageProps) {  
    const { user } = await params

    const {
        userData,
        totalStars,
        totalForks,
        repoCountExcludingForks,
        popularContributions,
        wellStructuredRepoScores,
        totalCommits,
        valorAgregado,
        pontosTotais,
        languageRepoCount,
        rateLimitInfo,
        achievements
    } = await getCompleteGitHubData(user) // esses dados ele pega do cache da req já feita para os metadata

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
                        remainder={rateLimitInfo.remaining}
                        reset={rateLimitInfo.resetAtRelative}
                        totalLimit={rateLimitInfo.limit}
                    />

                    <section>
                        <div className="flex flex-wrap justify-between items-end">
                            <div /> {/* Aqui terá um botão futuramente */}
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
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 my-4 mt-12 gap-8">
                            <CardInfoUserSmall
                                Icon={Star}
                                title="Total de estrelas"
                                value={totalStars}
                            />
                            <CardInfoUserSmall
                                Icon={Box}
                                title="Total de Repositórios"
                                value={repoCountExcludingForks}
                            />
                            <CardInfoUserSmall
                                Icon={GitCommit}
                                title="Total de Commits"
                                value={totalCommits}
                            />
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 my-4 mt-8 gap-8">
                            <CardInfoUserBigNumber
                                Icon={DollarSign}
                                title="Valor agregado"
                                value={valorAgregado}
                                about={`Valor fictício que ${userData.name} agrega mensalmente com base na sua atividade pública no GitHub, considerando estrelas, forks e commits.`}
                            />

                            {languageRepoCount.length > 1 && (
                                <CardLanguageChart
                                    title="Linguagens mais utilizadas"
                                    value={languageRepoCount}
                                />
                            )}

                            <CardInfoUserBigNumber
                                isPoints={true}
                                title="Seus Pontos"
                                value={pontosTotais}
                                about="Pontos calculados com base em seus commits, estrelas, forks e bônus por repositórios bem estruturados."
                            />

                            {popularContributions.length > 1 && (
                                <CardPopularReposChart
                                    title="Repositórios populares"
                                    value={popularContributions}
                                />
                            )}

                            {wellStructuredRepoScores.length > 1 && (
                                <WellStructuredRepoScoresChart
                                    title="Repositórios bem estruturados"
                                    value={wellStructuredRepoScores}
                                    about="Repositórios com descrição, página inicial e issues habilitadas, ranqueados por popularidade."
                                />
                            )}

                            <CardInfoUserBigNumber
                                Icon={GitFork}
                                title="Total Forks"
                                value={totalForks}
                                isFork={true}
                            />
                        </div>
                    </section>

                    <h2 className="text-primarybege text-4xl font-bold mb-2 mt-12">Distintivos de Conquista</h2>
                    <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {achievements.map(item => (
                            <ConquestModal 
                                title={item.name}
                                description={item.description}
                                isComplete={item.completed}
                                key={item.id}
                            />
                        ))}
                    </section>
                        
                    <h2 className="text-primarybege text-4xl font-bold mb-2 mt-12">Gere seu card!</h2>
                    <Footer
                        achievements={achievements}
                        avatar_url={userData.avatar_url}
                        name={userData.name}
                        nickname={userData.login}
                        pontosTotais={pontosTotais}
                        totalCommits={totalCommits}
                        valorAgregado={valorAgregado}
                    />
                </Container>
            </div>
        </div>
    )
}