import { UserProps } from "@/types/user"
import { Metadata } from "next";

interface MetadataProps {
    userData: UserProps;
    totalStars: number;
    totalCommits: number;
    valorAgregado: number;
}

export function GenerateMetadataModel({ totalCommits, totalStars, userData, valorAgregado }:MetadataProps): Metadata {
    try {
        let title = `${userData.name || userData.login} | CommitWorth Dashboard`
        let description = `Dashboard completo do GitHub de ${userData.name || userData.login}: ${totalStars} ⭐ estrelas, ${totalCommits} commits, R$ ${valorAgregado.toLocaleString('pt-BR')} em valor agregado. Gere seu card personalizado!`
        
        return {
            title,
            description,
            keywords: [
                'commitworth',
                'github dashboard',
                'estatísticas github',
                'github stats',
                'github card',
                'card github personalizado',
                'valor desenvolvedor',
                'pontos github',
                userData.login,
                userData.name,
                'commits github',
                'repositórios github',
                'estrelas github',
                'dashboard desenvolvedor',
                'métricas github'
            ],
            authors: [{ name: userData.name || userData.login }],
            creator: userData.name || userData.login,
            publisher: 'CommitWorth',

            openGraph: {
                title: `🚀 ${userData.name || userData.login} no CommitWorth`,
                description: `💰 R$ ${valorAgregado.toLocaleString('pt-BR')} em valor | ⭐ ${totalStars} estrelas | 💻 ${totalCommits} commits | Crie seu card GitHub personalizado agora!`,
                url: `${process.env.NEXT_PUBLIC_HOST_URL}/dashboard/${userData.login}`,
                siteName: 'CommitWorth - Dashboard',
                images: [
                    {
                        url: userData.avatar_url,
                        width: 400,
                        height: 400,
                        alt: `${userData.name || userData.login} - Dashboard CommitWorth`,
                    },
                ],
                locale: 'pt_BR',
                type: 'website'
            },
            
            twitter: {
                card: 'summary_large_image',
                title: `${userData.name || userData.login} | CommitWorth 🚀`,
                description: `Dashboard completo: R$ ${valorAgregado.toLocaleString('pt-BR')} em valor agregado, ${totalStars} ⭐ e ${totalCommits} commits! Crie seu card personalizado 👇`,
                creator: '@AndreVsemR',
                images: [userData.avatar_url],
            },
            
            robots: {
                index: true,
                follow: true,
                googleBot: {
                    index: true,
                    follow: true,
                    'max-video-preview': -1,
                    'max-image-preview': 'large',
                    'max-snippet': -1,
                },
            },
            
            category: 'Technology',
            applicationName: 'CommitWorth',
            
            other: {
                'application/ld+json': JSON.stringify({
                    '@context': 'https://schema.org',
                    '@type': 'WebApplication',
                    name: 'CommitWorth',
                    applicationCategory: 'DeveloperApplication',
                    description: 'Dashboard completo para desenvolvedores visualizarem suas estatísticas do GitHub e gerarem cards personalizados',
                    url: `${process.env.NEXT_PUBLIC_HOST_URL}/dashboard/${userData.login}`,
                    author: {
                        '@type': 'Person',
                        name: userData.name || userData.login,
                        identifier: userData.login,
                        image: userData.avatar_url,
                        url: `https://github.com/${userData.login}`,
                        sameAs: `https://github.com/${userData.login}`
                    },
                    offers: {
                        '@type': 'Offer',
                        price: '0',
                        priceCurrency: 'BRL',
                        description: 'Dashboard gratuito do GitHub com geração de cards personalizados'
                    }
                })
            }
        }
    } catch (error) {
        return {
            title: `Dashboard GitHub - CommitWorth`,
            description: 'Visualize suas estatísticas completas do GitHub, calcule seu valor como desenvolvedor e gere cards personalizados para compartilhar',
            keywords: ['commitworth', 'github dashboard', 'github stats', 'github card'],
            robots: {
                index: false,
                follow: false,
            },
        }
    }
}
