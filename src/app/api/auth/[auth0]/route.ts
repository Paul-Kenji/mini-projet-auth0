import { handleAuth } from "@auth0/nextjs-auth0"

// Version simplifiée qui fonctionne mieux
export const GET = handleAuth()
export const POST = handleAuth()