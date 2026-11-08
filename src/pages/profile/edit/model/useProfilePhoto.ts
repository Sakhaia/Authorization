import { useRef, useState } from "react";
import { useController, useFormContext } from "react-hook-form";
import type { EditProfileFormValues } from "./types";
import { processFile } from "@/shared/helpers/processFile";

export const useProfilePhoto = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {watch} = useFormContext<EditProfileFormValues>();
  const avatarUrl = watch('avatarUrl')
  const { field } = useController<EditProfileFormValues, "image">({
    name: "image",
  });
  const [isDragging, setIsDragging] = useState(false);

  const handleDropzoneClick = () => {
    fileInputRef.current?.click();
  };

  const handleFile = async (file: File) => {
    const base64 = await processFile(file);
    field.onChange(base64);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    await handleFile(file);
  };

  const handleDelete = () => {
    field.onChange(null); // явное удаление
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false)
    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    await handleFile(file);
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
    field,
    avatarUrl,
    handleDelete,
    isDragging,
    handleDropzoneClick,
    handleDrop,
    fileInputRef,
    handleFileChange,
    handleDragEnter,
    handleDragLeave,
  };
};
