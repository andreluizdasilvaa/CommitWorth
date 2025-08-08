import { GitHubStatsResponse } from "./getGithubData";

export interface StackAnalysis {
    primaryStack: string;
    seniorityLevel: 'Junior' | 'Pleno' | 'Senior' | 'Tech Lead';
    seniorityScore: number;
    stackExperience: {
        language: string;
        repositories: number;
        totalCommits: number;
        yearOfFirstUse: number;
        yearsOfExperience: number;
        seniorityIndicators: {
            hasComplexProjects: boolean;
            hasCollaborativeProjects: boolean;
            hasWellDocumentedProjects: boolean;
            avgStarsPerRepo: number;
        };
    }[];
    stackSummary: {
        totalLanguages: number;
        primaryLanguagePercentage: number;
        experienceRange: string;
    };
}

// Mapeamento de linguagens para stacks principais
const STACK_MAPPING: Record<string, string> = {
    'JavaScript': 'Frontend/Fullstack',
    'TypeScript': 'Frontend/Fullstack',
    'React': 'Frontend',
    'Vue': 'Frontend',
    'Angular': 'Frontend',
    'Python': 'Backend/Data Science',
    'Java': 'Backend/Enterprise',
    'C#': 'Backend/.NET',
    'Go': 'Backend/Cloud',
    'Rust': 'Systems/Performance',
    'C++': 'Systems/Game Dev',
    'C': 'Systems/Embedded',
    'PHP': 'Backend/Web',
    'Ruby': 'Backend/Web',
    'Swift': 'Mobile/iOS',
    'Kotlin': 'Mobile/Android',
    'Dart': 'Mobile/Flutter',
    'Scala': 'Backend/Big Data',
    'R': 'Data Science',
    'MATLAB': 'Data Science/Engineering',
    'Shell': 'DevOps/Infrastructure',
    'PowerShell': 'DevOps/Windows',
    'Dockerfile': 'DevOps/Containerization',
    'HTML': 'Frontend',
    'CSS': 'Frontend',
    'SCSS': 'Frontend',
    'Less': 'Frontend'
};

// Pesos para diferentes fatores de senioridade
const SENIORITY_WEIGHTS = {
    yearsOfExperience: 0.3,
    repositoryCount: 0.2,
    avgStarsPerRepo: 0.2,
    totalCommits: 0.15,
    complexityIndicators: 0.15
} as const;

function calculateAccountAge(createdAt: string): number {
    try {
        const accountCreated = new Date(createdAt);
        const now = new Date();
        
        if (isNaN(accountCreated.getTime())) {
            return 0;
        }
        
        return (now.getTime() - accountCreated.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
    } catch {
        return 0;
    }
}

function getLanguageFromRepo(repo: any): string[] {
    if (!repo.languages?.nodes) return [];
    return repo.languages.nodes.map((lang: any) => lang.name).filter(Boolean);
}

function calculateFirstUseYear(repos: any[], language: string): number {
    const reposWithLanguage = repos.filter(repo => 
        getLanguageFromRepo(repo).includes(language)
    );
    
    if (reposWithLanguage.length === 0) return new Date().getFullYear();
    
    const earliestRepo = reposWithLanguage.reduce((earliest, current) => {
        const currentDate = new Date(current.createdAt);
        const earliestDate = new Date(earliest.createdAt);
        return currentDate < earliestDate ? current : earliest;
    });
    
    return new Date(earliestRepo.createdAt).getFullYear();
}

function calculateSeniorityIndicators(repos: any[], language: string) {
    const languageRepos = repos.filter(repo => 
        getLanguageFromRepo(repo).includes(language)
    );
    
    if (languageRepos.length === 0) {
        return {
            hasComplexProjects: false,
            hasCollaborativeProjects: false,
            hasWellDocumentedProjects: false,
            avgStarsPerRepo: 0
        };
    }
    
    const totalStars = languageRepos.reduce((sum, repo) => sum + (repo.stargazerCount || 0), 0);
    const avgStarsPerRepo = totalStars / languageRepos.length;
    
    // Projetos complexos: repositórios com muitas estrelas ou contributors
    const hasComplexProjects = languageRepos.some(repo => 
        (repo.stargazerCount || 0) > 10 || 
        (repo.mentionableUsers?.totalCount || 0) > 5
    );
    
    // Projetos colaborativos: repositórios com múltiplos contributors
    const hasCollaborativeProjects = languageRepos.some(repo => 
        (repo.mentionableUsers?.totalCount || 0) > 2
    );
    
    // Projetos bem documentados
    const hasWellDocumentedProjects = languageRepos.some(repo => 
        repo.description && 
        repo.description.length > 50 && 
        (repo.homepageUrl || repo.hasIssuesEnabled)
    );
    
    return {
        hasComplexProjects,
        hasCollaborativeProjects,
        hasWellDocumentedProjects,
        avgStarsPerRepo: Math.round(avgStarsPerRepo * 100) / 100
    };
}

function calculateLanguageCommits(repos: any[], language: string): number {
    const languageRepos = repos.filter(repo => 
        getLanguageFromRepo(repo).includes(language)
    );
    
    return languageRepos.reduce((total, repo) => {
        return total + (repo.defaultBranchRef?.target?.history?.totalCount || 0);
    }, 0);
}

function calculateSeniorityScore(experience: StackAnalysis['stackExperience'][0]): number {
    const {
        yearsOfExperience,
        repositories,
        totalCommits,
        seniorityIndicators
    } = experience;
    
    // Normalizar valores para escala 0-100
    const normalizedYears = Math.min(yearsOfExperience / 8, 1) * 100;
    const normalizedRepos = Math.min(repositories / 20, 1) * 100;
    const normalizedCommits = Math.min(totalCommits / 1000, 1) * 100;
    const normalizedStars = Math.min(seniorityIndicators.avgStarsPerRepo / 10, 1) * 100;
    
    // Indicadores de complexidade
    const complexityScore = (
        (seniorityIndicators.hasComplexProjects ? 25 : 0) +
        (seniorityIndicators.hasCollaborativeProjects ? 25 : 0) +
        (seniorityIndicators.hasWellDocumentedProjects ? 25 : 0) +
        (normalizedStars > 50 ? 25 : 0)
    );
    
    const score = (
        normalizedYears * SENIORITY_WEIGHTS.yearsOfExperience +
        normalizedRepos * SENIORITY_WEIGHTS.repositoryCount +
        normalizedStars * SENIORITY_WEIGHTS.avgStarsPerRepo +
        normalizedCommits * SENIORITY_WEIGHTS.totalCommits +
        complexityScore * SENIORITY_WEIGHTS.complexityIndicators
    );
    
    return Math.round(score);
}

function determineSeniorityLevel(score: number): StackAnalysis['seniorityLevel'] {
    if (score >= 80) return 'Tech Lead';
    if (score >= 60) return 'Senior';
    if (score >= 35) return 'Pleno';
    return 'Junior';
}

export function analyzeStackAndSeniority(data: GitHubStatsResponse): StackAnalysis {
    const repos = data.user.repositories.nodes.filter(repo => !repo.isFork);
    const currentYear = new Date().getFullYear();
    
    // Contar linguagens e seus repositórios
    const languageStats = new Map<string, number>();
    
    repos.forEach(repo => {
        const languages = getLanguageFromRepo(repo);
        languages.forEach(lang => {
            languageStats.set(lang, (languageStats.get(lang) || 0) + 1);
        });
    });
    
    // Criar análise de experiência para cada linguagem
    const stackExperience = Array.from(languageStats.entries())
        .map(([language, repositories]) => {
            const firstUseYear = calculateFirstUseYear(repos, language);
            const yearsOfExperience = Math.max(currentYear - firstUseYear + 1, 1);
            const totalCommits = calculateLanguageCommits(repos, language);
            const seniorityIndicators = calculateSeniorityIndicators(repos, language);
            
            return {
                language,
                repositories,
                totalCommits,
                yearOfFirstUse: firstUseYear,
                yearsOfExperience,
                seniorityIndicators
            };
        })
        .sort((a, b) => b.repositories - a.repositories); // Ordenar por número de repositórios
    
    // Determinar stack principal (linguagem mais usada)
    const primaryLanguage = stackExperience[0]?.language || 'Indefinido';
    const primaryStack = STACK_MAPPING[primaryLanguage] || primaryLanguage;
    
    // Calcular senioridade baseada na linguagem principal
    const primaryExperience = stackExperience[0];
    let seniorityScore = 0;
    let seniorityLevel: StackAnalysis['seniorityLevel'] = 'Junior';
    
    if (primaryExperience) {
        seniorityScore = calculateSeniorityScore(primaryExperience);
        seniorityLevel = determineSeniorityLevel(seniorityScore);
    }
    
    // Calcular resumo da stack
    const totalRepositories = repos.length;
    const primaryLanguageRepos = primaryExperience?.repositories || 0;
    const primaryLanguagePercentage = totalRepositories > 0 
        ? Math.round((primaryLanguageRepos / totalRepositories) * 100) 
        : 0;
    
    const experienceYears = stackExperience.length > 0 
        ? Math.max(...stackExperience.map(exp => exp.yearsOfExperience))
        : 0;
    
    let experienceRange = 'Iniciante';
    if (experienceYears >= 8) experienceRange = 'Muito Experiente (8+ anos)';
    else if (experienceYears >= 5) experienceRange = 'Experiente (5-8 anos)';
    else if (experienceYears >= 3) experienceRange = 'Intermediário (3-5 anos)';
    else if (experienceYears >= 1) experienceRange = 'Iniciante (1-3 anos)';
    
    return {
        primaryStack,
        seniorityLevel,
        seniorityScore,
        stackExperience,
        stackSummary: {
            totalLanguages: stackExperience.length,
            primaryLanguagePercentage,
            experienceRange
        }
    };
}
