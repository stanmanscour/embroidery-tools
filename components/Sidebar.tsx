import {
  CaseSensitive,
  ChevronUp,
  ChevronUpCircle,
  ImagePlus,
  Paperclip,
  Pin,
  PinOff,
  Sparkles,
  Text,
  Type,
  TypeOutline,
  WholeWord,
} from "lucide-react";
import { UploadItem } from "./toolbar/UploadItem";
import { EditTextItem } from "./toolbar/2";
import { FreezeCanvasItem } from "./toolbar/FreezeCanvasItem";

export const Sidebar = () => (
  <div className="flex align-items-center justify-center gap-3">
    <UploadItem />
    <EditTextItem />
    <FreezeCanvasItem />
  </div>
);
