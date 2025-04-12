const outputFormat = "webp";

export async function transferImageStyle(
  referenceStyleImage: Buffer,
  imageBuffer: Buffer
): Promise<string> {
  const formData = new FormData();
  const contentFile = new Blob([imageBuffer]);
  const styleFile = new Blob([referenceStyleImage]);

  formData.append("init_image", contentFile, "input.png");
  formData.append("style_image", styleFile, "style.png");
  formData.append("output_format", outputFormat);
  formData.append("style_strength", "1");
  formData.append("aspect_ratio", "1:1");
  formData.append("seed", "2635612440");
  formData.append(
    "prompt",
    "black and white outline drawing, clean line art, high contrast, no shading, coloring book style"
  );
  formData.append("negative_prompt", "color, background, shading, texture");

  const response = await fetch(
    "https://api.stability.ai/v2beta/stable-image/control/style-transfer",
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
    console.error("Style transfer failed:", errorText);
    throw new Error(`Style Transfer API Error: ${response.status}`);
  }

  const finishReason = response.headers.get("finish-reason");
  if (finishReason === "CONTENT_FILTERED") {
    throw new Error("Image blocked by NSFW filter.");
  }

  const seed = response.headers.get("seed");

  console.log({ seed });

  const blob = await response.blob();
  const arrayBuffer = await blob.arrayBuffer();
  const base64Image = Buffer.from(arrayBuffer).toString("base64");

  return `data:image/${outputFormat};base64,${base64Image}`;
}
