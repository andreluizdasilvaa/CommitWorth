import Image from "next/image"
import { api } from "@/lib/api"
import {
    Star,
    Box,
    GitCommit,
    DollarSign 
} from 'lucide-react'
import { formatDistanceStrict } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { isAxiosError } from "axios"
import { Container } from "@/components/container"
import { ButtonGithub } from "../components/buttonGithub"
import { Modal } from "../components/modal"
import { redirect } from "next/navigation"
import { CardInfoUserSmall } from "../components/cardInfoUserSmall" 
import { RateLimitModal, RateLimitProps } from "../components/rateLimitModal"
import { UserProps } from "@/types/user"
import { getGitHubStatsGraphQL } from "@/lib/github"
import { CardInfoUserBigNumber } from "../components/cardInfoUserBigNumber"

interface UserStaticsProps {
    totalStars: number;
    totalForks: number;
    repoCountExcludingForks: number;
    top4MostUsedLanguages: string[];
    popularContributions: string[];
    wellStructuredRepos: string[];
    totalCommits: number;
    valorAgregado: number;
    pontosTotais: number;
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
        if(isAxiosError(error)) {
            if(error.response?.status === 404) {
                console.log('Usuário não existe')
                return <Modal />
            }

            if(error.response?.status === 403) {
                console.log('Limite de requisições a api do github atingida, volte mais tarde')
                redirect('/')
            }
        }
        console.log('Erro interno/desconhecido')
        redirect('/')
    }

    return (
        <Container>
            <RateLimitModal 
                remainder={rateLimitData.remainder}
                reset={rateLimitData.reset}
                totalLimit={rateLimitData.totalLimit}
            />

            <div className="flex flex-wrap justify-between items-end">

                <>
                    <ButtonGithub />
                    <div className="flex gap-4 items-center max-sm:ml-auto">
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

            <div className="grid grid-cols-1 lg:grid-cols-2 my-4  gap-8">
                <CardInfoUserBigNumber 
                    Icon={DollarSign}
                    title="Valor agregado"
                    value={userDataInfos.valorAgregado}
                />

                <CardInfoUserBigNumber 
                    isPoints={true}
                    title="Seus Pontos"
                    value={userDataInfos.pontosTotais}
                />
            </div>

        </Container>
    )
}