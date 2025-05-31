"use client";

import React from "react";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  console.log('AUTH0_BASE_URL:', process.env.AUTH0_BASE_URL)

  const handleLogin = () => {
    // IMPORTANT: Utilise /api/auth/login et non /auth/login
    router.push('/api/auth/login');
  };
  
  const handleSignUp = () => {
    // IMPORTANT: Utilise /api/auth/login et non /auth/signup
    router.push('/api/auth/login?screen_hint=signup');
  };

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      minHeight: '100vh',
      gap: '20px'
    }}>
      <h1>Bienvenue</h1>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '200px' }}>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleSignUp}
          fullWidth
        >
          Inscrire
        </Button>

        <Button 
          variant="outlined" 
          color="secondary" 
          onClick={handleLogin}
          fullWidth
        >
          Connexion
        </Button>
      </div>
    </div>
  );
}