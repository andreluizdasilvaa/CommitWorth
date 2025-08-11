import { Repository, WellStructuredRepo } from "../types";

export function identifyWellStructuredRepos(repos: Repository[]): WellStructuredRepo[] {
    return repos
        .filter(repo => repo.description && repo.description.length > 50 && repo.homepageUrl && repo.hasIssuesEnabled)
        .map(repo => ({
            name: repo.name,
            description: repo.description,
            homepageUrl: repo.homepageUrl,
            stars: repo.stargazerCount ?? 0,
            forks: repo.forkCount ?? 0,
            mainLanguage: repo.languages?.nodes?.[0]?.name,
        }))
        .slice(0, 5)
}