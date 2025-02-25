"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { Plus, Upload, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Button } from "@/components/ui/button";

type ImageItem = {
  id: string;
  url: string;
  file?: File;
};

export default function ImageUpload({
  value = [],
  onChange,
}: {
  value?: ImageItem[];
  onChange: (images: ImageItem[]) => void;
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle new file uploads
  const handleFiles = useCallback(
    (files: FileList) => {
      const newImages = Array.from(files)
        .filter((file) => file.type.startsWith("image/"))
        .map((file) => ({
          id: Math.random().toString(36).slice(2),
          url: URL.createObjectURL(file),
          file,
        }));

      onChange([...value, ...newImages]);
    },
    [onChange, value]
  );

  // Remove image from the list
  const removeImage = useCallback(
    (index: number) => {
      const newImages = value.filter((_, i) => i !== index);
      onChange(newImages);
      setSelectedIndex(Math.max(0, index - 1));
    },
    [onChange, value]
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="w-full max-w-2xl mx-auto p-4 space-y-4">
        <h2 className="text-2xl font-semibold">Upload Image</h2>

        {/* Drop Zone / Main Image Preview */}
        <div
          onDrop={(e) => {
            e.preventDefault();
            setIsDraggingOver(false);
            handleFiles(e.dataTransfer.files);
          }}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDraggingOver(true);
          }}
          onDragLeave={(e) => {
            e.preventDefault();
            setIsDraggingOver(false);
          }}
          onClick={() => fileInputRef.current?.click()}
          className={cn(
            "aspect-square w-full relative h-44 bg-muted rounded-lg overflow-hidden cursor-pointer",
            isDraggingOver
              ? "bg-primary/10 border-2 border-dashed border-primary"
              : "border-2 border-dashed border-muted-foreground/25"
          )}
        >
          {value.length > 0 ? (
            <Image
              src={value[selectedIndex]?.url || "/placeholder.svg"}
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

        {/* Image Thumbnails */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {value.map((image, index) => (
            <div
              key={image.id}
              className={cn(
                "relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-opacity group",
                index === selectedIndex ? "border-primary" : "border-muted"
              )}
              onClick={() => setSelectedIndex(index)}
            >
              <Image
                src={image.url}
                alt={`Thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeImage(index);
                }}
                className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}

          {value.length < 5 && (
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
