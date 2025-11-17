"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [city, setCity] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        setLocation({ lat, lon });

        // Réinitialise l’erreur si tout se passe bien
        setError(null);

        // Appel à l'API de géocodage OpenStreetMap
        fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.address?.city) setCity(data.address.city);
            else if (data.address?.town) setCity(data.address.town);
            else if (data.address?.village) setCity(data.address.village);
            else setCity("City unknown");
          })
          .catch(() => setCity("City unknown"));
      },
      () => {
        setError("Unable to retrieve your location");
      }
    );
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-black text-white p-4">
      <h1 className="text-4xl font-bold mb-4">
        {city ? `Welcome, user from ${city} 🚀` : "Welcome 🚀"}
      </h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {location && (
        <p className="text-lg text-gray-300">
          Your position : {location.lat.toFixed(2)}, {location.lon.toFixed(2)}
        </p>
      )}
    </div>
  );
}
