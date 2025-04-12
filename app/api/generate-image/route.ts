import { NextRequest, NextResponse } from "next/server";
import { generatePromptFromUserDescription } from "@/lib/generate-openai-prompt";
import { generateStabilityImage } from "@/lib/generate-stability-image";
import { removeBackgroundFromImage } from "@/lib/remove-background";
import { IllustrationStyle } from "@/lib/prompts";

export interface PromptResult {
  imageBase64: string;
  prompt: string;
}

export interface Payload {
  userDescription: string;
  illustrationStyle: IllustrationStyle;
}

export async function POST(req: NextRequest) {
  try {
    const body: Payload = await req.json();
    const { userDescription, illustrationStyle } = body;

    if (!userDescription) {
      return NextResponse.json(
        { error: "Missing userDescription" },
        { status: 400 }
      );
    }

    const generatedPrompts = await generatePromptFromUserDescription(
      illustrationStyle,
      userDescription
    );

    const stabilityResponse = await generateStabilityImage(
      generatedPrompts.prompt,
      generatedPrompts.negativePrompt
    );

    console.log({
      ...generatedPrompts,
      illustrationStyle,
    });

    const base64 = stabilityResponse.imageBase64.split(",")[1]; // enlever "data:image/...;base64,"
    const imageBuffer = Buffer.from(base64, "base64");

    const { imageBase64 } = await removeBackgroundFromImage(imageBuffer);

    const result: PromptResult = {
      imageBase64,
      prompt: generatedPrompts.prompt,
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
