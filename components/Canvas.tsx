"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { Stage, Layer } from "react-konva";

import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import moveIcon from "../public/icons/move.svg";
import photoIcon from "../public/icons/photo.svg";

import { TransformableImage } from "./TransformableImage";
import { TransformableText } from "./TransformableText";
import { options } from "@/fonts";
import { Sidebar } from "./Sidebar";
import { UploadItem } from "./toolbar/UploadItem";
import { EditTextItem } from "./toolbar/EditTextItem";
import { FreezeCanvasItem } from "./toolbar/FreezeCanvasItem";
import { useCanvasTool } from "@/context/CanvasToolProvider";

const Canvas = () => {
  const {
    isFrozen,
    setIsFrozen,
    textContent,
    setTextContent,
    imageURL,
    setImageURL,
    selected,
    setSelected,
  } = useCanvasTool();

  return (
    <div
      style={{
        backgroundImage: isFrozen
          ? `url('/opacity3.webp`
          : `url('/quadrillage2.jpg')`,
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
