"use client";

import Konva from "konva";
import React, { useRef, useEffect, useState } from "react";
import { Text, Transformer } from "react-konva";

export const TransformableText = ({
  text,
  isSelected,
  isFrozen,
  onSelect,
  id,
}: {
  text: string;
  id: string;
  onSelect: (id: string) => void;
  isSelected: boolean;
  isFrozen: boolean;
}) => {
  const textRef = useRef<Konva.Text>(null);
  const transformerRef = useRef<Konva.Transformer>(null);
  const [dimensions, setDimensions] = useState<{
    x: number;
    y: number;
    width?: number;
    height?: number;
    rotation: number;
    fontSize?: number;
  }>({
    x: 20,
    y: 20,
    rotation: 0,
  });

  useEffect(() => {
    if (!transformerRef.current || !textRef.current) return;

    if (isSelected && !isFrozen) {
      transformerRef.current.nodes([textRef.current]);
      transformerRef.current.getLayer()?.batchDraw();
    } else {
      transformerRef.current.nodes([]);
      transformerRef.current.getLayer()?.batchDraw();
    }
  }, [isSelected, isFrozen]);

  const handleTransformEnd = () => {
    if (!textRef.current) return;

    const node = textRef.current;

    setDimensions({
      x: node.x(),
      y: node.y(),
      fontSize: node.height() * node.scaleY(),
      rotation: node.rotation(),
    });

    node.scaleX(1);
    node.scaleY(1);
  };

  return (
    <>
      <Text
        ref={textRef}
        onClick={() => onSelect(id)}
        onTap={() => onSelect(id)}
        draggable={!isFrozen}
        onDragEnd={handleTransformEnd}
        onTransformEnd={handleTransformEnd}
        text={text}
        fontSize={25}
        {...dimensions}
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
