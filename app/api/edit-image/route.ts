import { NextRequest, NextResponse } from "next/server";
import { removeBackgroundFromImage } from "@/lib/remove-background";
import { promises as fs } from "fs";
import path from "path";

import { transferImageStyle } from "@/lib/convert-image-to-outline";
import { convertBase64ToBuffer } from "@/lib/convert-image";
import { resizeToMaxPixels } from "@/lib/resize-image";

const styleImagePath = path.resolve("./assets/outline-ref3.webp");

export type ImageModification = "REMOVE_BACKGROUND" | "CONVERT_TO_OUTLINE";
export interface Response {
  imageBase64: string;
  imageModificationType: ImageModification;
}

export interface Payload {
  base64Image: string;
  imageModificationType: ImageModification;
}

export async function POST(req: NextRequest) {
  try {
    const body: Payload = await req.json();
    const { base64Image, imageModificationType } = body;

    if (!base64Image || !imageModificationType) {
      return NextResponse.json(
        { error: "Payload incomplete" },
        { status: 400 }
      );
    }

    const imageBuffer = convertBase64ToBuffer(base64Image);

    const resizedBuffer = await resizeToMaxPixels(imageBuffer);

    try {
      switch (imageModificationType) {
        case "REMOVE_BACKGROUND":
          const { imageBase64 } = await removeBackgroundFromImage(
            resizedBuffer
          );

          return NextResponse.json({
            imageBase64,
            imageModificationType,
          });
        case "CONVERT_TO_OUTLINE":
          const referenceStyleImage = await fs.readFile(styleImagePath);

          const outlinedImageBase64 = await transferImageStyle(
            referenceStyleImage,
            resizedBuffer
          );

          const convertedOutlinedImageBuffer =
            convertBase64ToBuffer(outlinedImageBase64);

          const { imageBase64: outlinedWithoutBackgroundImageBase64 } =
            await removeBackgroundFromImage(convertedOutlinedImageBuffer);

          return NextResponse.json({
            imageBase64: outlinedWithoutBackgroundImageBase64,
            imageModificationType,
          });
          break;
        default:
          return NextResponse.json(
            { error: "Invalid image modification type" },
            { status: 400 }
          );
      }
    } catch (error) {
      return NextResponse.json({ error }, { status: 400 });
    }

    // return NextResponse.json(result);
  } catch (error) {
    console.error("Error generating image:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
