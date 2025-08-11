import { RateLimitInfo } from "./calcs/formatRateLimitInfo"
import { StackAnalysis } from "./calcs/stackAnalysis"

export interface UserProps {
  login: string
  name: string
  avatar_url: string
}

export interface GitHubStatsResponse {
    rateLimit: {
        limit: number
        remaining: number
        resetAt: string
    }
    user: {
        id: string
        login: string
        name: string
        avatarUrl: string
        createdAt: string 
        repositories: {
            nodes: {
                name: string
                stargazerCount: number
                forkCount: number
                isFork: boolean
                description: string | null
                homepageUrl: string | null
                hasIssuesEnabled: boolean
                createdAt: string 
                languages: {
                    nodes: {
                        name: string
                    }[]
                }
                defaultBranchRef: {
                    target: {
                        history: {
                            totalCount: number
                        }
                    }
                } | null
                mentionableUsers: {
                    totalCount: number
                }
            }[]
        }
        contributionsCollection: {  
            contributionCalendar: {
                totalContributions: number
                weeks: {
                    contributionDays: {
                        contributionCount: number
                        date: string
                    }[]
                }[]
            }
            commitContributionsByRepository: {
                repository: {
                    name: string
                }
                contributions: {
                    totalCount: number
                    nodes: {
                        occurredAt: string
                        commitCount: number
                    }[]
                }
            }[]
        }
    }
}

export interface Repository {
    name: string
    stargazerCount: number
    forkCount: number
    isFork: boolean
    description: string | null
    homepageUrl: string | null
    hasIssuesEnabled: boolean
    createdAt: string 
    languages: {
        nodes: {
            name: string
        }[]
    }
    defaultBranchRef: {
        target: {
            history: {
                totalCount: number
            }
        }
    } | null
    mentionableUsers: {  
        totalCount: number
    }
}

export interface WellStructuredRepo {
    name: string
    description: string | null
    homepageUrl: string | null
    stars: number
    forks: number
    mainLanguage?: string
}

export interface GitHubCompleteData {
    userData: UserProps
    totalStars: number
    totalForks: number
    repoCountExcludingForks: number
    popularContributions: {
        name: string
        stars: number
    }[]
    wellStructuredRepoScores: {
        name: string
        score: number
    }[]
    totalCommits: number
    valorAgregado: number
    pontosTotais: number
    languageRepoCount: {
        language: string
        count: number
    }[]
    rateLimitInfo: RateLimitInfo
    achievements: Achievement[]
    stackAnalysis: StackAnalysis
}

export interface Achievement {
    id: string;
    name: string;
    description: string;
    completed: boolean;
    progress?: number;
    maxProgress?: number;
}

export interface PreCalculatedData {
    totalCommits: number;
    totalStars: number;
    nonForkRepos: any[];
    stackAnalysis?: StackAnalysis;
}