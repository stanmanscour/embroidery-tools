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
import type {
  ImageModification,
  Payload,
  Response,
} from "@/app/api/edit-image/route";
import { toast } from "@/hooks/use-toast";

const generateImage = async (payload: Payload): Promise<Response> => {
  const response = await fetch("/api/edit-image", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Erreur lors de la génération de l'image");
  }

  return await response.json();
};

export const EnhanceImage = () => {
  const [isGenerating, setIsGenerating] = useState(false);

  const { selectedImage, addImage, removeImage, isFrozen } = useCanvasTool();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  if (!selectedImage || isFrozen) {
    return null;
  }

  const handleSubmit = async (imageModificationType: ImageModification) => {
    try {
      setIsGenerating(true);
      const result = await generateImage({
        imageModificationType,
        base64Image: selectedImage.data,
      });

      addImage(result.imageBase64);
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Une erreur est survenue.",
        description: "Je pense qu'il faut contacter le dev...",
      });
      console.error("Erreur génération :", err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent className="max-h-[95%] rounded-t-xl px-6 py-4 overflow-y-auto">
          <DrawerHeader>
            <DrawerTitle className="text-xl">Image sélectionnée</DrawerTitle>
          </DrawerHeader>
          <div className="p-1 flex flex-col gap-5 items-center">
            <div className="flex flex-col gap-2">
              <div className="border shadow-sm rounded-sm flex items-center justify-center">
                <img src={selectedImage.data} height={120} width={120} />
              </div>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => {
                  setIsDrawerOpen(false);
                  removeImage(selectedImage.id);
                }}
              >
                Supprimer
              </Button>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-lg font-semibold text-center">Modifier</p>
              <Button
                disabled={isGenerating}
                variant="outline"
                onClick={() => {
                  handleSubmit("REMOVE_BACKGROUND" as ImageModification);
                }}
              >
                Enlever le fond
              </Button>
              <Button
                disabled={isGenerating}
                variant="outline"
                onClick={() => {
                  handleSubmit("CONVERT_TO_OUTLINE" as ImageModification);
                }}
              >
                Transformer en contour
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
