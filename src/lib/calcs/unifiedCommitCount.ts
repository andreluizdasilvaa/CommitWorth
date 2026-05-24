import { GitHubStatsResponse } from "../types"

// Calcula commits somando contribuições
export function calculateUnifiedCommitCount(data: GitHubStatsResponse): number {
    const currentYear = new Date().getFullYear();
    const yearsBack = 5;
    let totalCommits = 0;
    
    // Iterar de currentYear até currentYear
    for (let i = 0; i < yearsBack; i++) {
        const year = currentYear - i;
        const aliasKey = `y${year}` as const;
        
        // Acessar o campo dinâmico y${year}
        const yearData = (data.user as any)[aliasKey];
        const yearContributions = yearData?.contributionCalendar?.totalContributions ?? 0;
        totalCommits += yearContributions;
    }
    
    return totalCommits;
}