import { useEffect, useState } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { User } from "lucide-react";

interface CartoonAvatarProps {
  src: string;
  alt?: string;
  className?: string;
}

export function CartoonAvatar({ src, alt, className }: CartoonAvatarProps) {
  const [processedImage, setProcessedImage] = useState<string>(src);

  useEffect(() => {
    const processImage = async () => {
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();

        img.crossOrigin = "anonymous";
        img.src = src;

        await new Promise((resolve) => {
          img.onload = () => {
            // Set canvas size
            canvas.width = img.width;
            canvas.height = img.height;

            if (!ctx) return;

            // Draw original image
            ctx.drawImage(img, 0, 0);

            // Apply cartoon effect
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;

            // Simplify colors (posterize effect)
            for (let i = 0; i < data.length; i += 4) {
              data[i] = Math.floor(data[i] / 32) * 32;     // R
              data[i + 1] = Math.floor(data[i + 1] / 32) * 32; // G
              data[i + 2] = Math.floor(data[i + 2] / 32) * 32; // B
            }

            ctx.putImageData(imageData, 0, 0);

            // Edge detection (simple)
            ctx.globalCompositeOperation = 'multiply';
            ctx.filter = 'contrast(150%) brightness(110%)';
            ctx.drawImage(canvas, 0, 0);

            // Reset composite operation
            ctx.globalCompositeOperation = 'source-over';

            // Convert to data URL
            setProcessedImage(canvas.toDataURL('image/jpeg', 0.8));
            resolve(true);
          };
        });
      } catch (error) {
        console.error('Failed to process image:', error);
      }
    };

    processImage();
  }, [src]);

  return (
    <Avatar className={className}>
      <AvatarImage 
        src={processedImage} 
        alt={alt || "Profile"} 
        className="object-cover"
      />
      <AvatarFallback>
        <User className="h-16 w-16" />
      </AvatarFallback>
    </Avatar>
  );
}