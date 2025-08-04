import { GraphQLClient, gql } from "graphql-request"

const graphqlClient = new GraphQLClient("https://api.github.com/graphql", {
    headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN_FOR_REQUESTS}`,
    },
})

interface RateLimitInfo {
    limit: number
    remaining: number
    resetAtRelative: string
}

interface GitHubStatsResponse {
    rateLimit: {
        limit: number
        remaining: number
        resetAt: string
    }
    user: {
        id: string
        login: string
        name: string
        avatarUrl: string
        repositories: {
            nodes: {
                name: string
                stargazerCount: number
                forkCount: number
                isFork: boolean
                description: string | null
                homepageUrl: string | null
                hasIssuesEnabled: boolean
                languages: {
                    nodes: {
                        name: string
                    }[]
                }
                defaultBranchRef: {
                    target: {
                        history: {
                            totalCount: number
                        }
                    }
                } | null
            }[]
        }
    }
}

interface Repository {
    name: string
    stargazerCount: number
    forkCount: number
    isFork: boolean
    description: string | null
    homepageUrl: string | null
    hasIssuesEnabled: boolean
    languages: {
        nodes: {
            name: string
        }[]
    }
    defaultBranchRef: {
        target: {
            history: {
                totalCount: number
            }
        }
    } | null
}

interface WellStructuredRepo {
    name: string
    description: string | null
    homepageUrl: string | null
    stars: number
    forks: number
    mainLanguage?: string
}

interface RepoScore {
    name: string
    score: number
}

export interface UserProps {
    login: string
    name: string
    avatar_url: string
}

export interface GitHubCompleteData {
    userData: UserProps
    totalStars: number
    totalForks: number
    repoCountExcludingForks: number
    popularContributions: {
        name: string
        stars: number
    }[]
    wellStructuredRepoScores: {
        name: string
        score: number
    }[]
    totalCommits: number
    valorAgregado: number
    pontosTotais: number
    languageRepoCount: {
        language: string
        count: number
    }[]
    rateLimitInfo: RateLimitInfo
}

// Constantes para cálculos
const SCORING_CONFIG = {
    valorPorCommit: 0.02,
    valorPorStar: 0.50,
    valorPorFork: 0.30,
    pontosPorCommit: 1,
    pontosPorStar: 5,
    pontosPorFork: 3,
    bonusRepoBemEstruturado: 10,
}

function formatRateLimitInfo(rateLimit: GitHubStatsResponse['rateLimit']): RateLimitInfo {
    const resetDate = new Date(rateLimit.resetAt)
    const now = new Date()
    
    // Calcular quantos segundos faltam para o reset
    const secondsUntilReset = Math.max(0, Math.floor((resetDate.getTime() - now.getTime()) / 1000))
    
    return {
        limit: rateLimit.limit,
        remaining: rateLimit.remaining,
        resetAtRelative: secondsUntilReset > 0 
            ? `${Math.floor(secondsUntilReset / 60)}min ${secondsUntilReset % 60}s`
            : 'agora'
    }
}

async function fetchGitHubData(username: string): Promise<GitHubStatsResponse> {
    const query = gql`
        query getUserStats($login: String!) {
            rateLimit {
                limit
                remaining
                resetAt
            }
            user(login: $login) {
                id
                login
                name
                avatarUrl
                repositories(first: 100, ownerAffiliations: OWNER) {
                    nodes {
                        name
                        stargazerCount
                        forkCount
                        isFork
                        description
                        homepageUrl
                        hasIssuesEnabled
                        languages(first: 1) {
                            nodes {
                                name
                            }
                        }
                        defaultBranchRef {
                            target {
                                ... on Commit {
                                    history {
                                        totalCount
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    `

    return await graphqlClient.request<GitHubStatsResponse>(query, {
        login: username,
    })
}

function filterNonForkRepos(repos: Repository[]): Repository[] {
    return repos.filter(r => !r.isFork)
}

function calculateTotalStats(repos: Repository[]) {
    let totalCommits = 0
    let totalStars = 0
    let totalForks = 0

    for (const repo of repos) {
        totalStars += repo.stargazerCount || 0
        totalForks += repo.forkCount || 0
        totalCommits += repo.defaultBranchRef?.target?.history?.totalCount || 0
    }

    return { totalCommits, totalStars, totalForks }
}

function calculateLanguageStats(repos: Repository[]) {
    const languageCount = new Map<string, number>()

    for (const repo of repos) {
        const mainLanguage = repo.languages?.nodes?.[0]?.name
        if (mainLanguage) {
            languageCount.set(mainLanguage, (languageCount.get(mainLanguage) || 0) + 1)
        }
    }

    return [...languageCount.entries()]
        .sort((a, b) => b[1] - a[1])
        .map(([language, count]) => ({ language, count }))
}

function getPopularContributions(repos: Repository[]) {
    return repos
        .map(repo => ({ name: repo.name, stars: repo.stargazerCount }))
        .sort((a, b) => b.stars - a.stars)
        .slice(0, 5)
}

function identifyWellStructuredRepos(repos: Repository[]): WellStructuredRepo[] {
    return repos
        .filter(repo => repo.description && repo.homepageUrl && repo.hasIssuesEnabled)
        .map(repo => ({
            name: repo.name,
            description: repo.description,
            homepageUrl: repo.homepageUrl,
            stars: repo.stargazerCount,
            forks: repo.forkCount,
            mainLanguage: repo.languages?.nodes?.[0]?.name,
        }))
}

function calculateValorAgregado(totalCommits: number, totalStars: number, totalForks: number): number {
    const { valorPorCommit, valorPorStar, valorPorFork } = SCORING_CONFIG
    
    const valorAgregado =
        totalCommits * valorPorCommit +
        totalStars * valorPorStar +
        totalForks * valorPorFork

    return Number(valorAgregado.toFixed(2))
}

function calculatePontosTotais(
    totalCommits: number, 
    totalStars: number, 
    totalForks: number, 
    wellStructuredReposCount: number
): number {
    const { pontosPorCommit, pontosPorStar, pontosPorFork, bonusRepoBemEstruturado } = SCORING_CONFIG

    return (
        totalCommits * pontosPorCommit +
        totalStars * pontosPorStar +
        totalForks * pontosPorFork +
        wellStructuredReposCount * bonusRepoBemEstruturado
    )
}

function calculateWellStructuredRepoScores(wellStructuredRepos: WellStructuredRepo[]): RepoScore[] {
    const { pontosPorStar, pontosPorFork, bonusRepoBemEstruturado } = SCORING_CONFIG

    return wellStructuredRepos
        .map(repo => ({
            name: repo.name,
            score:
                repo.stars * pontosPorStar +
                repo.forks * pontosPorFork +
                bonusRepoBemEstruturado,
        }))
        .sort((a, b) => b.score - a.score)
}

export async function getGitHubStatsGraphQL(username: string): Promise<GitHubCompleteData> {
    // Buscar dados do GitHub (agora inclui rate limit)
    const data = await fetchGitHubData(username)
    
    // Processar informações de rate limit
    const rateLimitInfo = formatRateLimitInfo(data.rateLimit)
    
    // Extrair dados do usuário
    const userData: UserProps = {
        login: data.user.login,
        name: data.user.name,
        avatar_url: data.user.avatarUrl
    }
    
    // Filtrar repositórios (excluir forks)
    const repos = data.user.repositories.nodes
    const nonForkRepos = filterNonForkRepos(repos)
    
    // Calcular estatísticas totais
    const { totalCommits, totalStars, totalForks } = calculateTotalStats(nonForkRepos)
    
    // Calcular estatísticas de linguagens
    const languageRepoCount = calculateLanguageStats(nonForkRepos)
    
    // Obter contribuições populares
    const popularContributions = getPopularContributions(nonForkRepos)
    
    // Identificar repositórios bem estruturados
    const wellStructuredRepos = identifyWellStructuredRepos(nonForkRepos)
    
    // Calcular valor agregado
    const valorAgregado = calculateValorAgregado(totalCommits, totalStars, totalForks)
    
    // Calcular pontos totais
    const pontosTotais = calculatePontosTotais(
        totalCommits, 
        totalStars, 
        totalForks, 
        wellStructuredRepos.length
    )
    
    // Calcular scores dos repositórios bem estruturados
    const wellStructuredRepoScores = calculateWellStructuredRepoScores(wellStructuredRepos)

    return {
        // Dados do usuário
        userData,
        // Estatísticas dos repositórios  
        totalStars,
        totalForks,
        repoCountExcludingForks: nonForkRepos.length,
        popularContributions,
        wellStructuredRepoScores,
        totalCommits,
        valorAgregado,
        pontosTotais,
        languageRepoCount,
        rateLimitInfo,
    }
}