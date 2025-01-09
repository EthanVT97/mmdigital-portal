import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "./button";
import { cn } from "@/lib/utils";

interface UploadProps {
  onUpload: (files: File[]) => void;
  accept?: Record<string, string[]>;
  maxFiles?: number;
  maxSize?: number;
  className?: string;
}

export function Upload({
  onUpload,
  accept,
  maxFiles = 1,
  maxSize = 5242880, // 5MB
  className,
}: UploadProps) {
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setFiles(acceptedFiles);
      onUpload(acceptedFiles);
    },
    [onUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxFiles,
    maxSize,
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        "border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:border-primary transition-colors",
        isDragActive && "border-primary bg-primary/10",
        className
      )}
    >
      <input {...getInputProps()} />
      {files.length > 0 ? (
        <div className="space-y-2">
          {files.map((file) => (
            <div key={file.name} className="text-sm">
              {file.name} - {(file.size / 1024).toFixed(2)} KB
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              setFiles([]);
            }}
          >
            Remove
          </Button>
        </div>
      ) : isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag & drop files here, or click to select files</p>
      )}
    </div>
  );
}
