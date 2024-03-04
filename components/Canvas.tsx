"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { Stage, Layer, Text } from "react-konva";
import { TransformableImage } from "@/components/TransformableImage";
import { ToggleButton, FileTrigger, Button } from "react-aria-components";

import moveIcon from "../public/icons/move.svg";
import photoIcon from "../public/icons/photo.svg";

const Canvas = () => {
  const [imageURL, setImageURL] = useState(null);
  const [selected, setSelected] = useState(false);
  const [isFrozen, setIsFrozen] = useState(false); // Nouvel état pour gérer le mode figé

  const handleUpload = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageURL(reader.result);
      setSelected(true); // Sélectionner automatiquement l'image chargée
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="p-3">
      <div className="flex flex-row gap-3 justify-center">
        <FileTrigger
          acceptedFileTypes={[
            "image/png",
            "image/jpeg",
            "image/svg+xml",
            "image/webp",
          ]}
          onSelect={(e) => {
            let files = Array.from(e);
            handleUpload(files[0]);
          }}
        >
          <Button className="flex gap-1 rounded-md bg-gray-100 p-2 border-2  border-gray-200">
            <Image priority src={photoIcon} alt="Choisir une image" />
            <span className="text-black">Parcourir</span>
          </Button>
        </FileTrigger>
        <ToggleButton
          className="flex gap-1 rounded-md bg-gray-100 p-2 border-2  border-gray-200"
          isSelected={isFrozen}
          onChange={() => setIsFrozen(!isFrozen)}
          aria-label="Star"
        >
          <Image priority src={moveIcon} alt="Débloquer / Bloquer" />

          <span className="text-black">
            {isFrozen ? "Débloquer" : "Bloquer"}
          </span>
        </ToggleButton>
      </div>
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          {imageURL && (
            <TransformableImage
              imageURL={imageURL}
              isSelected={selected && !isFrozen} // Désactiver la sélection si l'image est figée
              onSelect={() => setSelected(!selected)}
              isFrozen={isFrozen} // Passer l'état figé au composant TransformableImage
            />
          )}
        </Layer>
      </Stage>
    </div>
  );
};

export default Canvas;
