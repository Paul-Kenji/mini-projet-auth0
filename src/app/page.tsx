"use client";

import React from "react";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleLogin = () => {
    router.push('/api/auth/login');
  };
  
  const handleSignUp = () => {
    router.push('/api/auth/login?screen_hint=signup');
  };

  return (
    <div>
      <h1>Bienvenue</h1>
      
      <div>
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