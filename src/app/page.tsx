"use client";

import React from "react";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleLogin = () => {
    router.push('/auth/login?returnTo=/connectedPage');
  };
  
  const handleSignUp = () => {
    router.push('/auth/signup?returnTo=/');
  };

  return (
    <div>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleSignUp}
      >
        Inscrire
      </Button>

      <Button 
        variant="outlined" 
        color="secondary" 
        onClick={handleLogin}
      >
        Connexion
      </Button>
    </div>
  );

  // To do: remove error page when connected with disconnection button to go back in page.tsx
}