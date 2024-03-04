"use client";
import dynamic from "next/dynamic";

const Canvas = dynamic(() => import("../components/Canvas"), {
  ssr: false,
});

export default function Page() {
  return (
    <div
      style={{ backgroundImage: `url('/quadrillage2.jpg')` }}
      className="h-screen bg-cover bg-center text-white border-b-8 border-b-solid border-b-slate-400"
    >
      <Canvas />
    </div>
  );
}
