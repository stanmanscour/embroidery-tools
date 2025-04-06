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
  Sparkles,
  WholeWord,
} from "lucide-react";
import { PromptConfig, useCanvasTool } from "@/context/CanvasToolProvider";
import { Textarea } from "../ui/textarea";
import { PromptResult } from "@/app/api/generate-image/route";
import { Skeleton } from "../ui/skeleton";

export type textConfig = { content: string; fontFamily: string };

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

export const PromptItem = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { prompt, setPrompt, setImageURL } = useCanvasTool();
  const [result, setResult] = useState<PromptResult>();

  const handleSubmit = async () => {
    try {
      setIsGenerating(true);
      const result = await generateImage(prompt.content);
      setResult(result);
    } catch (err) {
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

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            className="p-1 flex flex-col gap-5"
          >
            <div className="flex flex-col gap-1">
              <Label
                htmlFor="text-input"
                className="text-sm gap-2 flex flex-row items-center"
              >
                <WholeWord height={24} width={24} color="lightgray" />
                Descriptif
              </Label>
              <Textarea
                id="text-input"
                className="hover:opacity-80"
                placeholder="Un canard portant un petit singe"
                value={prompt.content}
                onChange={(e) =>
                  setPrompt({
                    content: e.target.value,
                  })
                }
              />
            </div>

            <div className="flex justify-end gap-2 mt-2">
              <Button
                disabled={isGenerating}
                type="submit"
                className="flex gap-1 items-center hover:opacity-80 active:opacity-50"
              >
                {isGenerating ? "Chargement..." : "Générer"}
              </Button>
            </div>

            <div className="flex flex-col gap-1">
              <p className="font-medium text-sm gap-2 flex flex-row items-center">
                <Sparkles height={24} width={24} color="lightgray" />
                Résultat
              </p>
              {isGenerating ? (
                <Skeleton className="w-full aspect-square rounded-md" />
              ) : result ? (
                <div className="flex flex-col gap-2">
                  <img
                    src={result.imageUrl}
                    className="border rounded-md overflow-hidden w-full aspect-square shadow-sm"
                  />

                  <div className="flex justify-end gap-2 mt-2">
                    <Button
                      variant="secondary"
                      type="button"
                      onClick={() => {
                        const link = document.createElement("a");
                        link.href = result.imageUrl;
                        link.download = "image-generée.png";
                        link.click();
                      }}
                      className="flex gap-1 items-center hover:opacity-80 active:opacity-50"
                    >
                      <Download />
                      Télécharger
                    </Button>
                    <Button
                      variant="default"
                      type="button"
                      onClick={() => {
                        setImageURL(result.imageUrl);
                        setIsDrawerOpen(false);
                      }}
                      className="flex gap-1 items-center hover:opacity-80 active:opacity-50"
                    >
                      <ImagePlus height={24} width={24} />
                      Utiliser
                    </Button>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-gray-500">
                  L&apos;image s&apos;affichera ici
                </p>
              )}
            </div>
          </form>
        </DrawerContent>
      </Drawer>

      <button
        onClick={() => setIsDrawerOpen(true)}
        className="h-[48px] mb-5 p-3 text-black bg-white gap-1 border shadow-md hover:opacity-80 active:opacity-50 rounded-lg flex flex-row justify-center items-center "
      >
        <Sparkles height={24} width={24} />
        <ChevronUp height={20} width={20} color="lightgray" />
      </button>
    </>
  );
};
