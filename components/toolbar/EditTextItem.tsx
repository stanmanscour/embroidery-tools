"use client";

import React, { useState } from "react";
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

import { options } from "@/fonts";
import { ChevronUp, TypeOutline, WholeWord } from "lucide-react";
import { useCanvasTool } from "@/context/CanvasToolProvider";

export type textConfig = { content: string; fontFamily: string };

export const EditTextItem = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { textContent, setTextContent } = useCanvasTool();

  return (
    <>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-h-full rounded-lg w-[90%] max-w-xl overflow-y-auto mt-4">
          <DialogHeader>
            {/* <DialogTitle className="text-center "> */}
            <div className="flex flex-row gap-2 justify-center">
              <WholeWord height={24} width={24} />
              <TypeOutline height={24} width={24} />
            </div>
            {/* </DialogTitle> */}
          </DialogHeader>

          <form
            onSubmit={(e) => {
              e.preventDefault(); // 🛑 empêche le rechargement
              setIsModalOpen(false);
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
                value={textContent.content}
                onChange={(e) =>
                  setTextContent((prevState) => ({
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
                value={textContent.fontFamily}
                onValueChange={(value) =>
                  setTextContent((prevState) => ({
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

            <div className="flex justify-end gap-2 mt-2">
              <Button
                variant="secondary"
                type="submit"
                className="flex gap-1 items-center"
              >
                {/* <Image height={20} priority src={saveIcon} alt="Enregistrer" /> */}
                Fermer
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      <button
        onClick={() => setIsModalOpen(true)}
        className="h-[48px] mb-5 p-3 text-black bg-white gap-1  border shadow-md rounded-lg flex flex-row justify-center items-center"
      >
        <div className="flex flex-row gap-2">
          <WholeWord height={24} width={24} />
          <TypeOutline height={24} width={24} />
        </div>
        <ChevronUp height={20} width={20} color="lightgray" />
      </button>
    </>
  );
};
