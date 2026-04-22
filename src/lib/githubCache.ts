import { Redis } from "@upstash/redis"
import { GitHubCompleteData } from '@/lib/types'
import { gzipSync, gunzipSync } from 'zlib'

export const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

const CACHE_EXPIRATION_TIME = 2 * 60 * 60    // Tempo de expiração do cache em segundos (2 horas)
const CACHE_KEY_PREFIX = 'gh:'           // Prefixo para as chaves no Redis

// Gera a chave Redis para um usuário
function getCacheKey(userName: string): string {
    return `${CACHE_KEY_PREFIX}${userName.toLowerCase()}`
}

// Função para recuperar dados do cache Redis para um usuário específico
export async function getGitHubDataFromCache(userName: string): Promise<GitHubCompleteData | null> {
    try {
        const cacheKey = getCacheKey(userName)
        
        // Recupera do Redis como string (Base64)
        const cachedString = await redis.get(cacheKey) as string | null
        
        if (!cachedString) {
            return null
        }

        // Converte de Base64 para Buffer
        const cachedBuffer = Buffer.from(cachedString, 'base64')
        
        // Descomprime os dados com gzip
        const decompressed = gunzipSync(cachedBuffer)
        const jsonString = decompressed.toString('utf-8')
        
        // Converte JSON para objeto
        const data: GitHubCompleteData = JSON.parse(jsonString)
        
        return data
    } catch (error) {
        console.error(`Erro ao recuperar cache para ${userName}:`, error)
        return null
    }
}

// Armazena dados no cache Redis para um usuário específico (otimizado com compressão gzip)
export async function setGitHubDataInCache(userName: string, data: GitHubCompleteData): Promise<void> {
    try {
        const cacheKey = getCacheKey(userName)
        
        // Converte objeto para JSON string
        const jsonString = JSON.stringify(data)
        
        // Comprime os dados com gzip
        const compressed = gzipSync(jsonString)
        
        // Armazena no Redis com expiração
        await redis.setex(cacheKey, CACHE_EXPIRATION_TIME, compressed)
    } catch (error) {
        console.error(`Erro ao salvar cache para ${userName}:`, error)
    }
}

// Limpa o cache para um usuário específico
export async function clearGitHubDataCache(userName: string): Promise<void> {
    try {
        const cacheKey = getCacheKey(userName)
        await redis.del(cacheKey)
    } catch (error) {
        console.error(`Erro ao limpar cache para ${userName}:`, error)
    }
}

// Limpa todo o cache (todos os usuários)
export async function clearAllGitHubDataCache(): Promise<void> {
    try {
        // Recupera todas as chaves com o prefixo
        const keys = await redis.keys(`${CACHE_KEY_PREFIX}*`)
        
        if (keys.length > 0) {
            await redis.del(...keys)
        }
    } catch (error) {
        console.error('Erro ao limpar todo o cache:', error)
    }
}

// Retorna informações sobre o cache no Redis
export async function getCacheInfo(): Promise<{
    size: number
    users: string[]
    expirationTimeSeconds: number
}> {
    try {
        const keys = await redis.keys(`${CACHE_KEY_PREFIX}*`)
        const users = keys.map(key => key.replace(CACHE_KEY_PREFIX, ''))
        
        return {
            size: keys.length,
            users,
            expirationTimeSeconds: CACHE_EXPIRATION_TIME
        }
    } catch (error) {
        console.error('Erro ao obter informações do cache:', error)
        return {
            size: 0,
            users: [],
            expirationTimeSeconds: CACHE_EXPIRATION_TIME
        }
    }
}
