import { GitHubStatsResponse, Repository } from "../types"

// calcula commits de forma mais precisa
export function calculateUnifiedCommitCount(data: GitHubStatsResponse, nonForkRepos: Repository[]): number {
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