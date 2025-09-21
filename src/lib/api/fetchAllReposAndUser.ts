import { graphqlClient } from "./graphqlClient";
import { queryGitHubData } from "./queryGitHubData";
import { GitHubStatsResponse } from "@/lib/types";

type PageInfo = { hasNextPage: boolean; endCursor: string | null };

type GitHubStatsResponseAug = Omit<GitHubStatsResponse, "user"> & {
  user: Omit<GitHubStatsResponse["user"], "repositories"> & {
    repositories: GitHubStatsResponse["user"]["repositories"] & {
      pageInfo: PageInfo;
      totalCount: number;
    };
  };
};

/**
 * Pagina a conexão user.repositories até esgotar (caso >100 repos).
 * Mantém os demais campos (user, contributions, rateLimit) da primeira página.
 */
export async function fetchAllReposAndUser(username: string): Promise<GitHubStatsResponse> {
  const baseVars = {
    login: username,
    aff: ["OWNER", "ORGANIZATION_MEMBER", "COLLABORATOR"],
    ownAff: ["OWNER", "ORGANIZATION_MEMBER", "COLLABORATOR"],
  };

  let after: string | null = null;
  let merged: GitHubStatsResponseAug | null = null;

  do {
    const data: GitHubStatsResponseAug = await graphqlClient.request<GitHubStatsResponseAug>(
      queryGitHubData,
      { ...baseVars, after }
    );

    if (!merged) {
      merged = data;
    } else {
      merged.user.repositories.nodes.push(...data.user.repositories.nodes);
      merged.user.repositories.pageInfo = data.user.repositories.pageInfo;
      merged.user.repositories.totalCount = data.user.repositories.totalCount;
      merged.rateLimit = data.rateLimit;
    }

    after = data.user.repositories.pageInfo?.hasNextPage
      ? data.user.repositories.pageInfo.endCursor
      : null;

  } while (after);

  return merged as unknown as GitHubStatsResponse;
}
