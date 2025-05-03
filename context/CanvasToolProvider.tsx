"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import {
  StoredImage,
  getAllImages,
  addImage as addImageToDb,
  removeImage as removeImageFromDb,
  clearImages as clearImagesFromDb,
} from "@/lib/indexed-db-utils";

type TextConfig = {
  content: string;
  fontFamily: string;
};

export type PromptConfig = {
  content: string;
};

type CanvasToolContextType = {
  images: StoredImage[];

  addImage: (data: string) => Promise<void>;
  removeImage: (id: string) => Promise<void>;

  essentialImages: string[];
  toggleEssentialImage: (id: string) => void;

  textContent: TextConfig;
  setTextContent: Dispatch<SetStateAction<TextConfig>>;

  selected: string;
  selectedImage?: StoredImage;
  setSelected: Dispatch<SetStateAction<string>>;

  isFrozen: boolean;
  setIsFrozen: Dispatch<SetStateAction<boolean>>;

  prompt: PromptConfig;
  setPrompt: Dispatch<SetStateAction<PromptConfig>>;
};

const CanvasToolContext = createContext<CanvasToolContextType | undefined>(
  undefined
);

export const CanvasToolProvider = ({ children }: { children: ReactNode }) => {
  const [essentialImages, setEssentialImages] = useState<string[]>([]);
  const [images, setImages] = useState<StoredImage[]>([]);
  const [textContent, setTextContent] = useState<TextConfig>({
    content: "",
    fontFamily: "",
  });
  const [prompt, setPrompt] = useState<PromptConfig>({
    content: "",
  });
  const [selected, setSelected] = useState<string>("");
  const [isFrozen, setIsFrozen] = useState<boolean>(false);

  // Charger les images depuis IndexedDB au montage
  useEffect(() => {
    const loadImages = async () => {
      const stored = await getAllImages();
      setImages(stored);
    };
    loadImages();
  }, []);

  const selectedImage = images.filter((image) => image.id === selected)[0];

  const addImage = async (data: string) => {
    const newImage = await addImageToDb(data);
    setImages((prev) => [...prev, newImage]);
  };

  const removeImage = async (id: string) => {
    await removeImageFromDb(id);
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  const toggleEssentialImage = (id: string) => {
    console.log(id);
    if (essentialImages.includes(id)) {
      setEssentialImages((prevIds) => prevIds.filter((i) => i !== id));
    } else {
      setEssentialImages((prevIds) => [...prevIds, id]);
    }
  };

  console.log(essentialImages[0]);

  return (
    <CanvasToolContext.Provider
      value={{
        images,
        addImage,
        removeImage,
        textContent,
        setTextContent,
        selectedImage,
        selected,
        setSelected,
        isFrozen,
        setIsFrozen,
        prompt,
        setPrompt,
        essentialImages,
        toggleEssentialImage,
      }}
    >
      {children}
    </CanvasToolContext.Provider>
  );
};

export const useCanvasTool = () => {
  const context = useContext(CanvasToolContext);
  if (!context) {
    throw new Error("useCanvasTool must be used within a CanvasToolProvider");
  }
  return context;
};
