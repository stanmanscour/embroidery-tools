// app/api/generate-image/route.ts
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export interface PromptResult {
  imageUrl: string;
  prompt: string;
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // sécurisée ici
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userDescription } = body;

    if (!userDescription) {
      return NextResponse.json(
        { error: "Missing userDescription" },
        { status: 400 }
      );
    }

    // - Les **couleurs doivent être simples et plates**, sans aucune variation de ton.
    const systemPrompt = `Tu es un assistant expert en design d'illustrations simples et stylisées.

À partir d'une description courte d'utilisateur, génère un prompt plus riche destiné à une IA génératrice d’images. Le but est d’obtenir une illustration en style low realism, **très lisible**, avec des formes claires, des couleurs unies, sans dégradé, sans texture ni ombre réaliste.

Elle doit être facilement reproductible à la main (ex : avec du fil, des ciseaux ou un marqueur). Pour cela :
- Proportions justes, 
- textures aplaties, 
- contours traits nets
- palette douce, pas de fond

- Pas de cadre
- Pas de version multiple : **une seule illustration**.
- **Réduis les détails complexes** comme les textures, les plis ou les petits traits fins.
- Centre les éléments sur un **fond blanc**.`;

    // Génération du prompt enrichi avec GPT-4
    const promptResponse = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userDescription },
      ],
    });

    const enrichedPrompt = promptResponse.choices[0].message.content;

    // Appel à DALL·E avec le prompt enrichi
    const imageResponse = await openai.images.generate({
      model: "dall-e-3",
      prompt: enrichedPrompt || "",
      n: 1,
      size: "1024x1024",
      response_format: "url",
    });

    const imageUrl = imageResponse.data[0].url;

    return NextResponse.json({ imageUrl, prompt: enrichedPrompt });
  } catch (error) {
    console.error("Error generating image:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
