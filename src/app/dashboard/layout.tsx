import type { Metadata } from "next"
import { Lalezar } from 'next/font/google'

const lalezar = Lalezar({
    subsets: ['latin'],
    weight: ['400', '400'],
    display: 'swap',
})

export const metadata: Metadata = {
  title: "CommitWorth",
  description: "Descubra quanto valor você agregou ao mercado com seus commits no GitHub. Crie dashboards e cards personalizados para mostrar suas estatísticas de forma clara e profissional.",
  keywords: [
    "commitworth",
    "dashboard github",
    "valor github",
    "estatísticas github",
    "github commits",
    "github stars",
    "desenvolvedor github",
    "cards github personalizados",
    "valor desenvolvedor",
    "metricas github",
  ],
  creator: "AndreVsemR",
  publisher: "CommitWorth",
  openGraph: {
    title: "CommitWorth - Seu Valor no GitHub em Números",
    description:
      "Veja suas estatísticas completas do GitHub e descubra quanto valor seus commits agregaram. Crie cards personalizados para compartilhar seu progresso.",
    url: process.env.NEXT_PUBLIC_HOST_URL,
    siteName: "CommitWorth",
    images: [
      {
        url: "/github-logo.svg",
        width: 400,
        height: 400,
        alt: "CommitWorth Logo",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CommitWorth - Seu Valor no GitHub em Números",
    description:
      "Descubra o valor dos seus commits no GitHub, crie dashboards e cards personalizados para compartilhar com a comunidade.",
    creator: "@AndreVsemR",
    images: ["/github-logo.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "Technology",
  applicationName: "CommitWorth",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            {children}
        </>
    )
}
