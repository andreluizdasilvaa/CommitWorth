export const SCORING_CONFIG = {
    valorPorCommit: 2,
    valorPorStar: 0.50,
    valorPorFork: 1,
    pontosPorCommit: 1,
    pontosPorStar: 5,
    pontosPorFork: 3,
    bonusRepoBemEstruturado: 10,
} as const

// Constantes para os thresholds dos achievements
export const ACHIEVEMENT_THRESHOLDS = {
    CODE_WARRIOR_COMMITS: 1000,
    CODE_EMPIRE_REPOS: 50,
    GITHUB_ARCHITECT_LANGUAGES: 10,
    GITHUB_STAR_TOTAL: 100,
    GOLDEN_PROJECT_STARS: 500,
    CODE_VETERAN_YEARS: 10,
    GITHUB_OLD_SCHOOL_YEARS: 5,
    STACK_SPECIALIST_SCORE: 70,
    TECH_LEADER_LEVEL: 'Tech Lead',
    SENIOR_LEVEL: 'Senior',
    POLYGLOT_LANGUAGES: 15,
} as const