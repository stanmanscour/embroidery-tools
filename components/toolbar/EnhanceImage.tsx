"use client";

import { useCanvasTool } from "@/context/CanvasToolProvider";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { ChevronUp, ImagePlus, Images, Upload } from "lucide-react";
import { useRef, useState } from "react";

export const EnhanceImage = () => {
  const { selectedImage, removeImage, isFrozen } = useCanvasTool();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  if (!selectedImage || isFrozen) {
    return null;
  }

  return (
    <>
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent className="max-h-[95%] rounded-t-xl px-6 py-4 overflow-y-auto">
          <DrawerHeader>
            <DrawerTitle className="text-xl">Améliorer une image</DrawerTitle>
          </DrawerHeader>
          <div className="p-1 flex flex-col gap-5 items-center">
            <div className="flex flex-row gap-4 items-center">
              <div className="border shadow-sm rounded-sm flex items-center justify-center">
                <img src={selectedImage.data} height={120} width={120} />
              </div>
              <Button
                variant="destructive"
                onClick={() => removeImage(selectedImage.id)}
              >
                Supprimer
              </Button>
            </div>
            {/* TODO: modifier le style / enlever le fond */}
          </div>
        </DrawerContent>
      </Drawer>

      {/* Bouton principal pour ouvrir le drawer */}
      <button
        onClick={() => setIsDrawerOpen(true)}
        className="h-[48px] p-3 text-black bg-white gap-1 border shadow-md hover:opacity-80 active:opacity-50 rounded-lg flex flex-row justify-center items-center"
      >
        <img
          className="border h-[32px] w-[32px] rounded-sm"
          src={selectedImage.data}
          height={64}
          width={64}
        />
        <ChevronUp height={20} width={20} color="lightgray" />
      </button>
    </>
  );
};
