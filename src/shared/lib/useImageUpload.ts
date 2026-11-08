import { useRef, useState } from "react";
import { processFile } from "../helpers/processFile";

export const useImageUpload = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDropzoneClick = () => {
    fileInputRef.current?.click();
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>, onFileLoaded: (base64: string) => void) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    
    const base64 = await processFile(file);
    onFileLoaded(base64);
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  return {
    fileInputRef,
    isDragging,
    handleDropzoneClick,
    handleDrop,
    handleDragEnter,
    handleDragLeave,
  };
};