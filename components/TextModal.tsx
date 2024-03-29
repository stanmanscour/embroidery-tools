"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Button,
  Modal,
  Dialog,
  Select,
  SelectValue,
  Popover,
  ListBox,
  ListBoxItem,
  ModalOverlay,
  TextField,
  Label,
  Input,
} from "react-aria-components";

import moveIcon from "../public/icons/move.svg";
import photoIcon from "../public/icons/photo.svg";
import saveIcon from "../public/icons/save.svg";
import { TransformableText } from "./TransformableText";
import {
  caveat,
  inter,
  libre_barskerville,
  noto_sans,
  roboto,
} from "@/app/fonts";

export type textConfig = { content: string; fontFamily: string };

const options = [
  {
    label: "Inter",
    fontFamily: inter.style.fontFamily,
    className: inter.className,
  },
  {
    label: "Caveat",
    fontFamily: caveat.style.fontFamily,
    className: caveat.className,
  },
  {
    label: "Roboto",
    fontFamily: roboto.style.fontFamily,
    className: roboto.className,
  },
  {
    label: "Noto Sans",
    fontFamily: noto_sans.style.fontFamily,
    className: noto_sans.className,
  },
  {
    label: "Libre Barskerville",
    fontFamily: libre_barskerville.style.fontFamily,
    className: libre_barskerville.className,
  },
];

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
    <ModalOverlay
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      isDismissable
      className="fixed left-0 top-0  z-20 flex h-[--visual-viewport-height] w-full items-center justify-center p-4 text-center backdrop-blur-sm backdrop-brightness-75"
    >
      <Modal
        isDismissable
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        className="max-h-full w-full max-w-xl overflow-y-scroll rounded-xl border-gray bg-white bg-clip-padding text-left align-middle shadow-xl"
      >
        <Dialog>
          <form className="p-3">
            <h1 className="text-center text-lg">Ajouter du texte</h1>
            <div className="flex flex-col gap-3">
              <TextField className="flex flex-col gap-1" autoFocus>
                <Label className="text-sm">Texte</Label>
                <Input
                  value={textConfig.content}
                  onChange={(e) =>
                    setTextConfig((prevState) => ({
                      ...prevState,
                      content: e.target.value,
                    }))
                  }
                  placeholder="Texte..."
                  className="p-2 border border-gray-200 rounded-md data-[focused]:bg-slate-50 hover:bg-slate-50 cursor-pointer"
                />
              </TextField>

              <Select
                selectedKey={textConfig.fontFamily}
                onSelectionChange={(fontFamily) =>
                  setTextConfig((prevState) => ({
                    ...prevState,
                    fontFamily: fontFamily as string,
                  }))
                }
                className="flex flex-col gap-1"
              >
                <Label className="text-sm">Police</Label>
                <Button className="flex flex-row w-full p-2 border border-gray-200 data-[pressed]:bg-slate-50 rounded-md justify-between focused:hover:bg-slate-50 hover:bg-slate-50">
                  <SelectValue />
                  <span aria-hidden="true">▼</span>
                </Button>
                <Popover className="min-w-[var(--trigger-width)]">
                  <ListBox className="bg-white border w-full cursor-pointer rounded-md [&>*:last-child]:border-b-0">
                    {options.map((option) => (
                      <ListBoxItem
                        key={option.label}
                        id={option.fontFamily}
                        // value={{ fontFamily: roboto_mono.style.fontFamily }}
                        className={`p-2 border-b text-md ${option.className} hover:bg-slate-50`}
                      >
                        {option.label}
                      </ListBoxItem>
                    ))}
                  </ListBox>
                </Popover>
              </Select>

              <div className="flex flex-row justify-between gap-2 mt-2">
                <Button
                  onPress={() => setIsOpen(false)}
                  className="hover:bg-slate-50 flex gap-1 rounded-md  p-2 border-2 items-center border-gray-200"
                >
                  <span className="text-black text-sm">Annuler</span>
                </Button>
                <Button
                  onPress={handleSave}
                  className="hover:bg-slate-50 flex gap-1 rounded-md bg-gray-100 p-2 border-2 items-center border-gray-200"
                >
                  <Image
                    height={20}
                    priority
                    src={saveIcon}
                    alt="Choisir une image"
                  />
                  <span className="text-black text-sm">Enregistrer</span>
                </Button>
              </div>
            </div>
          </form>
        </Dialog>
      </Modal>
    </ModalOverlay>
  );
};
