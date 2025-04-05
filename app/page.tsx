"use client";
import { CanvasToolProvider } from "@/context/CanvasToolProvider";
import dynamic from "next/dynamic";

const Canvas = dynamic(() => import("../components/Canvas"), {
  ssr: false,
});

export default function Page() {
  return (
    <CanvasToolProvider>
      <Canvas />
    </CanvasToolProvider>
  );
}
