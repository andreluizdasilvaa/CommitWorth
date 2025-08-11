import { SCORING_CONFIG } from "@/constants/valuesConfig"

export function calculateValorAgregado(totalCommits: number, totalStars: number, totalForks: number): number {
    const { valorPorCommit, valorPorStar, valorPorFork } = SCORING_CONFIG
    
    const valorAgregado =
        totalCommits * valorPorCommit +
        totalStars * valorPorStar +
        totalForks * valorPorFork

    return Math.round(valorAgregado * 100) / 100 
}