export async function generateStabilityImage(
  prompt: string,
  seed = 0,
  aspectRatio = "1:1",
  outputFormat: "webp" | "jpeg" | "png" = "webp"
) {
  const formData = new FormData();
  formData.append("prompt", prompt);
  formData.append(
    "negative_prompt",
    "gradients, shading, textures, shadows, realistic, photographic, complex details, background"
  );
  formData.append("aspect_ratio", aspectRatio);
  formData.append("seed", seed.toString());
  formData.append("output_format", outputFormat);

  const response = await fetch(
    "https://api.stability.ai/v2beta/stable-image/generate/ultra",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.STABILITY_API_KEY!}`,
        Accept: "image/*", // PAS de Content-Type ici, c'est FormData qui le gère automatiquement
      },
      body: formData,
    }
  );

  if (!response.ok) {
    const errorText = await response.text(); // au cas où l'API ne retourne pas un JSON
    console.error("Stability API Error:", errorText);
    throw new Error(`Stability API Error: ${response.status}`);
  }

  const finishReason = response.headers.get("finish-reason");
  if (finishReason === "CONTENT_FILTERED") {
    throw new Error("Image blocked by NSFW filter.");
  }

  const blob = await response.blob();
  const arrayBuffer = await blob.arrayBuffer();
  const base64Image = Buffer.from(arrayBuffer).toString("base64");
  const seedUsed = response.headers.get("seed") || seed;

  return {
    imageBase64: `data:image/${outputFormat};base64,${base64Image}`,
    seed: seedUsed,
  };
}
