import { GitHubStatsResponse } from "../types"

export interface RateLimitInfo {
    limit: number
    remaining: number
    resetAtRelative: string
}

export function formatRateLimitInfo(rateLimit: GitHubStatsResponse['rateLimit']): RateLimitInfo {
    const resetDate = new Date(rateLimit.resetAt)
    const now = new Date()
    
    const secondsUntilReset = Math.max(0, Math.floor((resetDate.getTime() - now.getTime()) / 1000))
    
    return {
        limit: rateLimit.limit,
        remaining: rateLimit.remaining,
        resetAtRelative: secondsUntilReset > 0 
            ? `${Math.floor(secondsUntilReset / 60)}min ${secondsUntilReset % 60}s`
            : 'agora'
    }
}