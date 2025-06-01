"use client"

import { useUser } from "@auth0/nextjs-auth0/client"
import { Box, Button, Card, CardContent, Typography } from "@mui/material"

export default function ConnectedPage() {
  const { user, isLoading } = useUser()

  if (isLoading) return <div>Chargement...</div>
  if (!user) {
    // Optionnel : redirection côté client
    if (typeof window !== "undefined") window.location.href = "/api/auth/login"
    return null
  }

  return (
    <Box p={2}>
      <Typography variant="h3">Bienvenue, {user.name || user.email} !</Typography>
      <Button
        variant="outlined"
        color="error"
        href="/api/auth/logout"
        sx={{ mt: 2 }}
      >
        Déconnexion
      </Button>    </Box>
  )
}
