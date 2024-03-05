"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Stage, Layer } from "react-konva";
import { TransformableImage } from "@/components/TransformableImage";
import {
  ToggleButton,
  FileTrigger,
  Button,
  DialogTrigger,
} from "react-aria-components";

import moveIcon from "../public/icons/move.svg";
import photoIcon from "../public/icons/photo.svg";
import textIcon from "../public/icons/text.svg";
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
  const [isFrozen, setIsFrozen] = useState(false); // Nouvel état pour gérer le mode figé

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
          <FileTrigger
            acceptedFileTypes={[
              "image/png",
              "image/jpeg",
              "image/svg+xml",
              "image/webp",
            ]}
            onSelect={(e) => {
              let files = Array.from(e as FileList);
              handleUpload(files[0]);
            }}
          >
            <Button className="flex gap-1 rounded-md bg-gray-100 p-2 border-2 items-center border-gray-200">
              <Image
                height={20}
                priority
                src={photoIcon}
                alt="Choisir une image"
              />
              <span className="text-black text-sm">Image</span>
            </Button>
          </FileTrigger>

          <DialogTrigger>
            <Button
              onPress={() => setTextModalOpen(true)}
              className="flex gap-1 rounded-md bg-gray-100 p-2 border-2  border-gray-200"
            >
              <Image
                height={20}
                priority
                src={textIcon}
                alt="Ajouter du texte"
              />
              <span className="text-black text-sm">Texte</span>
            </Button>
            <TextModal
              isOpen={isTextModalOpen}
              setIsOpen={setTextModalOpen}
              onAddText={setTextContent}
            />
          </DialogTrigger>
        </div>

        <ToggleButton
          className="flex gap-1 rounded-md bg-gray-100 p-2 border-2 items-center border-gray-200"
          isSelected={isFrozen}
          onChange={() => setIsFrozen(!isFrozen)}
          aria-label="Star"
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
        </ToggleButton>
      </div>
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          {imageURL && (
            <TransformableImage
              id="image1"
              imageURL={imageURL}
              isSelected={selected === "image1" && !isFrozen} // Désactiver la sélection si l'image est figée
              onSelect={setSelected}
              isFrozen={isFrozen} // Passer l'état figé au composant TransformableImage
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
