"use client";

import { useCanvasTool } from "@/context/CanvasToolProvider";
import Konva from "konva";
import React, { useRef } from "react";
import { Image } from "react-konva";
import useImage from "use-image";
import { pauletteLogoBase64 } from "./data";

export const ESSENTIAL_PAULETTE_LOGO_ID = "essential-paulette-logo";

const logoWidth = 180;
const logoHeight = 70;

export const EssentialPauletteLogo = () => {
  const { essentialImages } = useCanvasTool();

  const isVisible = essentialImages.includes(ESSENTIAL_PAULETTE_LOGO_ID);

  const [image] = useImage(pauletteLogoBase64);

  const dimensions = {
    y: window.innerHeight / 2 - logoHeight / 2,
    x: window.innerWidth / 2 - logoWidth / 2,
    width: logoWidth,
    height: logoHeight,
    rotation: 0,
  };

  if (!isVisible) {
    return null;
  }

  return (
    <>
      <Image image={image} {...dimensions} draggable={false} />
    </>
  );
};
