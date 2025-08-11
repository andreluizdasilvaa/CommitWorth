import { Achievement } from "@/lib/types"; 
import { UserProps } from "@/lib/types"
import { Metadata } from "next";

interface MetadataProps {
    userData: UserProps;
    totalStars: number;
    totalCommits: number;
    valorAgregado: number;
    totalRepos?: number;
    totalPoints?: number;
    achievements?: Achievement[];
}

export function GenerateMetadataModel({
    totalCommits,
    totalStars,
    userData,
    valorAgregado,
    totalRepos = 0,
    totalPoints = 0,
    achievements = []
}: MetadataProps): Metadata {
    try {
        const userName = userData.name || userData.login;
        const formattedValue = valorAgregado.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });
        const formattedPoints = totalPoints.toLocaleString('pt-BR');

        const title = `${userName} - Dashboard CommitWorth | ${formattedValue} em Valor Agregado`;

        const description = `🚀 Dashboard completo do GitHub de ${userName}: ${formattedValue} em valor agregado, ${totalCommits.toLocaleString('pt-BR')} commits, ${totalStars} ⭐ estrelas, ${totalRepos} repositórios. ${achievements.length} distintivos conquistados. Gere seu card personalizado e compartilhe!`;

        // Keywords baseadas nos dados do usuário
        const dynamicKeywords = [
            `${userData.login} github`,
            `${userName} desenvolvedor`,
            `dashboard ${userData.login}`,

            // Keywords baseadas em conquistas
            ...(totalStars > 100 ? ['github star developer', 'desenvolvedor estrela github'] : []),
            ...(totalCommits > 1000 ? ['code warrior', 'guerreiro do código'] : []),
            ...(totalRepos > 50 ? ['prolific developer', 'desenvolvedor prolífico'] : []),

            // keywords específicas
            `${userName} commits github`,
            `${userName} repositórios`,
            `estatísticas github ${userData.login}`,
            `portfolio ${userName} github`,
        ];

        const allKeywords = [
            // Keywords principais do CommitWorth
            'commitworth',
            'github dashboard',
            'github stats',
            'estatísticas github',
            'github card',
            'card github personalizado',
            'valor desenvolvedor',
            'pontos github',
            'dashboard desenvolvedor',
            'métricas github',
            'github analytics',
            'commits calculator',
            'github achievements',
            'distintivos github',

            // Keywords específicas do usuário
            userData.login,
            userName,
            'commits github',
            'repositórios github',
            'estrelas github',
            'portfolio desenvolvedor',

            // Keywords dinâmicas
            ...dynamicKeywords,

            // Keywords de localização
            'desenvolvedor brasil',
            'programador brasileiro',
            'github brasil'
        ].filter(Boolean);

        const achievementsSchema = {
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: `Distintivos de ${userName}`,
            description: `Conquistas e distintivos obtidos por ${userName} no GitHub`,
            numberOfItems: achievements.length,
            itemListElement: achievements.map((achievement, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                item: {
                    '@type': 'Achievement',
                    name: achievement,
                    description: `Distintivo conquistado por ${userName} no CommitWorth`,
                    achievementType: 'Badge'
                }
            }))
        };

        const faqSchema = {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
                {
                    '@type': 'Question',
                    name: 'Como é calculado o valor agregado no CommitWorth?',
                    acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'O valor agregado é calculado com base em: R$ 0,02 por commit, R$ 0,50 por estrela e R$ 0,30 por fork dos seus repositórios públicos do GitHub.'
                    }
                },
                {
                    '@type': 'Question',
                    name: 'O que são os distintivos de conquista?',
                    acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'Distintivos são conquistas baseadas na sua atividade: Code Warrior (1000+ commits), Estrela do GitHub (100+ estrelas), Projeto de Ouro (500+ estrelas em um repo), entre outros.'
                    }
                },
                {
                    '@type': 'Question',
                    name: 'Posso compartilhar meu card do CommitWorth?',
                    acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'Sim! Você pode gerar um card personalizado com suas estatísticas e compartilhar diretamente no LinkedIn ou outras rede sociais.'
                    }
                }
            ]
        };

        const enhancedBreadcrumb = {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
                {
                    '@type': 'ListItem',
                    position: 1,
                    name: 'CommitWorth',
                    item: {
                        '@type': 'WebPage',
                        '@id': process.env.NEXT_PUBLIC_HOST_URL,
                        name: 'CommitWorth - Home'
                    }
                },
                {
                    '@type': 'ListItem',
                    position: 2,
                    name: 'Dashboard',
                    item: {
                        '@type': 'CollectionPage',
                        '@id': `${process.env.NEXT_PUBLIC_HOST_URL}/dashboard`,
                        name: 'Dashboards de Desenvolvedores'
                    }
                },
                {
                    '@type': 'ListItem',
                    position: 3,
                    name: userName,
                    item: {
                        '@type': 'ProfilePage',
                        '@id': `${process.env.NEXT_PUBLIC_HOST_URL}/dashboard/${userData.login}`,
                        name: `Dashboard de ${userName}`,
                        about: {
                            '@type': 'Person',
                            name: userName,
                            identifier: userData.login
                        }
                    }
                }
            ]
        };

        return {
            title,
            description,
            keywords: allKeywords,
            authors: [{ name: userName }],
            creator: userName,
            publisher: 'CommitWorth',
            category: 'Technology',
            applicationName: 'CommitWorth',

            openGraph: {
                title: `🚀 ${userData.name || userData.login} no CommitWorth`,
                description: `💰 R$ ${valorAgregado.toLocaleString('pt-BR')} em valor agregado com suas contribuições | 🪙 ${formattedPoints} pontos | 💻 ${totalCommits} commits | Crie seu card GitHub personalizado agora!`,
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
                title: `${userName} no CommitWorth 🚀💰`,
                description: `Dashboard GitHub: ${formattedValue} em valor | 🪙 ${formattedPoints} pontos | 💻 ${totalCommits.toLocaleString('pt-BR')} commits | 🏆 ${achievements.length} distintivos | Crie seu card personalizado!`,
                creator: '@AndreVsemR',
                site: '@AndreVsemR',
                images: [userData.avatar_url],
            },

            robots: {
                index: true,
                follow: true,
                noarchive: false,
                nosnippet: false,
                noimageindex: false,
                googleBot: {
                    index: true,
                    follow: true,
                    'max-video-preview': -1,
                    'max-image-preview': 'large',
                    'max-snippet': -1,
                },
            },

            alternates: {
                canonical: `${process.env.NEXT_PUBLIC_HOST_URL}/dashboard/${userData.login}`,
                languages: {
                    'pt-BR': `${process.env.NEXT_PUBLIC_HOST_URL}/dashboard/${userData.login}`,
                    'x-default': `${process.env.NEXT_PUBLIC_HOST_URL}/dashboard/${userData.login}`
                }
            },

            other: {
                // Rich Snippets Schema.org otimizado
                'application/ld+json': JSON.stringify([
                    {
                        '@context': 'https://schema.org',
                        '@type': 'ProfilePage',
                        mainEntity: {
                            '@type': 'Person',
                            '@id': `https://github.com/${userData.login}`,
                            name: userName,
                            alternateName: userData.login,
                            identifier: userData.login,
                            image: userData.avatar_url,
                            url: `https://github.com/${userData.login}`,
                            sameAs: [
                                `https://github.com/${userData.login}`,
                                `${process.env.NEXT_PUBLIC_HOST_URL}/dashboard/${userData.login}`
                            ],
                            jobTitle: 'Desenvolvedor de Software',
                            description: `Desenvolvedor com ${totalCommits.toLocaleString('pt-BR')} commits, ${totalStars} estrelas e ${formattedValue} em valor agregado no GitHub`,
                            award: achievements.map(achievement => ({
                                '@type': 'DefinedTerm',
                                name: achievement
                            }))
                        },
                        url: `${process.env.NEXT_PUBLIC_HOST_URL}/dashboard/${userData.login}`,
                        name: `Dashboard GitHub de ${userName}`,
                        description: description
                    },
                    {
                        '@context': 'https://schema.org',
                        '@type': 'WebApplication',
                        name: 'CommitWorth Dashboard',
                        applicationCategory: 'DeveloperApplication',
                        operatingSystem: 'Web Browser',
                        description: 'Dashboard personalizado do GitHub com análise completa de commits, valor agregado e distintivos de conquista',
                        url: `${process.env.NEXT_PUBLIC_HOST_URL}/dashboard/${userData.login}`,
                        author: {
                            '@type': 'Person',
                            name: 'André Luiz',
                            url: 'https://github.com/andreluizdasilvaa'
                        },
                        about: {
                            '@type': 'Person',
                            name: userName,
                            identifier: userData.login,
                            image: userData.avatar_url
                        },
                        offers: {
                            '@type': 'Offer',
                            price: '0',
                            priceCurrency: 'BRL',
                            description: `Dashboard personalizado gratuito para ${userName} com análise completa do GitHub`
                        },
                        featureList: [
                            `${totalCommits.toLocaleString('pt-BR')} commits analisados`,
                            `${totalStars} estrelas contabilizadas`,
                            `${formattedValue} em valor agregado calculado`,
                            `${achievements.length} distintivos de conquista`,
                            'Geração de card personalizado',
                            'Análise de linguagens de programação'
                        ],
                        audience: {
                            '@type': 'Audience',
                            audienceType: 'Desenvolvedores de Software'
                        }
                    },
                    {
                        '@context': 'https://schema.org',
                        '@type': 'BreadcrumbList',
                        itemListElement: [
                            {
                                '@type': 'ListItem',
                                position: 1,
                                name: 'CommitWorth',
                                item: process.env.NEXT_PUBLIC_HOST_URL
                            },
                            {
                                '@type': 'ListItem',
                                position: 2,
                                name: 'Dashboard',
                                item: `${process.env.NEXT_PUBLIC_HOST_URL}/dashboard`
                            },
                            {
                                '@type': 'ListItem',
                                position: 3,
                                name: userName,
                                item: `${process.env.NEXT_PUBLIC_HOST_URL}/dashboard/${userData.login}`
                            }
                        ]
                    },
                    achievementsSchema,
                    faqSchema,
                    enhancedBreadcrumb
                ])
            }
        }
    } catch (error) {

        // Fallback metadata em caso de erro
        return {
            title: `Dashboard GitHub - CommitWorth | Análise Completa de Commits`,
            description: 'Dashboard completo do GitHub com cálculo de valor agregado, estatísticas de commits, distintivos de conquista e geração de cards personalizados para desenvolvedores.',
            keywords: [
                'commitworth',
                'github dashboard',
                'github stats',
                'commits calculator',
                'github card generator',
                'dashboard desenvolvedor',
                'estatísticas github',
                'valor agregado commits',
                'distintivos github',
                'portfolio desenvolvedor'
            ],
            robots: {
                index: false,
                follow: false,
            },
            openGraph: {
                title: 'CommitWorth - Dashboard GitHub com Valor Agregado',
                description: 'Descubra o valor dos seus commits e gere seu card personalizado do GitHub',
                images: [{
                    url: `${process.env.NEXT_PUBLIC_HOST_URL}/github-hero.png`,
                    width: 401,
                    height: 401,
                    alt: 'CommitWorth Dashboard Example'
                }]
            }
        }
    }
}