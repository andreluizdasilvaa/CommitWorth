import { GraphQLClient, gql } from "graphql-request"
import { Achievement, calculateAchievements } from "./calculateAchievements"

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

export interface GitHubStatsResponse {
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
        createdAt: string 
        repositories: {
            nodes: {
                name: string
                stargazerCount: number
                forkCount: number
                isFork: boolean
                description: string | null
                homepageUrl: string | null
                hasIssuesEnabled: boolean
                createdAt: string 
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
                mentionableUsers: {
                    totalCount: number
                }
            }[]
        }
        contributionsCollection: {  
            contributionCalendar: {
                totalContributions: number
                weeks: {
                    contributionDays: {
                        contributionCount: number
                        date: string
                    }[]
                }[]
            }
            commitContributionsByRepository: {
                repository: {
                    name: string
                }
                contributions: {
                    totalCount: number
                    nodes: {
                        occurredAt: string
                        commitCount: number
                    }[]
                }
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
    createdAt: string 
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
    mentionableUsers: {  
        totalCount: number
    }
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
    achievements: Achievement[]
}

const SCORING_CONFIG = {
    valorPorCommit: 0.02,
    valorPorStar: 0.50,
    valorPorFork: 0.30,
    pontosPorCommit: 1,
    pontosPorStar: 5,
    pontosPorFork: 3,
    bonusRepoBemEstruturado: 10,
} as const

function formatRateLimitInfo(rateLimit: GitHubStatsResponse['rateLimit']): RateLimitInfo {
    const resetDate = new Date(rateLimit.resetAt)
    const now = new Date()
    
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
                createdAt
                repositories(first: 100, ownerAffiliations: OWNER) {
                    nodes {
                        name
                        stargazerCount
                        forkCount
                        isFork
                        description
                        homepageUrl
                        hasIssuesEnabled
                        createdAt
                        languages(first: 10) {
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
                        mentionableUsers(first: 10) {
                            totalCount
                        }
                    }
                }
                contributionsCollection {
                    contributionCalendar {
                        totalContributions
                        weeks {
                            contributionDays {
                                contributionCount
                                date
                            }
                        }
                    }
                    commitContributionsByRepository {
                        repository {
                            name
                        }
                        contributions(first: 100) {
                            totalCount
                            nodes {
                                occurredAt
                                commitCount
                            }
                        }
                    }
                }
            }
        }
    `

    try {
        return await graphqlClient.request<GitHubStatsResponse>(query, { login: username })
    } catch (error) {
        console.error(`Erro ao buscar dados do GitHub para ${username}:`, error)
        throw error
    }
}

function filterNonForkRepos(repos: Repository[]): Repository[] {
    return repos.filter(repo => !repo.isFork)
}

// calcula commits de forma mais precisa
function calculateUnifiedCommitCount(data: GitHubStatsResponse, nonForkRepos: Repository[]): number {
    // Soma dos commits dos repositórios individuais
    const repoCommits = nonForkRepos.reduce((total, repo) => {
        return total + (repo.defaultBranchRef?.target?.history?.totalCount ?? 0)
    }, 0)
    
    // Soma dos commits por repositório das contribuições
    const commitsByRepo = data.user.contributionsCollection?.commitContributionsByRepository?.reduce((total, repoContrib) => {
        return total + (repoContrib.contributions?.totalCount ?? 0)
    }, 0) ?? 0
    
    // Total de contribuições do último ano
    const contributionCommits = data.user.contributionsCollection?.contributionCalendar?.totalContributions ?? 0
    
    return Math.max(repoCommits, commitsByRepo, contributionCommits)
}

function calculateTotalStats(data: GitHubStatsResponse, repos: Repository[]) {
    const totalStars = repos.reduce((total, repo) => total + (repo.stargazerCount ?? 0), 0)
    const totalForks = repos.reduce((total, repo) => total + (repo.forkCount ?? 0), 0)
    const totalCommits = calculateUnifiedCommitCount(data, repos)

    return { totalCommits, totalStars, totalForks }
}

function calculateLanguageStats(repos: Repository[]) {
    const languageCount = new Map<string, number>()

    repos.forEach(repo => {
        const mainLanguage = repo.languages?.nodes?.[0]?.name
        if (mainLanguage) {
            languageCount.set(mainLanguage, (languageCount.get(mainLanguage) ?? 0) + 1)
        }
    })

    return Array.from(languageCount.entries())
        .sort(([, a], [, b]) => b - a)
        .map(([language, count]) => ({ language, count }))
}

function getPopularContributions(repos: Repository[]) {
    return repos
        .map(repo => ({ name: repo.name, stars: repo.stargazerCount ?? 0 }))
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
            stars: repo.stargazerCount ?? 0,
            forks: repo.forkCount ?? 0,
            mainLanguage: repo.languages?.nodes?.[0]?.name,
        }))
}

function calculateValorAgregado(totalCommits: number, totalStars: number, totalForks: number): number {
    const { valorPorCommit, valorPorStar, valorPorFork } = SCORING_CONFIG
    
    const valorAgregado =
        totalCommits * valorPorCommit +
        totalStars * valorPorStar +
        totalForks * valorPorFork

    return Math.round(valorAgregado * 100) / 100 
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
    const data = await fetchGitHubData(username)
    
    const rateLimitInfo = formatRateLimitInfo(data.rateLimit)
    
    const userData: UserProps = {
        login: data.user.login,
        name: data.user.name,
        avatar_url: data.user.avatarUrl
    }
    
    // Filtrar repositórios (excluir forks)
    const repos = data.user.repositories.nodes
    const nonForkRepos = filterNonForkRepos(repos)
    
    // Calcular estatísticas totais usando função unificada
    const { totalCommits, totalStars, totalForks } = calculateTotalStats(data, nonForkRepos)
    
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

    // Calcular conquistas passando dados pré-calculados para consistência
    const achievements = calculateAchievements(data, {
        totalCommits,
        totalStars,
        nonForkRepos
    })

    return {
        userData,
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
        achievements
    }
}