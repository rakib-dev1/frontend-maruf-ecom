"use client";

import { useState } from "react";
import Image from "next/image";

interface ProductImageViewerProps {
  images: string[];
  className?: string;
}

export default function ProductImageViewer({
  images,
  className = "",
}: ProductImageViewerProps) {
  const [currentImage, setCurrentImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  // If no images are provided, show a placeholder
  if (!images || images.length === 0) {
    return (
      <div className={`relative h-[400px] w-full bg-muted ${className}`}>
        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
          No image available
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Main image view */}
      <div
        className="relative h-[400px] w-full overflow-hidden rounded-lg border bg-background cursor-pointer"
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
      >
        <Image
          src={images[currentImage] || "/placeholder.svg"}
          alt={`Product image ${currentImage + 1}`}
          fill
          priority
          className={`object-cover object-center transition-all duration-300 ${
            isZoomed ? "scale-125" : "scale-100"
          }`}
        />
      </div>

      {/* Thumbnails row */}
      <div className="flex space-x-2 overflow-x-auto p-2">
        {images.map((imageUrl, index) => (
          <div
            key={index}
            className={`relative h-20 w-20 flex-shrink-0 cursor-pointer overflow-hidden rounded-md border ${
              currentImage === index ? "ring-2 ring-primary" : ""
            }`}
            onMouseEnter={() => setCurrentImage(index)}
            onClick={() => setCurrentImage(index)}
          >
            <Image
              src={imageUrl || "/placeholder.svg"}
              alt={`Product thumbnail ${index + 1}`}
              fill
              className="object-cover object-center"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
