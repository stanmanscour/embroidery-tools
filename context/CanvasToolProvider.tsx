"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

type TextConfig = {
  content: string;
  fontFamily: string;
};

export type PromptConfig = {
  content: string;
};

type CanvasToolContextType = {
  imageURL: string;
  setImageURL: Dispatch<SetStateAction<string>>;

  textContent: TextConfig;
  setTextContent: Dispatch<SetStateAction<TextConfig>>;

  selected: string;
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
  const [imageURL, setImageURL] = useState<string>("");
  const [textContent, setTextContent] = useState<TextConfig>({
    content: "",
    fontFamily: "",
  });
  const [prompt, setPrompt] = useState<PromptConfig>({
    content: "",
  });
  const [selected, setSelected] = useState<string>("");
  const [isFrozen, setIsFrozen] = useState<boolean>(false);

  return (
    <CanvasToolContext.Provider
      value={{
        imageURL,
        setImageURL,
        textContent,
        setTextContent,
        selected,
        setSelected,
        isFrozen,
        setIsFrozen,
        prompt,
        setPrompt,
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
