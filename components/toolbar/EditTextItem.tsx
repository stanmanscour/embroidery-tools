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
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { textContent, setTextContent } = useCanvasTool();

  return (
    <>
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent className="max-h-[95%] rounded-t-xl px-6 py-4 overflow-y-auto">
          <DrawerHeader>
            <DrawerTitle className="text-xl">Ajouter du texte</DrawerTitle>
          </DrawerHeader>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setIsDrawerOpen(false);
            }}
            className="p-1 flex flex-col gap-5"
          >
            <div className="flex flex-col gap-1">
              <Label
                htmlFor="text-input"
                className="text-sm gap-2 flex flex-row items-center"
              >
                <WholeWord height={24} width={24} color="lightgray" />
                Texte
              </Label>
              <Input
                id="text-input"
                placeholder="Texte..."
                className="hover:opacity-80"
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
              <Label
                htmlFor="font-select"
                className="text-sm gap-2 flex flex-row items-center"
              >
                <TypeOutline height={24} width={24} color="lightgray" />
                Typographie
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
                <SelectTrigger
                  id="font-select"
                  className="w-full hover:opacity-80 active:opacity-50"
                >
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
                type="submit"
                className="flex gap-1 items-center hover:opacity-80 active:opacity-50"
              >
                Fermer
              </Button>
            </div>
          </form>
        </DrawerContent>
      </Drawer>

      <button
        onClick={() => setIsDrawerOpen(true)}
        className="h-[48px] p-3 text-black bg-white gap-1 border shadow-md hover:opacity-80 active:opacity-50 rounded-lg flex flex-row justify-center items-center "
      >
        <TypeOutline height={24} width={24} />

        <ChevronUp height={20} width={20} color="lightgray" />
      </button>
    </>
  );
};
