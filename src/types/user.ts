export interface UserProps {
  login: string
  name: string
  avatar_url: string
}

export interface RequestReposProps {
    watchers_count: number;
    stargazers_count: number;
    forks_count: number;
    language: string | null;
    name: string;
    fork: boolean;
    owner: OwnerProps
}

interface OwnerProps {
    login: string;
    avatar_url: string;
}