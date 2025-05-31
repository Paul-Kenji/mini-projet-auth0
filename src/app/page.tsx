"use client";

import React from "react";
import { Button } from "@mui/material";

export default function Home() {
  const handleLogin = () => {
    window.location.href = "/api/auth/login";
  };
  
  const handleSignUp = () => {
    window.location.href = "/api/auth/signup";
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