"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(
    null
  );
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

        setLocation({ lat, lon });
        setError(null);

        try {
          // 1️⃣ ​📍 Récupération de la ville via OpenStreetMap
          const geoRes = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
          );
          const geoData = await geoRes.json();

          const cityName =
            geoData.address?.city ||
            geoData.address?.town ||
            geoData.address?.village ||
            geoData.address?.municipality ||
            geoData.address?.county ||
            "Unknown city";

          setCity(cityName);

          // 2️⃣ 🌦️ Récupération météo via OPEN-METEO
          const meteoRes = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=cloud_cover&timezone=auto`
          );
          const meteoData = await meteoRes.json();
          console.log("Meteo Data:", meteoData);

          const cloudCover = meteoData?.hourly?.cloud_cover?.[0] ?? 0;

          // NOAA Kp API
          const kpRes = await fetch(
            "https://services.swpc.noaa.gov/json/planetary_k_index_1m.json"
          );
          const kpData = await kpRes.json();

          // On récupère le dernier relevé
          const kpIndex = kpData?.[kpData.length - 1]?.kIndex ?? 0;

          console.log("Cloud:", cloudCover, "Kp:", kpIndex);

          // 3️⃣ 🤖 Envoi à Gemini via route API
          const aiRes = await fetch("/api/aurora", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              lat,
              lon,
              city: cityName,
              kpIndex,
              cloudCover,
            }),
          });

          const aiData = await aiRes.json();
          setAuroraChance(aiData.percentage);
        } catch (err) {
          console.error(err);
          setError("Error fetching data");
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

      {loading && (
        <p className="text-xl mt-6 text-gray-400">Calcul en cours… ⏳</p>
      )}

      {!loading && auroraChance !== null && (
        <p className="text-2xl font-bold mt-6">
          Chance of seeing aurora tonight: {auroraChance}%
        </p>
      )}

      {!loading && error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}
