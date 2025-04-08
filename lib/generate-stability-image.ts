const outputFormat = "webp";

export async function generateStabilityImage(
  prompt: string,
  negativePrompt: string
) {
  const formData = new FormData();
  formData.append("prompt", prompt);
  formData.append("negative_prompt", negativePrompt);
  formData.append("aspect_ratio", "1:1");
  formData.append("seed", "0");
  formData.append("output_format", outputFormat);

  const response = await fetch(
    "https://api.stability.ai/v2beta/stable-image/generate/ultra",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.STABILITY_API_KEY!}`,
        Accept: "image/*",
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

  return {
    imageBase64: `data:image/${outputFormat};base64,${base64Image}`,
  };
}
