"use client";

import React from "react";

import { Stage, Layer } from "react-konva";

import { TransformableImage } from "./TransformableImage";
import { TransformableText } from "./TransformableText";

import { UploadItem } from "./toolbar/UploadItem";
import { EditTextItem } from "./toolbar/EditTextItem";
import { FreezeCanvasItem } from "./toolbar/FreezeCanvasItem";
import { useCanvasTool } from "@/context/CanvasToolProvider";

const Canvas = () => {
  const {
    isFrozen,

    textContent,

    imageURL,

    selected,
    setSelected,
  } = useCanvasTool();

  return (
    <div
      style={{
        backgroundImage: isFrozen ? `url('/locked3.webp` : `url('/grid.webp')`,
      }}
      className="h-screen bg-cover bg-center text-white"
    >
      <div className="">
        <div className="flex flex-row gap-3 justify-center pt-2">
          <UploadItem />
          <EditTextItem />
          <FreezeCanvasItem />
        </div>

        <Stage width={window.innerWidth} height={window.innerHeight}>
          <Layer>
            {imageURL && (
              <TransformableImage
                id="image1"
                imageURL={imageURL}
                isSelected={selected === "image1" && !isFrozen}
                onSelect={setSelected}
                isFrozen={isFrozen}
              />
            )}
            {textContent.content && (
              <TransformableText
                id="text1"
                textConfig={textContent}
                isSelected={selected === "text1" && !isFrozen}
                onSelect={setSelected}
                isFrozen={isFrozen}
              />
            )}
          </Layer>
        </Stage>
      </div>
    </div>
  );
};

export default Canvas;
