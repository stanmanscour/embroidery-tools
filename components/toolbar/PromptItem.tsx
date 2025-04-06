"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { options } from "@/fonts";
import {
  ChevronUp,
  Download,
  ImagePlus,
  Sparkles,
  TypeOutline,
  WholeWord,
} from "lucide-react";
import { PromptConfig, useCanvasTool } from "@/context/CanvasToolProvider";
import { DialogTitle } from "@radix-ui/react-dialog";
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { prompt, setPrompt, setImageURL } = useCanvasTool();
  const [result, setResult] = useState<PromptResult>();

  const handleSubmit = async () => {
    try {
      setIsGenerating(true);
      const result = await generateImage(prompt.content);
      console.log("Image URL :", result.imageUrl);
      console.log("Prompt enrichi :", result.prompt);
      setResult(result);
      // Tu peux maintenant afficher l’image ou la sauvegarder où tu veux
    } catch (err) {
      console.error("Erreur génération :", err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-h-full rounded-lg w-[90%] max-w-xl overflow-y-auto mt-4">
          <DialogHeader>
            <DialogTitle className="text-xl ">Générer une image</DialogTitle>
          </DialogHeader>

          <form
            onSubmit={(e) => {
              e.preventDefault(); // 🛑 empêche le rechargement
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
                className="hover:opacity-80"
                id="text-input"
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
                //variant=""
                type="submit"
                className="flex gap-1 items-center hover:opacity-80 active:opacity-50"
              >
                {/* <Image height={20} priority src={saveIcon} alt="Enregistrer" /> */}
                Générer
              </Button>
            </div>

            <div className="flex flex-col gap-1">
              <p className="font-medium text-sm gap-2 flex flex-row items-center">
                <Sparkles height={24} width={24} color="lightgray" />
                Résultat
              </p>
              {isGenerating ? (
                <Skeleton className="w-[100%] aspect-square rounded-md" />
              ) : result ? (
                <div className="flex flex-col gap-2">
                  <img
                    className="border rounded-md overflow-hidden w-[100%] aspect-square shadow-sm"
                    src={result.imageUrl}
                  />

                  <div className="flex justify-end gap-2 mt-2">
                    <Button
                      variant="secondary"
                      type="submit"
                      className="flex gap-1 items-center hover:opacity-80 active:opacity-50"
                    >
                      {/* <Image height={20} priority src={saveIcon} alt="Enregistrer" /> */}
                      <Download />
                      Télécharger
                    </Button>
                    <Button
                      variant="default"
                      type="button"
                      onClick={() => {
                        setImageURL(result.imageUrl);
                      }}
                      className="flex gap-1 items-center hover:opacity-80 active:opacity-50"
                    >
                      {/* <Image height={20} priority src={saveIcon} alt="Enregistrer" /> */}
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

              {/* <pre>{JSON.stringify}</pre> */}
            </div>
          </form>
        </DialogContent>
      </Dialog>
      <button
        onClick={() => setIsModalOpen(true)}
        className="h-[48px] mb-5 p-3 text-black bg-white gap-1 border shadow-md hover:opacity-80 active:opacity-50 rounded-lg flex flex-row justify-center items-center "
      >
        {/* <div className="flex flex-row gap-2"> */}
        <Sparkles height={24} width={24} />
        {/* <TypeOutline height={24} width={24} /> */}
        {/* </div> */}
        <ChevronUp height={20} width={20} color="lightgray" />
      </button>
    </>
  );
};
