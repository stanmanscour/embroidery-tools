"use client";

import React from "react";

import { Stage, Layer } from "react-konva";

import { TransformableImage } from "./TransformableImage";
import { TransformableText } from "./TransformableText";

import { UploadItem } from "./toolbar/UploadItem";
import { EditTextItem } from "./toolbar/EditTextItem";
import { FreezeCanvasItem } from "./toolbar/FreezeCanvasItem";
import { useCanvasTool } from "@/context/CanvasToolProvider";
import { PromptItem } from "./toolbar/PromptItem";
import { SnapshotItem } from "./toolbar/SnapshotItem";

const Canvas = () => {
  const {
    isFrozen,

    textContent,

    images,

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
        <div className="absolute top-0 left-0 right-0 z-50">
          {/* justify-between if 2 items */}
          <div className="flex flex-row gap-3 justify-center p-2">
            {/* <SnapshotItem /> */}
            <FreezeCanvasItem />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 z-50">
          <div className="flex flex-row gap-3 justify-center px-2 pb-5">
            <UploadItem />
            <EditTextItem />
            <PromptItem />
          </div>
        </div>

        <Stage width={window.innerWidth} height={window.innerHeight}>
          <Layer>
            {images.map((image) => (
              <TransformableImage
                key={image.id}
                id={image.id}
                imageURL={image.data}
                isSelected={selected === image.id && !isFrozen}
                onSelect={setSelected}
                isFrozen={isFrozen}
              />
            ))}
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
