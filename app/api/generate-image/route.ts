import { NextRequest, NextResponse } from "next/server";
import { generatePromptFromUserDescription } from "@/lib/generate-openai-prompt";
import { generateStabilityImage } from "@/lib/generate-stability-image";
import { removeBackgroundFromImage } from "@/lib/remove-background";

export interface PromptResult {
  imageBase64: string;
  prompt: string;
}

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

    const enrichedPrompt = await generatePromptFromUserDescription(
      userDescription
    );
    const stabilityResponse = await generateStabilityImage(enrichedPrompt);

    const base64 = stabilityResponse.imageBase64.split(",")[1]; // enlever "data:image/...;base64,"
    const imageBuffer = Buffer.from(base64, "base64");

    const { imageBase64 } = await removeBackgroundFromImage(
      imageBuffer,
      "webp"
    );

    const result: PromptResult = {
      imageBase64,
      prompt: enrichedPrompt,
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error generating image:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
