import { Repository } from "../types";

export function getPopularContributions(repos: Repository[]) {
    return repos
        .map(repo => ({ name: repo.name, stars: repo.stargazerCount ?? 0 }))
        .sort((a, b) => b.stars - a.stars)
        .slice(0, 5)
}