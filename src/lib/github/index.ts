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
    const wellStructuredRepos: string[] = []

    for (const repo of nonForkRepos) {
        totalStars += repo.stargazerCount || 0
        totalForks += repo.forkCount || 0
        totalCommits += repo.defaultBranchRef?.target?.history?.totalCount || 0

        // Linguagem principal
        const mainLanguage = repo.languages?.nodes?.[0]?.name
        if (mainLanguage) {
            languageCount.set(mainLanguage, (languageCount.get(mainLanguage) || 0) + 1)
        }

        repoStats.push({ name: repo.name, stars: repo.stargazerCount })

        if (repo.description && repo.homepageUrl && repo.hasIssuesEnabled) {
            wellStructuredRepos.push(repo.name)
        }
    }

    const top4MostUsedLanguages = [...languageCount.entries()]
        .sort((a, b) => b[1] - a[1])
        .slice(0, 4)
        .map(([lang]) => lang)

    const popularContributions = repoStats
        .sort((a, b) => b.stars - a.stars)
        .slice(0, 5)
        .map(repo => repo.name)

    // Definição de valores fictícios de valor agregado (R$):
    const valorPorCommit = 0.02 // R$ por commit
    const valorPorStar = 0.50   // R$ por estrela
    const valorPorFork = 0.30   // R$ por fork

    // Cálculo do valor agregado total
    const valorAgregado =
        totalCommits * valorPorCommit +
        totalStars * valorPorStar +
        totalForks * valorPorFork

    // Definição de pontuação de esforço (pontos):
    const pontosPorCommit = 1            // 1 ponto por commit
    const pontosPorStar = 5              // 5 pontos por estrela
    const pontosPorFork = 3              // 3 pontos por fork
    const bonusRepoBemEstruturado = 10   // bônus de pontos por repositório bem estruturado

    // Cálculo da pontuação total
    const pontosTotais =
        totalCommits * pontosPorCommit +
        totalStars * pontosPorStar +
        totalForks * pontosPorFork +
        wellStructuredRepos.length * bonusRepoBemEstruturado

    return {
        totalStars,
        totalForks,
        repoCountExcludingForks: nonForkRepos.length,
        top4MostUsedLanguages,
        popularContributions,
        wellStructuredRepos: wellStructuredRepos.slice(0, 4),
        totalCommits,
        valorAgregado: Number(valorAgregado.toFixed(2)), // Valor em R$
        pontosTotais,                                    // Pontos de esforço
    }
}
