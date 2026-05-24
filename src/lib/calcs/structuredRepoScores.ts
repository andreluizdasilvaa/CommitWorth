import { SCORING_CONFIG } from "@/constants/valuesConfig"
import { WellStructuredRepo } from "../types"

interface RepoScore {
    name: string
    score: number
}

export function calcStructuredRepoScores(wellStructuredRepos: WellStructuredRepo[]): RepoScore[] {
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