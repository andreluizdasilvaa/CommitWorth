import { GitHubStatsResponse, Repository } from "../types"
import { calculateUnifiedCommitCount } from "./unifiedCommitCount"

export function calcCommitStarsForks(data: GitHubStatsResponse, repos: Repository[]) {
    const totalStars = repos.reduce((total, repo) => total + (repo.stargazerCount ?? 0), 0)
    const totalForks = repos.reduce((total, repo) => total + (repo.forkCount ?? 0), 0)
    const totalCommits = calculateUnifiedCommitCount(data)

    return { totalCommits, totalStars, totalForks }
}