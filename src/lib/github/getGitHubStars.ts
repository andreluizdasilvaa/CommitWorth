"use client"

export async function getGitHubStars(username: string): Promise<number> {
  let page = 1
  let totalStars = 0
  let hasMore = true

  const perPage = 100
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
  }

  // Se você tiver um token de autenticação do GitHub, adicione aqui
  const token = process.env.GITHUB_TOKEN
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  while (hasMore) {
    const res = await fetch(`https://api.github.com/users/${username}/repos?per_page=${perPage}&page=${page}`, {
      headers,
      next: { revalidate: 3600 }, // cache de 1 hora se estiver usando app router
    })

    if (!res.ok) {
      console.error(`Erro ao buscar repositórios: ${res.status} ${res.statusText}`)
      break
    }

    const repos = await res.json()

    if (!Array.isArray(repos)) {
      console.error("Resposta inválida da API GitHub:", repos)
      break
    }

    totalStars += repos.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0)
    hasMore = repos.length === perPage
    page++
    console.log('passei')
    console.log(res)
  }

  return totalStars
}
