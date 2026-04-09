"use client";

import { useDispatch } from "react-redux";
import { setScale } from "@/redux/slice/viewport";
import { ZoomIn, ZoomOut } from "lucide-react";
import { Button } from "@/components/ui/button"; // adjust import as needed
import { useInfiniteCanvas } from "@/hooks/use-canvas";

const ZoomBar = () => {
  const dispatch = useDispatch();
  const { viewport } = useInfiniteCanvas();

  const handleZoomOut = () => {
    const newScale = Math.max(viewport.scale / 1.2, viewport.minScale);
    dispatch(setScale({ scale: newScale }));
  };

  const handleZoomIn = () => {
    const newScale = Math.min(viewport.scale * 1.2, viewport.maxScale);

    dispatch(setScale({ scale: newScale }));
  };

  return (
    <div className="col-span-1 flex justify-end items-center">
      <div className="flex items-center gap-1 backdrop-blur-xl bg-white/8 border border-white/12 rounded-full p-3 saturate-150">
        <Button
          variant="ghost"
          size="lg"
          onClick={handleZoomOut}
          className="w-9 h-9 p-0 rounded-full cursor-pointer hover:bg-white/12 border border-transparent hover:border-white/16 transition-all"
          title="Zoom Out"
        >
          <ZoomOut className="w-4 h-4 text-primary/50" />
        </Button>

        <div className="text-center">
          <span className="text-sm font-mono leading-none text-primary/50">
            {Math.round(viewport.scale * 100)}%
          </span>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleZoomIn}
          className="w-9 h-9 p-0 rounded-full cursor-pointer hover:bg-white/12 border border-transparent hover:border-white/16 transition-all"
          title="Zoom In"
        >
          <ZoomIn className="w-4 h-4 text-primary/50" />
        </Button>
      </div>
    </div>
  );
};

export default ZoomBar;
