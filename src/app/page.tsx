"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [city, setCity] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [auroraChance, setAuroraChance] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        // Réinitialise l’erreur si tout se passe bien
        setError(null);
        setLocation({ lat, lon });

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
          );
          const data = await res.json();
          const cityName =
            data.address?.city ||
            data.address?.town ||
            data.address?.village ||
            data.address?.municipality ||
            data.address?.county ||
            "Unknown city";
          setCity(cityName);

          // Simuler un fetch API IA pour l’instant
          // Remplacer par ton vrai fetch vers /api/aurora
          await new Promise((r) => setTimeout(r, 1000));
          setAuroraChance(Math.floor(Math.random() * 101));
        } catch {
          setError("Impossible de récupérer les informations");
        } finally {
          setLoading(false);
        }
      },
      () => {
        setError("Unable to retrieve your location");
        setLoading(false);
      }
    );
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-black text-white p-4">
      <h1 className="text-4xl font-bold mb-4">
        {city ? `Welcome, user from ${city} 🚀` : "Welcome 🚀"}
      </h1>

      {location && (
        <p className="text-lg text-gray-300">
          Your position: {location.lat.toFixed(2)}, {location.lon.toFixed(2)}
        </p>
      )}

      {loading && <p className="text-xl mt-6 text-gray-400">Calcul en cours… ⏳</p>}

      {!loading && auroraChance !== null && (
        <p className="text-2xl font-bold mt-6">
          Chance of seeing aurora tonight: {auroraChance}%
        </p>
      )}

      {!loading && error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}
