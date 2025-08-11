import { Repository } from "../types"

export function calculateLanguageStats(repos: Repository[]) {
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
        .slice(0, 5)
}