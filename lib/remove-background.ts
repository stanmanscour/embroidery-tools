const outputFormat = "webp";

export async function removeBackgroundFromImage(
  imageBuffer: Buffer
): Promise<{ imageBase64: string; seed: string | null }> {
  const formData = new FormData();
  const file = new Blob([imageBuffer]);
  formData.append("image", file, "input.png");
  formData.append("output_format", outputFormat);

  const response = await fetch(
    "https://api.stability.ai/v2beta/stable-image/edit/remove-background",
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
    const errorText = await response.text();
    console.error("Remove background failed:", errorText);
    throw new Error(`Remove background API Error: ${response.status}`);
  }

  const finishReason = response.headers.get("finish-reason");
  if (finishReason === "CONTENT_FILTERED") {
    throw new Error("Image blocked by NSFW filter.");
  }

  const blob = await response.blob();
  const arrayBuffer = await blob.arrayBuffer();
  const base64Image = Buffer.from(arrayBuffer).toString("base64");
  const seed = response.headers.get("seed");

  return {
    imageBase64: `data:image/${outputFormat};base64,${base64Image}`,
    seed,
  };
}
