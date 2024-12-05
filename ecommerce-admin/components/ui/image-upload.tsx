"use client";

import { useState, useEffect } from "react";
import { ImagePlus, Trash } from "lucide-react";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";

import { Button } from "@/components/ui/button";

interface ImageUploadProps {
  disabled: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  disabled,
  onChange,
  onRemove,
  value,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  const onUpload = (result: any) => {
    console.log(result);
    console.log(result.info.secure_url);
    onChange(result.info.secure_url);
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    console.log("Current value:", value);
  }, [value]);

  if (!isMounted) {
    //to avoid hydration error
    return null;
  }

  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        {value.map((url) => (
          <div
            key={url}
            className="relative w-[200px] h-[200px] rounded-md overflow-hidden"
          >
            <div className="z-10 absolute top-2 right-2">
              <Button
                variant="destructive"
                size="icon"
                type="button"
                onClick={() => onRemove(url)}
              >
                <Trash className="h-4 w-4"></Trash>
              </Button>
            </div>
            <Image fill className="object-cover" alt="Image" src={url}></Image>
          </div>
        ))}
      </div>
      <CldUploadWidget onSuccess={onUpload} uploadPreset="commerce">
        {({ open }) => {
          const onClick = () => {
            open();
          };

          return (
            <Button
              type="button"
              disabled={disabled}
              variant="secondary"
              onClick={onClick}
            >
              <ImagePlus className="h-4 w-4 mr-2" />
              Upload an image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;
