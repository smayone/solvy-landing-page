import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Crown } from "@/components/ui/crown";
import { Textarea } from "@/components/ui/textarea";
import { User, Shield } from "lucide-react";
import { Communities } from "@/components/sections/communities";
import { Services } from "@/components/sections/services";

export default function MemberHome() {
  const [memberNote, setMemberNote] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Hero Section with Crowned Avatar */}
      <section className="relative py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-8">
              <Crown className="absolute -top-8 left-1/2 -translate-x-1/2 w-48 h-48 text-primary/20" />
              <Avatar className="w-32 h-32 relative z-10">
                <AvatarImage src="/path-to-member-avatar.jpg" />
                <AvatarFallback>
                  <User className="h-16 w-16" />
                </AvatarFallback>
              </Avatar>
            </div>
            <h1 className="text-4xl font-bold mb-4">Welcome to SOLVY</h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Your gateway to financial sovereignty and secure digital identity
            </p>
          </div>
        </div>
      </section>

      {/* Member's Personal Note Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">Your Personal Space</h2>
                <Button
                  variant="outline"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? "Save" : "Edit"}
                </Button>
              </div>
              {isEditing ? (
                <Textarea
                  value={memberNote}
                  onChange={(e) => setMemberNote(e.target.value)}
                  placeholder="Share your thoughts, goals, or reasons for joining SOLVY..."
                  className="min-h-[200px]"
                />
              ) : (
                <div className="prose max-w-none">
                  {memberNote ? (
                    <p>{memberNote}</p>
                  ) : (
                    <p className="text-muted-foreground">
                      Click edit to add your personal note...
                    </p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Regular Homepage Sections */}
      <Services />
      <Communities />
    </div>
  );
}
