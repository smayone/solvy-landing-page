import { Facebook } from "lucide-react";
import { SiYoutube } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { solvyDomains } from "@/lib/domains";

interface ShareButtonsProps {
  title: string;
  description: string;
  url?: string;
}

export function ShareButtons({ title, description, url }: ShareButtonsProps) {
  const { toast } = useToast();
  const educationDomain = solvyDomains.find(d => d.name === "Education")?.domain;
  const currentUrl = url || (typeof window !== 'undefined' ? window.location.href : '');

  // Only allow sharing if we're on the education domain
  const isEducationDomain = typeof window !== 'undefined' && 
    window.location.hostname === educationDomain;

  const shareData = {
    title,
    text: description,
    url: currentUrl,
  };

  const handleShare = async (platform: string) => {
    if (!isEducationDomain) {
      toast({
        title: "Sharing restricted",
        description: "Sharing is only available on education.solvy.chain",
        variant: "destructive",
      });
      return;
    }

    try {
      switch (platform) {
        case 'facebook':
          window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`, '_blank');
          break;
        case 'youtube':
          window.open(`https://www.youtube.com/watch?v=${encodeURIComponent(currentUrl)}`, '_blank');
          break;
        default:
          throw new Error('Unsupported platform');
      }
    } catch (error) {
      toast({
        title: "Sharing failed",
        description: "Could not share the content. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex gap-2 items-center">
      <Button
        variant="outline"
        size="icon"
        onClick={() => handleShare('facebook')}
        className="hover:bg-[#1877F2] hover:text-white"
      >
        <Facebook className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => handleShare('youtube')}
        className="hover:bg-[#FF0000] hover:text-white"
      >
        <SiYoutube className="h-4 w-4" />
      </Button>
    </div>
  );
}