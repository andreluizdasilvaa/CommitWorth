import { GraphQLClient, gql } from "graphql-request"

const graphqlClient = new GraphQLClient("https://api.github.com/graphql", {
    headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN_FOR_REQUESTS}`,
    },
})

interface GitHubStatsResponse {
    user: {
        id: string
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

export async function getGitHubStatsGraphQL(username: string) {
    const query = gql`
        query getUserStats($login: String!) {
            user(login: $login) {
                id
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

    const data = await graphqlClient.request<GitHubStatsResponse>(query, {
        login: username,
    })

    const repos = data.user.repositories.nodes
    const nonForkRepos = repos.filter(r => !r.isFork)

    let totalCommits = 0
    let totalStars = 0
    let totalForks = 0

    const languageCount = new Map<string, number>()
    const repoStats: { name: string; stars: number }[] = []
    const wellStructuredRepos: {
        name: string
        description: string | null
        homepageUrl: string | null
        stars: number
        forks: number
        mainLanguage?: string
    }[] = []

    for (const repo of nonForkRepos) {
        totalStars += repo.stargazerCount || 0
        totalForks += repo.forkCount || 0
        totalCommits += repo.defaultBranchRef?.target?.history?.totalCount || 0

        const mainLanguage = repo.languages?.nodes?.[0]?.name
        if (mainLanguage) {
            languageCount.set(mainLanguage, (languageCount.get(mainLanguage) || 0) + 1)
        }

        repoStats.push({ name: repo.name, stars: repo.stargazerCount })

        if (repo.description && repo.homepageUrl && repo.hasIssuesEnabled) {
            wellStructuredRepos.push({
                name: repo.name,
                description: repo.description,
                homepageUrl: repo.homepageUrl,
                stars: repo.stargazerCount,
                forks: repo.forkCount,
                mainLanguage,
            })
        }
    }

    const popularContributions = repoStats
        .sort((a, b) => b.stars - a.stars)
        .slice(0, 5)

    const languageRepoCount = [...languageCount.entries()]
        .sort((a, b) => b[1] - a[1])
        .map(([language, count]) => ({ language, count }))

    const valorPorCommit = 0.02
    const valorPorStar = 0.50
    const valorPorFork = 0.30

    const valorAgregado =
        totalCommits * valorPorCommit +
        totalStars * valorPorStar +
        totalForks * valorPorFork

    const pontosPorCommit = 1
    const pontosPorStar = 5
    const pontosPorFork = 3
    const bonusRepoBemEstruturado = 10

    const pontosTotais =
        totalCommits * pontosPorCommit +
        totalStars * pontosPorStar +
        totalForks * pontosPorFork +
        wellStructuredRepos.length * bonusRepoBemEstruturado

    // Novo cálculo de score por repositório bem estruturado
    const wellStructuredRepoScores = wellStructuredRepos.map(repo => ({
        name: repo.name,
        score:
            repo.stars * pontosPorStar +
            repo.forks * pontosPorFork +
            bonusRepoBemEstruturado,
    })).sort((a, b) => b.score - a.score)

    return {
        totalStars,
        totalForks,
        repoCountExcludingForks: nonForkRepos.length,
        popularContributions,
        wellStructuredRepoScores, // <-- adicionado
        totalCommits,
        valorAgregado: Number(valorAgregado.toFixed(2)),
        pontosTotais,
        languageRepoCount,
    }
}
