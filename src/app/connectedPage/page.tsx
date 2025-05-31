"use client";

import { Button } from "@mui/material";

export default function ConnectedPage() {


    return (
      <div>
        <h1>Bienvenue !</h1>
        <p>Vous êtes connecté(e).</p>
        <Button variant="outlined" color="secondary" href= "/api/auth/logout">
          Deconnexion
        </Button>
      </div>
    );
  }