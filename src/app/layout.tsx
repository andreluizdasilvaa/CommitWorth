import type { Metadata } from "next";
import { Lalezar } from 'next/font/google'
import "./globals.css";

const lalezar = Lalezar({
  subsets: ['latin'],
  weight: ['400', '400'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: "CommitWorth",
  description: "Veja Quanto Você Agregou de valor com Seus Commits no GitHub!",
  icons: {
    icon: [
            {
                url: '/github-logo.svg',
                type: 'image/svg+xml',
            }
        ],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
