import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { User } from "lucide-react";
import { cn } from "@/lib/utils";

interface CartoonAvatarProps {
  src: string;
  alt?: string;
  className?: string;
}

export function CartoonAvatar({ src, alt, className }: CartoonAvatarProps) {
  return (
    <Avatar className={cn("rounded-lg overflow-hidden", className)}>
      <AvatarImage 
        src={src} 
        alt={alt || "Profile"} 
        className="object-cover"
      />
      <AvatarFallback className="rounded-lg">
        <User className="h-16 w-16" />
      </AvatarFallback>
    </Avatar>
  );
}