import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { User } from "lucide-react";

interface CartoonAvatarProps {
  src: string;
  alt?: string;
  className?: string;
}

export function CartoonAvatar({ src, alt, className }: CartoonAvatarProps) {
  return (
    <Avatar className={className}>
      <AvatarImage 
        src={src} 
        alt={alt || "Profile"} 
        className="object-cover"
      />
      <AvatarFallback>
        <User className="h-16 w-16" />
      </AvatarFallback>
    </Avatar>
  );
}