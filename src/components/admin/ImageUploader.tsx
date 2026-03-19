import { useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ImageUploaderProps {
  bucket: string;
  folder?: string;
  value?: string;
  onChange: (url: string) => void;
  onRemove?: () => void;
  className?: string;
  accept?: string;
  maxSizeMB?: number;
}

const ImageUploader = ({
  bucket,
  folder = "",
  value,
  onChange,
  onRemove,
  className,
  accept = "image/*",
  maxSizeMB = 5,
}: ImageUploaderProps) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [dragOver, setDragOver] = useState(false);

  const uploadFile = useCallback(
    async (file: File) => {
      setError("");

      // Validate size
      if (file.size > maxSizeMB * 1024 * 1024) {
        setError(`File quá lớn. Tối đa ${maxSizeMB}MB.`);
        return;
      }

      // Validate type
      if (!file.type.startsWith("image/")) {
        setError("Chỉ chấp nhận file hình ảnh.");
        return;
      }

      setUploading(true);

      try {
        const ext = file.name.split(".").pop();
        const fileName = `${folder ? folder + "/" : ""}${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

        const { error: uploadError } = await supabase.storage
          .from(bucket)
          .upload(fileName, file, { upsert: true });

        if (uploadError) throw uploadError;

        const { data } = supabase.storage
          .from(bucket)
          .getPublicUrl(fileName);

        onChange(data.publicUrl);
      } catch (err) {
        setError("Upload thất bại. Vui lòng thử lại.");
        console.error("Upload error:", err);
      } finally {
        setUploading(false);
      }
    },
    [bucket, folder, maxSizeMB, onChange]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file) uploadFile(file);
    },
    [uploadFile]
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) uploadFile(file);
    },
    [uploadFile]
  );

  if (value) {
    return (
      <div className={cn("relative inline-block", className)}>
        <img
          src={value}
          alt="Uploaded"
          className="w-full h-40 object-cover rounded-lg border"
        />
        {onRemove && (
          <button
            onClick={onRemove}
            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
          >
            <X className="w-3 h-3" />
          </button>
        )}
      </div>
    );
  }

  return (
    <div className={className}>
      <label
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={cn(
          "flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer transition-colors",
          dragOver
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 hover:border-gray-400 bg-gray-50"
        )}
      >
        <input
          type="file"
          accept={accept}
          onChange={handleFileSelect}
          className="hidden"
          disabled={uploading}
        />
        {uploading ? (
          <div className="text-center">
            <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
            <p className="text-sm text-gray-500">Đang tải lên...</p>
          </div>
        ) : (
          <div className="text-center">
            {dragOver ? (
              <ImageIcon className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            ) : (
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            )}
            <p className="text-sm text-gray-500">
              Kéo thả hoặc click để chọn ảnh
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Tối đa {maxSizeMB}MB
            </p>
          </div>
        )}
      </label>
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default ImageUploader;
