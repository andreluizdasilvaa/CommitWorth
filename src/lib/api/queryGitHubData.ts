import { gql } from "graphql-request";

export const queryGitHubData = gql`
  query getUserStats(
    $login: String!,
    $aff: [RepositoryAffiliation!],
    $ownAff: [RepositoryAffiliation!],
    $after: String
  ) {
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

      repositories(
        first: 100,
        after: $after,
        affiliations: $aff,
        ownerAffiliations: $ownAff,
        orderBy: { field: UPDATED_AT, direction: DESC }
      ) {
        totalCount
        pageInfo {
          hasNextPage
          endCursor
        }
        nodes {
          name
          stargazerCount
          forkCount
          isFork
          isPrivate
          owner { login }
          description
          homepageUrl
          hasIssuesEnabled
          createdAt
          languages(first: 10) {
            nodes { name }
          }
          defaultBranchRef {
            target {
              ... on Commit {
                history { totalCount }
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
          repository { name }
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