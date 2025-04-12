export const convertBase64ToBuffer = (base64Image: string): Buffer => {
  const base64 = base64Image.includes(",")
    ? base64Image.split(",")[1]
    : base64Image;
  return Buffer.from(base64, "base64");
};

export const convertBufferToBase64 = (buffer: Buffer): string => {
  const base64 = buffer.toString("base64");
  return `data:image/webp;base64,${base64}`;
};
