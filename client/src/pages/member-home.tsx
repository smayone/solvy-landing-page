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
          <div className="flex flex-col items-center">
            <div className="relative mb-8">
              <Crown className="absolute -top-8 left-1/2 -translate-x-1/2 w-48 h-48 text-primary/20" />
              <Avatar className="w-32 h-32 relative z-10">
                <AvatarImage src="/path-to-member-avatar.jpg" />
                <AvatarFallback>
                  <User className="h-16 w-16" />
                </AvatarFallback>
              </Avatar>
            </div>
            <h1 className="text-4xl font-bold mb-8 text-center">
              Welcome to SOLVY!
            </h1>
            <h2 className="text-3xl mb-8 text-center">
              [Member Name]
            </h2>
            <h3 className="text-2xl mb-8 text-center">
              You're now a member of the DECIDEY NGO!
            </h3>
            <div className="space-y-4 text-center max-w-2xl">
              <p className="text-xl text-muted-foreground">
                We're excited to have you!
              </p>
              <p className="text-xl text-muted-foreground">
                This community is your gateway to sovereignitity, financial sovereignty securing your digital identity.
              </p>
              <p className="text-xl text-muted-foreground">
                Share your audacity to be a sovereignititee.
              </p>
            </div>
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