import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export async function POST(req: Request) {
  try {
    const { lat, lon, city, kpIndex, cloudCover } = await req.json();

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY, // ta clé gratuite
    });

    const prompt = `
      Donne-moi un pourcentage de chance de voir une aurore boréale ce soir.
      Ville: ${city}
      Latitude: ${lat}, Longitude: ${lon}
      Indice KP: ${kpIndex}
      Couverture nuageuse: ${cloudCover}%
      Retourne uniquement un chiffre entre 0 et 100.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    // Gemini renvoie le texte directement
    const text = response?.text || "0";
    const percentage = parseInt(text.replace(/\D/g, ""), 10) || 0;

    console.log(`Aurora chance for ${city} (${lat}, ${lon}): ${percentage}%`);

    return NextResponse.json({ percentage });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ percentage: 0, error: "Impossible de calculer la chance" }, { status: 500 });
  }
}
