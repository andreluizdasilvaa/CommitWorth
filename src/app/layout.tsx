import type { Metadata } from "next";
import { Lalezar, Inter } from 'next/font/google'
import { Toaster } from "sonner";
import "./globals.css";

const lalezar = Lalezar({
    subsets: ['latin'],
    weight: ['400', '400'],
    display: 'swap',
})

const inter = Inter({
    subsets: ['latin'],
    weight: ['400', '900'],
    display: 'swap',
})

export const metadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_HOST_URL || 'https://commitworth.vercel.app' as string),
    title: {
        default: "CommitWorth - Dashboard GitHub com Valor Agregado e Pontuação",
        template: "%s | CommitWorth - Dashboard GitHub Completo",
    },
    description: "🚀 Descubra o valor real dos seus commits na CommitWorth! Dashboard completo com estatísticas, pontuação gamificada, distintivos e geração de cards exclusivos. Análise gratuita de repositórios públicos.",
    keywords: [
        // Palavras-chave primárias (alta relevância)
        "github dashboard",
        "github stats",
        "github estatísticas",
        "valor commits github",
        "github card generator",

        // Palavras-chave secundárias (média relevância)
        "dashboard desenvolvedor",
        "github analytics",
        "github metrics",
        "commits calculator",
        "github profile card",
        "estatísticas programador",
        "github achievements",
        "distintivos github",

        // Long-tail keywords (baixa concorrência, alta conversão)
        "calcular valor commits github",
        "gerar card github personalizado",
        "dashboard github gratuito",
        "analisar perfil github",
        "pontuação github commits",
        "commits worth calculator",
        "github contribution value",
        "portfolio desenvolvedor github",
        "github profile analytics",
        "métricas repositório github",

        // Termos relacionados ao público-alvo
        "desenvolvedor",
        "programador",
        "open source",
        "contribuições github",
        "repositórios públicos",
        "linguagens programação",
        "commits",
        "estrelas github",
        "forks github"
    ],
    authors: [{
        name: "André Luiz",
        url: "https://github.com/andreluizdasilvaa/CommitWorth"
    }],
    creator: "André Luiz",
    publisher: "CommitWorth",
    category: "Technology",
    applicationName: "CommitWorth",

    openGraph: {
        title: "CommitWorth - Dashboard Completo com Valor Agregado 🚀",
        description: "💰 Descubra quanto valor você já agregou com seus commits! Dashboard gratuito com estatísticas completas, pontuação gamificada e geração de cards exclusivos. Análise de repositórios públicos do GitHub.",
        url: process.env.NEXT_PUBLIC_HOST_URL || 'https://commitworth.vercel.app',
        siteName: "CommitWorth - Dashboard",
        images: [
            {
                url: "/logo.svg",
                width: 401,
                height: 401,
                alt: "CommitWorth - Análise GitHub com valor agregado, commits e distintivos"
            }
        ],
        locale: "pt_BR",
        type: "website",
        countryName: "Brasil"
    },

    twitter: {
        card: "summary_large_image",
        title: "CommitWorth - Valorize seus commits no GitHub! 💻✨",
        description: "🎯 Dashboard completo + Card personalizado + Distintivos exclusivos. Descubra o valor real dos seus commits agora!",
        images: ["/logo.svg"],
        creator: "@andreVsemR",
        site: process.env.NEXT_PUBLIC_HOST_URL || 'https://commitworth.vercel.app'
    },

    robots: {
        index: true,
        follow: true,
        noarchive: false,
        nosnippet: false,
        noimageindex: false,
        nocache: false,
        googleBot: {
            index: true,
            follow: true,
            noimageindex: false,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    icons: {
        icon: "/logo.svg",
        shortcut: "/logo.svg",
        apple: "/logo.svg"
    },

    alternates: {
        canonical: process.env.NEXT_PUBLIC_HOST_URL || 'https://commitworth.vercel.app',
        languages: {
            'pt-BR': process.env.NEXT_PUBLIC_HOST_URL || 'https://commitworth.vercel.app',
            'x-default': process.env.NEXT_PUBLIC_HOST_URL || 'https://commitworth.vercel.app'
        }
    },

    other: {
        'application/ld+json': JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'CommitWorth',
            applicationCategory: 'DeveloperApplication',
            operatingSystem: 'Web Browser',
            description: 'Dashboard completo para desenvolvedores visualizarem estatísticas do GitHub, calcularem valor agregado dos commits e gerarem cards personalizados para compartilhamento.',
            url: process.env.NEXT_PUBLIC_HOST_URL || 'https://commitworth.vercel.app',
            author: {
                '@type': 'Person',
                name: 'André Luiz',
                url: 'https://github.com/andreluizdasilvaa',
                sameAs: [
                    'https://github.com/andreluizdasilvaa',
                    'https://x.com/andreVsemR'
                ]
            },
            creator: {
                '@type': 'Person',
                name: 'André Luiz'
            },
            offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'BRL',
                description: 'Dashboard gratuito do CommitWorth com análise completa de commits, cálculo de valor agregado e geração de cards personalizados'
            },
            downloadUrl: process.env.NEXT_PUBLIC_HOST_URL || 'https://commitworth.vercel.app',
            screenshot: `${process.env.NEXT_PUBLIC_HOST_URL || 'https://commitworth.vercel.app'}/logo.svg`,
            releaseNotes: 'Dashboard CommitWorth com cálculo de valor agregado, sistema de pontuação e distintivos de conquista',
            featureList: [
                'Análise completa de repositórios GitHub',
                'Cálculo de valor agregado por commits',
                'Sistema de pontuação gamificado',
                'Distintivos de conquista exclusivos',
                'Geração de cards personalizados',
                'Compartilhamento para LinkedIn',
                'Análise de linguagens de programação',
                'Estatísticas de estrelas e forks'
            ],
            audience: {
                '@type': 'Audience',
                audienceType: 'Desenvolvedores de Software'
            }
        })
    }
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="pt-BR">
            <head>
                {/* DNS prefetch for external resources */}
                <link rel="dns-prefetch" href="//api.github.com" />
                <link rel="preconnect" href="https://api.github.com" crossOrigin="anonymous" />

                <meta name="theme-color" content="#0D1321" />
                <meta name="format-detection" content="telephone=no" />
                <meta name="mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
                <meta name="apple-mobile-web-app-title" content="CommitWorth" />

                <meta name="geo.region" content="BR" />
                <meta name="geo.country" content="Brasil" />
                <meta name="language" content="Portuguese" />
                <meta name="coverage" content="Worldwide" />
                <meta name="distribution" content="Global" />
                <meta name="rating" content="General" />

                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:image:type" content="image/png" />
            </head>
            <body
                className={`antialiased`}
                cz-shortcut-listen="true"
            >
                <Toaster position="bottom-right" />
                {children}
            </body>
        </html>
    );
}