"use client";

import Konva from "konva";
import React, { useRef, useEffect, useState } from "react";
import { Image, Transformer } from "react-konva";
import useImage from "use-image";

export const TransformableImage = ({
  imageURL,
  isSelected,
  onSelect,
  isFrozen,
}: {
  isSelected: boolean;
  onSelect: () => void;
  imageURL: string;
  isFrozen: boolean;
}) => {
  const imageRef = useRef<Konva.Image>(null);
  const transformerRef = useRef<Konva.Transformer>(null);
  const [image] = useImage(imageURL);
  const [dimensions, setDimensions] = useState({
    x: 20,
    y: 20,
    width: 0,
    height: 0,
    rotation: 0,
  });

  useEffect(() => {
    if (!image) return;

    // Calcul pour que l'image prenne 50% de la largeur de l'écran par défaut
    const scale = (window.innerWidth * 0.5) / image.width;
    setDimensions((dims) => ({
      ...dims,
      width: image.width * scale,
      height: image.height * scale,
    }));
  }, [image]);

  useEffect(() => {
    if (!transformerRef.current || !imageRef.current) return;

    if (isSelected && !isFrozen) {
      transformerRef.current.nodes([imageRef.current]);
      transformerRef.current.getLayer()?.batchDraw();
    } else {
      transformerRef.current.nodes([]);
      transformerRef.current.getLayer()?.batchDraw();
    }
  }, [isSelected, isFrozen]);

  const handleTransformEnd = () => {
    if (!imageRef.current) return;

    const node = imageRef.current;
    const scaleX = node?.scaleX();
    const scaleY = node?.scaleY();

    // Appliquer les transformations et réinitialiser l'échelle
    setDimensions({
      x: node.x(),
      y: node.y(),
      width: node.width() * scaleX,
      height: node.height() * scaleY,
      rotation: node.rotation(),
    });

    node.scaleX(1);
    node.scaleY(1);
  };

  return (
    <>
      <Image
        onClick={onSelect}
        onTap={onSelect}
        image={image}
        ref={imageRef}
        {...dimensions}
        draggable={!isFrozen}
        onDragEnd={handleTransformEnd}
        onTransformEnd={handleTransformEnd}
      />
      <Transformer
        ref={transformerRef}
        boundBoxFunc={(oldBox, newBox) => {
          // Limiter la taille minimale pour éviter les boîtes trop petites
          if (newBox.width < 5 || newBox.height < 5) {
            return oldBox;
          }
          return newBox;
        }}
      />
    </>
  );
};
