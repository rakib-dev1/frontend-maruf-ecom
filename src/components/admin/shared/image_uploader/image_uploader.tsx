"use client";

import type React from "react";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { Plus, Upload, X } from "lucide-react";
import { cn } from "@/lib/utils";

import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Button } from "@/components/ui/button";

type ImageItem = {
  id: string;
  url: string;
};

const DraggableThumb = ({
  image,
  index,
  moveImage,
  isSelected,
  onClick,
  onRemove,
}: {
  image: ImageItem;
  index: number;
  moveImage: (dragIndex: number, hoverIndex: number) => void;
  isSelected: boolean;
  onClick: () => void;
  onRemove: () => void;
}) => {
  const [{ isDragging }, drag] = useDrag({
    type: "IMAGE",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "IMAGE",
    hover: (item: { index: number }) => {
      if (item.index !== index) {
        moveImage(item.index, index);
        item.index = index;
      }
    },
  });

  return (
    <div
      ref={(node) => {
        if (node) {
          drag(drop(node));
        }
      }}
      className={cn(
        "relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-opacity group",
        isSelected ? "border-primary" : "border-muted",
        isDragging ? "opacity-50" : "opacity-100"
      )}
      onClick={onClick}
    >
      <Image
        src={image.url || "/placeholder.svg"}
        alt={`Thumbnail ${index + 1}`}
        fill
        className="object-cover"
      />
      <button
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
        className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label="Remove image"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default function ImageUpload() {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback((files: FileList) => {
    Array.from(files).forEach((file) => {
      if (!file.type.startsWith("image/")) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target && e.target.result) {
          const result = e.target.result as string;
          setImages((prev) => [
            ...prev,
            {
              id: Math.random().toString(36).slice(2),
              url: result,
            },
          ]);
        }
      };
      reader.readAsDataURL(file);
    });
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDraggingOver(false);
      handleFiles(e.dataTransfer.files);
    },
    [handleFiles]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(false);
  }, []);

  const moveImage = useCallback((dragIndex: number, hoverIndex: number) => {
    setImages((prevImages) => {
      const draggedImage = prevImages[dragIndex];
      const newImages = [...prevImages];
      newImages.splice(dragIndex, 1);
      newImages.splice(hoverIndex, 0, draggedImage);
      return newImages;
    });

    setSelectedIndex((prevIndex) => {
      if (prevIndex === dragIndex) return hoverIndex;
      if (prevIndex === hoverIndex) return dragIndex;
      return prevIndex;
    });
  }, []);

  const removeImage = useCallback((index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setSelectedIndex((prevIndex) => {
      if (prevIndex === index) return Math.max(0, index - 1);
      if (prevIndex > index) return prevIndex - 1;
      return prevIndex;
    });
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="w-full max-w-2xl mx-auto p-4 space-y-4">
        <h2 className="text-2xl font-semibold">Upload Img</h2>

        {/* Main preview area / Drop zone */}
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
          className={cn(
            "aspect-square w-full relative h-44 bg-muted rounded-lg overflow-hidden cursor-pointer",
            "transition-colors duration-200",
            isDraggingOver
              ? "bg-primary/10 border-2 border-dashed border-primary"
              : "border-2 border-dashed border-muted-foreground/25"
          )}
        >
          {images.length > 0 ? (
            <Image
              src={images[selectedIndex]?.url || "/placeholder.svg"}
              alt="Selected image preview"
              fill
              className="object-contain"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground">
              <Upload className="w-10 h-10 mb-2" />
              <p>Drag and drop images here or click to upload</p>
            </div>
          )}
        </div>

        {/* Draggable thumbnails */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <DraggableThumb
              key={image.id}
              image={image}
              index={index}
              moveImage={moveImage}
              isSelected={index === selectedIndex}
              onClick={() => setSelectedIndex(index)}
              onRemove={() => removeImage(index)}
            />
          ))}

          {images.length < 5 && (
            <Button
              variant="outline"
              size="icon"
              className="w-20 h-20 flex-shrink-0"
              onClick={() => fileInputRef.current?.click()}
            >
              <Plus className="h-6 w-6" />
              <span className="sr-only">Add more images</span>
            </Button>
          )}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => e.target.files && handleFiles(e.target.files)}
        />
      </div>
    </DndProvider>
  );
}
