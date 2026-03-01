// components/advanced-water-ripple.tsx
"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const WaterWave = dynamic(() => import("react-water-wave"), {
  ssr: false,
  loading: () => (
    <div
      role="status"
      className="flex items-center justify-center h-screen w-full"
    >
      <svg
        aria-hidden="true"
        className="inline w-10 h-10 mr-2 text-gray-200 animate-spin fill-accent"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          className="fill-primary"
        />
      </svg>
    </div>
  ),
});

interface AdvancedWaterRippleProps {
  imageUrl?: string;
  dropRadius?: number;
  perturbance?: number;
  resolution?: number;
  children?: React.ReactNode;
  className?: string;
}

export default function AdvancedWaterRipple({
  imageUrl = "",
  dropRadius = 20,
  perturbance = 0.03,
  resolution = 256,
  children,
  className = "",
}: AdvancedWaterRippleProps) {
  const [optimizedImageUrl, setOptimizedImageUrl] = useState<string>("");

  useEffect(() => {
    // Create a high-quality version of the image
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.src = imageUrl;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      // Set to viewport size for best quality
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const ctx = canvas.getContext("2d");
      if (ctx) {
        // Draw image to fill canvas (cover behavior)
        const imgRatio = img.width / img.height;
        const canvasRatio = canvas.width / canvas.height;

        let drawWidth, drawHeight, offsetX, offsetY;

        if (imgRatio > canvasRatio) {
          drawHeight = canvas.height;
          drawWidth = drawHeight * imgRatio;
          offsetX = (canvas.width - drawWidth) / 2;
          offsetY = 0;
        } else {
          drawWidth = canvas.width;
          drawHeight = drawWidth / imgRatio;
          offsetX = 0;
          offsetY = (canvas.height - drawHeight) / 2;
        }

        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
        setOptimizedImageUrl(canvas.toDataURL("image/jpeg", 0.95));
      }
    };
  }, [imageUrl]);

  if (!optimizedImageUrl) {
    return (
      <div
        className={`flex items-center justify-center min-h-[86vh] ${className}`}
      >
        <div className="animate-spin w-10 h-10 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className={`${className}`}>
      <WaterWave
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          backgroundRepeat: "none",
          backgroundPosition: "center center",
          backgroundClip: "none",
          backgroundSize: "cover",
        }}
        imageUrl={imageUrl}
        dropRadius={dropRadius}
        perturbance={perturbance}
        resolution={resolution}
        interactive={true}
      >
        {() => (
          <div className="min-h-[86vh] bg-gradient-dark relative flex items-center justify-start px-12 py-6">
            {children}
          </div>
        )}
      </WaterWave>
    </div>
  );
}
