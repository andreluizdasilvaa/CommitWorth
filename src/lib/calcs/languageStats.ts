import { Repository } from "../types"
import { NON_PROGRAMMING_LANGUAGES } from "@/constants/valuesConfig"

function isProgrammingLanguage(language: string): boolean {
    return !NON_PROGRAMMING_LANGUAGES.has(language)
}

export function calculateLanguageStats(repos: Repository[]) {
    const languageCount = new Map<string, number>()

    repos.forEach(repo => {
        const mainLanguage = repo.primaryLanguage?.name
        if (mainLanguage && isProgrammingLanguage(mainLanguage)) {
            languageCount.set(mainLanguage, (languageCount.get(mainLanguage) ?? 0) + 1)
        }
    })

    return Array.from(languageCount.entries())
        .sort(([, a], [, b]) => b - a)
        .map(([language, count]) => ({ language, count }))
        .slice(0, 5)
}