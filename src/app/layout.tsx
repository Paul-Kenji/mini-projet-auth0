import type React from "react"
import { UserProvider } from "@auth0/nextjs-auth0/client"
import Link from "next/link"
import "./globals.css"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="bg-black text-white min-h-screen">
        {/* Header */}
        <header className="w-full flex justify-end p-4 shadow">
          <Link href="/login" className="bg-blue-800 text-white px-4 py-2 rounded">
            Se connecter
          </Link>
        </header>

        {/* Contenu */}
        <UserProvider>
          <div className="min-h-screen">
            {children}
          </div>
        </UserProvider>
      </body>
    </html>
  )
}
