import OpenAI from "openai";
import { IllustrationStyle, prompts } from "./prompts";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generatePromptFromUserDescription(
  illustrationStyle: IllustrationStyle,
  userDescription: string
): Promise<{ prompt: string; negativePrompt: string }> {
  const promptResponse = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      { role: "system", content: prompts[illustrationStyle].prompt },
      { role: "user", content: userDescription },
    ],
  });

  return {
    prompt: promptResponse.choices[0].message.content ?? "",
    negativePrompt: prompts[illustrationStyle].negativePrompt,
  };
}
