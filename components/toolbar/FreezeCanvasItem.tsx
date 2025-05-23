import { useCanvasTool } from "@/context/CanvasToolProvider";
import { Hand, LockKeyhole, LockKeyholeOpen } from "lucide-react";

export const FreezeCanvasItem = () => {
  const { isFrozen, setIsFrozen } = useCanvasTool();

  return (
    <>
      <button
        onClick={() => setIsFrozen((previousState: boolean) => !previousState)}
        className="h-[48px] p-3 text-black bg-white gap-1  border shadow-md hover:opacity-80 active:opacity-50 rounded-lg flex flex-row justify-center items-center"
      >
        <div className="flex flex-row gap-1 items-center">
          <Hand height={24} width={24} />
          {isFrozen ? (
            <LockKeyhole height={16} width={16} color="red" />
          ) : (
            <LockKeyholeOpen height={16} width={16} color="lightgray" />
          )}
        </div>
      </button>
    </>
  );
};
