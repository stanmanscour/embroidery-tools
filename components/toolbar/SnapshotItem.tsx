"use client";

import React, { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  ChevronUp,
  Download,
  ImagePlus,
  Palette,
  ScanHeart,
  Sparkles,
  Wand,
  WholeWord,
} from "lucide-react";
import { useCanvasTool } from "@/context/CanvasToolProvider";
import { PromptResult } from "@/app/api/generate-image/route";
import { Skeleton } from "../ui/skeleton";
import { Input } from "../ui/input";
import { useToast } from "@/hooks/use-toast";

export type textConfig = { content: string; fontFamily: string };

// TODO: type checking il doit y avoir un text dans le prompt

const generateImage = async (userDescription: string) => {
  const response = await fetch("/api/generate-image", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userDescription }),
  });

  if (!response.ok) {
    throw new Error("Erreur lors de la génération de l'image");
  }

  return await response.json(); // { imageUrl, prompt }
};

export const SnapshotItem = () => {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { prompt, setPrompt, addImage } = useCanvasTool();
  const [result, setResult] = useState<PromptResult>();

  const handleSubmit = async () => {
    try {
      setIsGenerating(true);
      setResult(undefined);
      const result = await generateImage(prompt.content);
      setResult(result);
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
            <DrawerTitle className="text-xl">Générer une image</DrawerTitle>
          </DrawerHeader>
          <div className="p-1 flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <Label
                htmlFor="text-input"
                className="text-sm gap-2 flex flex-row items-center"
              >
                <WholeWord height={24} width={24} color="lightgray" />
                Descriptif
              </Label>
              <Input
                id="text-input"
                className="hover:opacity-80"
                type="text"
                placeholder="Un canard portant un petit singe"
                value={prompt.content}
                onChange={(e) =>
                  setPrompt({
                    content: e.target.value,
                  })
                }
              />
              <div className="flex justify-end gap-2 mt-2">
                <Button
                  disabled={isGenerating}
                  onClick={handleSubmit}
                  className="flex gap-1 items-center hover:opacity-80 active:opacity-50"
                >
                  <Wand height={24} width={24} />
                  Générer
                </Button>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <p className="font-medium text-sm gap-2 flex flex-row items-center">
                <Sparkles height={24} width={24} color="lightgray" />
                Résultat
              </p>
              <div className="flex flex-row gap-4 items-center">
                <div className=" border shadow-sm rounded-sm flex items-center justify-center">
                  {result ? (
                    <img src={result.imageBase64} height={120} width={120} />
                  ) : (
                    <Skeleton className="h-[64px] w-[64px] aspect-square rounded-md" />
                  )}
                </div>
                {isGenerating ? (
                  <p className="text-xs text-gray-500">
                    Chargement... Cela peut prendre plusieurs secondes.
                  </p>
                ) : result ? (
                  <Button
                    disabled={!result}
                    variant="outline"
                    onClick={() => {
                      addImage(result.imageBase64);
                      setIsDrawerOpen(false);
                    }}
                  >
                    <ImagePlus height={24} width={24} />
                    Utiliser
                  </Button>
                ) : (
                  <p className="text-xs text-gray-500">
                    Pas encore d&apos;image
                  </p>
                )}
              </div>
            </div>
          </div>
        </DrawerContent>
      </Drawer>

      <button
        onClick={() => setIsDrawerOpen(true)}
        className="h-[48px] p-3 text-black bg-white gap-1 border shadow-md hover:opacity-80 active:opacity-50 rounded-lg flex flex-row justify-center items-center "
      >
        <Palette height={24} width={24} />
        <p className="font-semibold text-sm ">Dossier 1</p>
        <ChevronUp height={20} width={20} color="lightgray" />
      </button>
    </>
  );
};
