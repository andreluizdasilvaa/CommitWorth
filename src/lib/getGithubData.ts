import { graphqlClient } from "./api/graphqlClient"
import { buildQueryGitHubData } from "./api/queryGitHubData"
import { 
    GitHubCompleteData, 
    GitHubStatsResponse, 
    Repository, 
    UserProps 
} from "@/lib/types"

import {
  calculateAchievements,
  analyzeStackAndSeniority,
  formatRateLimitInfo,
  calculateLanguageStats,
  calcCommitStarsForks,
  getPopularContributions,
  identifyWellStructuredRepos,
  calculateValorAgregado,
  calculatePontosTotais,
  calcStructuredRepoScores,
} from "./calcs"

async function fetchGitHubData(username: string): Promise<GitHubStatsResponse> {
    try {
        const query = buildQueryGitHubData();
        return await graphqlClient.request<GitHubStatsResponse>(query, { login: username })
    } catch (error) {
        throw error
    }
}

export async function getGitHubStatsGraphQL(username: string): Promise<GitHubCompleteData> {
    const data = await fetchGitHubData(username)

    const rateLimitInfo = formatRateLimitInfo(data.rateLimit)
    
    const userData: UserProps = {
        login: data.user.login,
        name: data.user.name,
        avatar_url: data.user.avatarUrl
    }
    
    // Repositórios próprios (sem forks) - já filtrados pela query GraphQL
    const nonForkRepos:Repository[] = data.user.repositories.nodes
    
    const { totalCommits, totalStars, totalForks } = calcCommitStarsForks(data, nonForkRepos)
    
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
    const wellStructuredRepoScores = calcStructuredRepoScores(wellStructuredRepos)

    // Analisar stack e senioridade
    const stackAnalysis = analyzeStackAndSeniority(data)

    // Calcular conquistas passando dados pré-calculados para consistência
    const achievements = calculateAchievements(data, {
        totalCommits,
        totalStars,
        nonForkRepos,
        stackAnalysis
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
        achievements,
        stackAnalysis
    }
}