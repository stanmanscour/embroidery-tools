"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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

import saveIcon from "../public/icons/save.svg";
import { options } from "@/fonts";

export type textConfig = { content: string; fontFamily: string };

export const TextModal = ({
  isOpen,
  setIsOpen,
  onAddText,
}: {
  isOpen: boolean;
  setIsOpen: (arg: boolean) => void;
  onAddText: (textConfig: textConfig) => void;
}) => {
  const [textConfig, setTextConfig] = useState<textConfig>({
    content: "",
    fontFamily: "",
  });

  const handleSave = () => {
    onAddText(textConfig);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-h-full w-full max-w-xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-lg">
            Ajouter du texte
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault(); // 🛑 empêche le rechargement
            handleSave();
          }}
          className="p-1 flex flex-col gap-3"
        >
          <div className="flex flex-col gap-1">
            <Label htmlFor="text-input" className="text-sm">
              Texte
            </Label>
            <Input
              id="text-input"
              placeholder="Texte..."
              value={textConfig.content}
              onChange={(e) =>
                setTextConfig((prevState) => ({
                  ...prevState,
                  content: e.target.value,
                }))
              }
            />
          </div>

          <div className="flex flex-col gap-1">
            <Label htmlFor="font-select" className="text-sm">
              Police
            </Label>
            <Select
              value={textConfig.fontFamily}
              onValueChange={(value) =>
                setTextConfig((prevState) => ({
                  ...prevState,
                  fontFamily: value,
                }))
              }
            >
              <SelectTrigger id="font-select" className="w-full">
                <SelectValue placeholder="Choisir une police" />
              </SelectTrigger>
              <SelectContent>
                {options.map((option) => (
                  <SelectItem
                    key={option.fontFamily}
                    value={option.fontFamily}
                    className={`${option.className} text-lg`}
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-between gap-2 mt-2">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Annuler
            </Button>
            <Button
              variant="secondary"
              type="submit"
              className="flex gap-1 items-center"
            >
              <Image height={20} priority src={saveIcon} alt="Enregistrer" />
              Enregistrer
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
