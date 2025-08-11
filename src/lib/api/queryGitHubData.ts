import { gql } from "graphql-request";

export const queryGitHubData = gql`
    query getUserStats($login: String!) {
        rateLimit {
            limit
            remaining
            resetAt
        }
        user(login: $login) {
            id
            login
            name
            avatarUrl
            createdAt
            repositories(first: 100, ownerAffiliations: OWNER) {
                nodes {
                    name
                    stargazerCount
                    forkCount
                    isFork
                    description
                    homepageUrl
                    hasIssuesEnabled
                    createdAt
                    languages(first: 10) {
                        nodes {
                            name
                        }
                    }
                    defaultBranchRef {
                        target {
                            ... on Commit {
                                history {
                                    totalCount
                                }
                            }
                        }
                    }
                    mentionableUsers(first: 10) {
                        totalCount
                    }
                }
            }
            contributionsCollection {
                contributionCalendar {
                    totalContributions
                    weeks {
                        contributionDays {
                            contributionCount
                            date
                        }
                    }
                }
                commitContributionsByRepository {
                    repository {
                        name
                    }
                    contributions(first: 100) {
                        totalCount
                        nodes {
                            occurredAt
                            commitCount
                        }
                    }
                }
            }
        }
    }
`