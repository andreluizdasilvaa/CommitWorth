import { getGitHubStatsGraphQL } from "@/lib/getGithubData"
import { getGitHubDataFromCache, setGitHubDataInCache } from "@/lib/githubCache"
import { GitHubCompleteData } from "./types"
import { redirect, notFound } from "next/navigation"
import { cache } from "react"

// Função com cache para buscar TODOS os dados com UMA única requisição
const getCompleteGitHubData = cache(async (user: string): Promise<GitHubCompleteData> => {
    try {
        // Verifica se os dados já estão em cache pelo userName do usuário
        const cachedData = await getGitHubDataFromCache(user)
        
        if (cachedData) {
            return cachedData
        }

        // Se não estiverem em cache, faz a requisição e armazena no cache
        const data = await getGitHubStatsGraphQL(user)
        await setGitHubDataInCache(user, data)

        return data

    } catch (error: any) {
        if (error?.response?.errors) {
            const errors = error.response.errors
            // usuário não encontrado
            if (errors.some((err: any) => err.type === 'NOT_FOUND')) {
                notFound()
            }
        }

        if (error?.response?.status === 403) {
            redirect('/')
        }
        
        throw error
    }
})

export default getCompleteGitHubData