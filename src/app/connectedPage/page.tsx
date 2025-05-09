"use client";

import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

export default function ConnectedPage() {

  const router = useRouter();

  const handleLogout = () => {
    router.push('/auth/logout');
};

    return (
      <div>
        <h1>Bienvenue !</h1>
        <p>Vous êtes connecté(e).</p>
        <Button variant="outlined" color="secondary" onClick={handleLogout}>
          Deconnexion
        </Button>
      </div>
    );
  }