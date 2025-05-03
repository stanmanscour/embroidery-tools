"use client";

import { useCanvasTool } from "@/context/CanvasToolProvider";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { ChevronUp, ImagePlus, Images, Star, Upload } from "lucide-react";
import { useRef, useState } from "react";
import { StoredImage } from "@/lib/indexed-db-utils";
import { ESSENTIAL_PAULETTE_LOGO_ID } from "../essentials/PauletteLogo/EssentialPauletteLogo";
import { pauletteLogoBase64 } from "../essentials/PauletteLogo/data";

export const UploadItem = () => {
  const {
    images,
    addImage,
    removeImage,
    setIsFrozen,
    essentialImages,
    toggleEssentialImage,
  } = useCanvasTool();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleUpload = (file: Blob) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        const newString = reader.result;
        addImage(newString);
        setIsFrozen(false);
        setIsDrawerOpen(false);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent className="max-h-[95%] rounded-t-xl px-6 py-4 overflow-y-auto">
          <DrawerHeader>
            <DrawerTitle className="text-xl">Importer une image</DrawerTitle>
          </DrawerHeader>

          <div className="flex flex-col gap-8 p-1">
            <div className="flex flex-col gap-1">
              {/* Input caché */}
              <input
                id="file-upload"
                ref={fileInputRef}
                type="file"
                accept="image/png, image/jpeg, image/svg+xml, image/webp"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    handleUpload(e.target.files[0]);
                  }
                }}
              />

              {/* Bouton qui déclenche l'input */}
              <Button
                variant="outline"
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="mt-2 h-20 hover:opacity-80 text-md active:opacity-50 border-dotted bg-slate-50"
              >
                <Upload height={24} width={24} color="lightgray" />
                Sélectionner un fichier
              </Button>

              <p className="text-xs text-gray-500 mt-1">
                Formats supportés : PNG, JPEG, SVG, WEBP
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-sm gap-2 flex flex-row items-center">
                <Images height={24} width={24} color="lightgray" />
                Images
              </p>
              {images.length ? (
                <div className="flex flex-col gap-5">
                  {images.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-row gap-4 items-center"
                    >
                      <div className=" border shadow-sm rounded-sm flex items-center justify-center">
                        <img src={item.data} height={64} width={64} />
                      </div>
                      <Button
                        variant="destructive"
                        onClick={() => removeImage(item.id)}
                      >
                        Supprimer
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">Pas encore d&apos;image</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-sm gap-2 flex flex-row items-center">
                <Star height={24} width={24} color="lightgray" />
                Essentiels
              </p>
              <div className="flex flex-col gap-5">
                <div className="flex flex-row gap-4 items-center">
                  <div className=" border shadow-sm rounded-sm flex items-center justify-center">
                    <img src={pauletteLogoBase64} height={64} width={64} />
                  </div>
                  {essentialImages.includes(ESSENTIAL_PAULETTE_LOGO_ID) ? (
                    <Button
                      variant="destructive"
                      onClick={() =>
                        toggleEssentialImage(ESSENTIAL_PAULETTE_LOGO_ID)
                      }
                    >
                      Cacher
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      onClick={() =>
                        toggleEssentialImage(ESSENTIAL_PAULETTE_LOGO_ID)
                      }
                    >
                      Afficher
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
      {/* Bouton principal pour ouvrir le drawer */}
      <button
        onClick={() => setIsDrawerOpen(true)}
        className="h-[48px] p-3 text-black bg-white gap-1 border shadow-md hover:opacity-80 active:opacity-50 rounded-lg flex flex-row justify-center items-center"
      >
        <ImagePlus height={24} width={24} />
        <ChevronUp height={20} width={20} color="lightgray" />
      </button>
    </>
  );
};
