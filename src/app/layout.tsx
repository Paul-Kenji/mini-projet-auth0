import type React from "react"
import type { Metadata } from "next"
import { UserProvider } from "@auth0/nextjs-auth0/client"
import "./globals.css"

export const metadata: Metadata = {
  title: "Projet Auth0",
  description: "Application avec authentification Auth0",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body suppressHydrationWarning={true}>
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  )
}