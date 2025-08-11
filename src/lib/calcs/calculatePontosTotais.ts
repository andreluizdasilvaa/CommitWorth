import { SCORING_CONFIG } from "@/constants/valuesConfig"

export function calculatePontosTotais(
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