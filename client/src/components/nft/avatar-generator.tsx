import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const COLORS = [
  "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEEAD",
  "#D4A5A5", "#9A89B4", "#FF9999", "#A3D39C", "#7FDBFF"
];

const SHAPES = ["circle", "square", "triangle", "hexagon", "star"];

interface AvatarGeneratorProps {
  onGenerate?: (avatarDataUrl: string) => void;
}

export function AvatarGenerator({ onGenerate }: AvatarGeneratorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [complexity, setComplexity] = useState(5);
  const [primaryColor, setPrimaryColor] = useState(COLORS[0]);
  const [shape, setShape] = useState(SHAPES[0]);
  const { toast } = useToast();

  const generateAvatar = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set background
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Generate unique pattern based on parameters
    for (let i = 0; i < complexity; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const size = (Math.random() * 50) + 20;

      ctx.fillStyle = primaryColor;
      ctx.beginPath();

      switch (shape) {
        case "circle":
          ctx.arc(x, y, size / 2, 0, Math.PI * 2);
          break;
        case "square":
          ctx.rect(x - size / 2, y - size / 2, size, size);
          break;
        case "triangle":
          ctx.moveTo(x, y - size / 2);
          ctx.lineTo(x + size / 2, y + size / 2);
          ctx.lineTo(x - size / 2, y + size / 2);
          break;
        case "hexagon":
          for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i;
            const px = x + size * Math.cos(angle);
            const py = y + size * Math.sin(angle);
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          break;
        case "star":
          for (let i = 0; i < 5; i++) {
            const angle = (Math.PI * 2 * i) / 5 - Math.PI / 2;
            const px = x + size * Math.cos(angle);
            const py = y + size * Math.sin(angle);
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          break;
      }

      ctx.closePath();
      ctx.fill();
    }

    if (onGenerate) {
      onGenerate(canvas.toDataURL());
    }

    toast({
      title: "Avatar Generated",
      description: "Your unique NFT avatar has been created!",
    });
  };

  useEffect(() => {
    generateAvatar();
  }, [complexity, primaryColor, shape]);

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Generate NFT Avatar</CardTitle>
        <CardDescription>
          Customize your unique NFT avatar by adjusting the parameters below
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <canvas
            ref={canvasRef}
            width={400}
            height={400}
            className="w-full aspect-square rounded-lg border mb-4"
          />
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Complexity</Label>
            <Slider
              value={[complexity]}
              onValueChange={([value]) => setComplexity(value)}
              min={1}
              max={10}
              step={1}
            />
          </div>

          <div className="space-y-2">
            <Label>Primary Color</Label>
            <Select value={primaryColor} onValueChange={setPrimaryColor}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {COLORS.map((color) => (
                  <SelectItem key={color} value={color}>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: color }}
                      />
                      {color}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Shape</Label>
            <Select value={shape} onValueChange={setShape}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {SHAPES.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button onClick={generateAvatar} className="w-full">
            Generate New Avatar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
