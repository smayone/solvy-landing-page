import { Facebook, Twitter, Linkedin, Link2 } from "lucide-react";
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
        case 'twitter':
          window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(currentUrl)}`, '_blank');
          break;
        case 'linkedin':
          window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`, '_blank');
          break;
        case 'copy':
          await navigator.clipboard.writeText(currentUrl);
          toast({
            title: "Link copied!",
            description: "The link has been copied to your clipboard.",
          });
          break;
        case 'native':
          if (navigator.share) {
            await navigator.share(shareData);
          } else {
            throw new Error('Native sharing not supported');
          }
          break;
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
        onClick={() => handleShare('twitter')}
        className="hover:bg-[#1DA1F2] hover:text-white"
      >
        <Twitter className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => handleShare('linkedin')}
        className="hover:bg-[#0A66C2] hover:text-white"
      >
        <Linkedin className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => handleShare('copy')}
        className="hover:bg-primary hover:text-primary-foreground"
      >
        <Link2 className="h-4 w-4" />
      </Button>
      {typeof navigator !== 'undefined' && 'share' in navigator && (
        <Button
          variant="outline"
          onClick={() => handleShare('native')}
          className="hover:bg-primary hover:text-primary-foreground"
        >
          Share
        </Button>
      )}
    </div>
  );
}