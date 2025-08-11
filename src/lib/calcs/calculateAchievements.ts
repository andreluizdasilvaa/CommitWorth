import { ACHIEVEMENT_THRESHOLDS } from "@/constants/valuesConfig";
import { Achievement, GitHubStatsResponse, PreCalculatedData } from "../types";

function calculateAccountAge(createdAt: string): number {
    try {
        const accountCreated = new Date(createdAt)
        const now = new Date()
        
        // Validar se a data é válida
        if (isNaN(accountCreated.getTime())) {
            console.warn('Data de criação da conta inválida:', createdAt)
            return 0
        }
        
        return (now.getTime() - accountCreated.getTime()) / (1000 * 60 * 60 * 24 * 365.25)
    } catch (error) {
        console.warn('Erro ao calcular idade da conta:', error)
        return 0
    }
}

function getUniqueLanguages(repos: any[]): Set<string> {
    const uniqueLanguages = new Set<string>()
    
    repos.forEach(repo => {
        if (repo.languages?.nodes) {
            repo.languages.nodes.forEach((lang: { name: string }) => {
                if (lang.name) {
                    uniqueLanguages.add(lang.name)
                }
            })
        }
    })

    return uniqueLanguages
}

function getMaxStarsInRepo(repos: any[]): number {
    if (repos.length === 0) return 0

    return Math.max(...repos.map(repo => repo.stargazerCount ?? 0))
}

export function calculateAchievements(
    data: GitHubStatsResponse,
    preCalculated?: PreCalculatedData
): Achievement[] {
    const achievements: Achievement[] = []
    
    // Dados do usuário e repositórios
    const user = data.user
    const repos = preCalculated?.nonForkRepos ?? user.repositories.nodes.filter(repo => !repo.isFork)
    
    // Usar dados pré-calculados quando disponíveis para manter consistência
    const totalCommits = preCalculated?.totalCommits ?? repos.reduce((total, repo) => {
        return total + (repo.defaultBranchRef?.target?.history?.totalCount ?? 0)
    }, 0)
    
    const totalStars = preCalculated?.totalStars ?? repos.reduce((total, repo) => {
        return total + (repo.stargazerCount ?? 0)
    }, 0)
    
    // Calcular estatísticas derivadas
    const uniqueLanguages = getUniqueLanguages(repos)
    const maxStarsInRepo = getMaxStarsInRepo(repos)
    const accountAgeYears = user.createdAt ? calculateAccountAge(user.createdAt) : 0
    
    // Code Warrior (1000+ commits)
    achievements.push({
        id: "code_warrior",
        name: "Code Warrior",
        description: "Fez mais de 1.000 commits no total",
        completed: totalCommits >= ACHIEVEMENT_THRESHOLDS.CODE_WARRIOR_COMMITS,
        progress: Math.min(totalCommits, ACHIEVEMENT_THRESHOLDS.CODE_WARRIOR_COMMITS),
        maxProgress: ACHIEVEMENT_THRESHOLDS.CODE_WARRIOR_COMMITS
    })
    
    // Império do Código (50+ repositórios)
    achievements.push({
        id: "code_empire",
        name: "Império do Código",
        description: "Criou mais de 50 repositórios públicos",
        completed: repos.length >= ACHIEVEMENT_THRESHOLDS.CODE_EMPIRE_REPOS,
        progress: Math.min(repos.length, ACHIEVEMENT_THRESHOLDS.CODE_EMPIRE_REPOS),
        maxProgress: ACHIEVEMENT_THRESHOLDS.CODE_EMPIRE_REPOS
    })
    
    // Arquiteto do GitHub (10+ linguagens)
    const languageCount = uniqueLanguages.size
    achievements.push({
        id: "github_architect",
        name: "Arquiteto do GitHub",
        description: "Criou repositórios com 10+ linguagens diferentes",
        completed: languageCount >= ACHIEVEMENT_THRESHOLDS.GITHUB_ARCHITECT_LANGUAGES,
        progress: Math.min(languageCount, ACHIEVEMENT_THRESHOLDS.GITHUB_ARCHITECT_LANGUAGES),
        maxProgress: ACHIEVEMENT_THRESHOLDS.GITHUB_ARCHITECT_LANGUAGES
    })
    
    // Estrela do GitHub (100+ estrelas total)
    achievements.push({
        id: "github_star",
        name: "Estrela do GitHub",
        description: "Recebeu mais de 100 estrelas no total",
        completed: totalStars >= ACHIEVEMENT_THRESHOLDS.GITHUB_STAR_TOTAL,
        progress: Math.min(totalStars, ACHIEVEMENT_THRESHOLDS.GITHUB_STAR_TOTAL),
        maxProgress: ACHIEVEMENT_THRESHOLDS.GITHUB_STAR_TOTAL
    })
    
    // Projeto de Ouro (500+ estrelas em um repo)
    achievements.push({
        id: "golden_project",
        name: "Projeto de Ouro",
        description: "Tem um repositório com 500+ estrelas",
        completed: maxStarsInRepo >= ACHIEVEMENT_THRESHOLDS.GOLDEN_PROJECT_STARS,
        progress: Math.min(maxStarsInRepo, ACHIEVEMENT_THRESHOLDS.GOLDEN_PROJECT_STARS),
        maxProgress: ACHIEVEMENT_THRESHOLDS.GOLDEN_PROJECT_STARS
    })
    
    // Veterano do Código (10+ anos no GitHub)
    const veteranProgress = Math.floor(Math.min(accountAgeYears, ACHIEVEMENT_THRESHOLDS.CODE_VETERAN_YEARS))
    achievements.push({
        id: "code_veteran",
        name: "Veterano do Código",
        description: "Mais de 10 anos de GitHub",
        completed: accountAgeYears >= ACHIEVEMENT_THRESHOLDS.CODE_VETERAN_YEARS,
        progress: veteranProgress,
        maxProgress: ACHIEVEMENT_THRESHOLDS.CODE_VETERAN_YEARS
    })
    
    // GitHub Old School (5+ anos no GitHub)
    const oldSchoolProgress = Math.floor(Math.min(accountAgeYears, ACHIEVEMENT_THRESHOLDS.GITHUB_OLD_SCHOOL_YEARS))
    achievements.push({
        id: "github_old_school",
        name: "GitHub Old School",
        description: "Conta criada há mais de 5 anos",
        completed: accountAgeYears >= ACHIEVEMENT_THRESHOLDS.GITHUB_OLD_SCHOOL_YEARS,
        progress: oldSchoolProgress,
        maxProgress: ACHIEVEMENT_THRESHOLDS.GITHUB_OLD_SCHOOL_YEARS
    })

    // Achievements relacionados à Stack Analysis
    if (preCalculated?.stackAnalysis) {
        const stackAnalysis = preCalculated.stackAnalysis

        // Stack Specialist (Score 70+)
        achievements.push({
            id: "stack_specialist",
            name: "Especialista de Stack",
            description: "Atingiu senioridade avançada na sua stack principal",
            completed: stackAnalysis.seniorityScore >= ACHIEVEMENT_THRESHOLDS.STACK_SPECIALIST_SCORE,
            progress: Math.min(stackAnalysis.seniorityScore, ACHIEVEMENT_THRESHOLDS.STACK_SPECIALIST_SCORE),
            maxProgress: ACHIEVEMENT_THRESHOLDS.STACK_SPECIALIST_SCORE
        })

        // Tech Leader
        achievements.push({
            id: "tech_leader",
            name: "Líder Técnico",
            description: "Alcançou o nível Tech Lead de senioridade",
            completed: stackAnalysis.seniorityLevel === ACHIEVEMENT_THRESHOLDS.TECH_LEADER_LEVEL,
            progress: stackAnalysis.seniorityLevel === ACHIEVEMENT_THRESHOLDS.TECH_LEADER_LEVEL ? 1 : 0,
            maxProgress: 1
        })

        // Senior Developer
        achievements.push({
            id: "senior_developer",
            name: "Desenvolvedor Sênior",
            description: "Atingiu o nível Sênior ou superior",
            completed: ['Senior', 'Tech Lead'].includes(stackAnalysis.seniorityLevel),
            progress: ['Senior', 'Tech Lead'].includes(stackAnalysis.seniorityLevel) ? 1 : 0,
            maxProgress: 1
        })

        // Polyglot (15+ linguagens)
        achievements.push({
            id: "polyglot",
            name: "Poliglota",
            description: "Domina 15 ou mais linguagens de programação",
            completed: stackAnalysis.stackSummary.totalLanguages >= ACHIEVEMENT_THRESHOLDS.POLYGLOT_LANGUAGES,
            progress: Math.min(stackAnalysis.stackSummary.totalLanguages, ACHIEVEMENT_THRESHOLDS.POLYGLOT_LANGUAGES),
            maxProgress: ACHIEVEMENT_THRESHOLDS.POLYGLOT_LANGUAGES
        })
    }
    
    return achievements
}