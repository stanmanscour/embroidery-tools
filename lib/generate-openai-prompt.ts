import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const systemPrompt = `You are an assistant expert in creating simple and stylized illustrations.

Given a short user description, generate a rich prompt for an image-generation AI. The goal is to obtain a **low realism illustration**, **highly readable**, with **clear shapes**, **flat colors**, and **no gradients, no realistic shadows or textures**.

It must be easy to reproduce manually (e.g., with thread, scissors or marker). Therefore:
- Proportions must be visually correct (but not realistic)
- Flat texture only
- Bold, clear outlines
- Soft and limited color palette
- No shading or lighting effects
- No fine details like wrinkles, reflections, or feathers
- All elements must be centered
- No background (transparent background)
- **Do not generate silhouette-style illustrations**
- **Avoid photorealism completely**
- **Use a playful and friendly aesthetic**
- No frame
- Only **one single version** of the illustration

The final result should resemble a sticker or cutout paper illustration.
`;

export async function generatePromptFromUserDescription(
  userDescription: string
): Promise<string> {
  const promptResponse = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userDescription },
    ],
  });

  return promptResponse.choices[0].message.content ?? "";
}
