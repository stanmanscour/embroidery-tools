import { useCanvasTool } from "@/context/CanvasToolProvider";
import { ImagePlus } from "lucide-react";
import { useRef } from "react";

export const UploadItem = () => {
  const { setImageURL, setIsFrozen } = useCanvasTool();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = (file: Blob) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        setImageURL(reader.result);
        setIsFrozen(false);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <input
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
      <button
        onClick={() => fileInputRef.current?.click()}
        className="h-[48px] mb-5 p-3 text-black bg-white gap-1  border shadow-lg rounded-lg flex flex-row justify-center items-center"
      >
        <ImagePlus height={24} width={24} />
      </button>
    </>
  );
};
