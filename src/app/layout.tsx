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
  metadataBase: new URL(process.env.NEXT_PUBLIC_HOST_URL as string),
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
        cz-shortcut-listen="true"
      >
            <Toaster position="bottom-right" />
            {children}
      </body>
    </html>
  );
}
