"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { Stage, Layer } from "react-konva";

import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import moveIcon from "../public/icons/move.svg";
import photoIcon from "../public/icons/photo.svg";
import textIcon from "../public/icons/text.svg";

import { TransformableImage } from "./TransformableImage";
import { TransformableText } from "./TransformableText";
import { TextModal } from "./TextModal";

const Canvas = () => {
  const [imageURL, setImageURL] = useState<string>("");
  const [textContent, setTextContent] = useState({
    content: "",
    fontFamily: "",
  });
  const [isTextModalOpen, setTextModalOpen] = useState(false);
  const [selected, setSelected] = useState("");
  const [isFrozen, setIsFrozen] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = (file: Blob) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        setImageURL(reader.result);
        setIsFrozen(false);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="">
      <div className="flex flex-row p-3 justify-between">
        <div className="flex flex-row gap-2">
          {/* Image Upload (file input trigger) */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png, image/jpeg, image/svg+xml, image/webp"
            className="hidden"
            onChange={(e) => {
              if (e.target.files?.[0]) {
                handleUpload(e.target.files[0]);
              }
            }}
          />
          <Button
            variant="secondary"
            onClick={() => fileInputRef.current?.click()}
            className="flex gap-1 items-center border-2"
          >
            <Image
              height={20}
              priority
              src={photoIcon}
              alt="Choisir une image"
            />
            <span className="text-black text-sm">Image</span>
          </Button>

          {/* Text Modal Trigger */}
          <Dialog open={isTextModalOpen} onOpenChange={setTextModalOpen}>
            <DialogTrigger asChild>
              <Button
                variant="secondary"
                onClick={() => setTextModalOpen(true)}
                className="flex gap-1 items-center border-2"
              >
                <Image
                  height={20}
                  priority
                  src={textIcon}
                  alt="Ajouter du texte"
                />
                <span className="text-black text-sm">Texte</span>
              </Button>
            </DialogTrigger>
            <TextModal
              isOpen={isTextModalOpen}
              setIsOpen={setTextModalOpen}
              onAddText={setTextContent}
            />
          </Dialog>
        </div>

        {/* Freeze toggle */}
        <Toggle
          pressed={isFrozen}
          onPressedChange={() => setIsFrozen(!isFrozen)}
          className="flex gap-1 items-center bg-gray-100 border-2 hover:bg-slate-50"
        >
          <Image
            height={20}
            priority
            src={moveIcon}
            alt="Débloquer / Bloquer"
          />
          <span className="text-black text-sm">
            {isFrozen ? "Débloquer" : "Bloquer"}
          </span>
        </Toggle>
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
  );
};

export default Canvas;
