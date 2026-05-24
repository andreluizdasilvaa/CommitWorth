import { gql } from "graphql-request";

export function buildQueryGitHubData(): ReturnType<typeof gql> {
    const currentYear = new Date().getFullYear();
    const yearsBack = 5; // 5 anos de histórico
    
    // Gerar aliases dinâmicos para cada ano
    let yearAliases = '';
    for (let i = 0; i < yearsBack; i++) {
        const year = currentYear - i;
        const aliasName = `y${year}`;
        const fromDate = `${year}-01-01T00:00:00Z`;
        const toDate = `${year}-12-31T23:59:59Z`;
        
        yearAliases += `
        ${aliasName}: contributionsCollection(from: "${fromDate}", to: "${toDate}") {
            contributionCalendar {
                totalContributions
            }
        }`;
    }

    return gql`
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
                repositories(first: 100, orderBy: {field: CREATED_AT, direction: DESC}, ownerAffiliations: OWNER, isFork: false) {
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
                        primaryLanguage {
                            name
                        }
                    }
                }
                ${yearAliases}
            }
        }
    `;
}