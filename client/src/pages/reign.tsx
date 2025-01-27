import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { Heart, ShoppingCart, Play, Info, Shield, Star, Sparkles, Award, User, Building2 } from "lucide-react";
import { Link } from "wouter";

export default function ReignProducts() {
  const { t } = useTranslation();
  const [showVideo, setShowVideo] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Financial Platform Information */}
      <section className="bg-primary/5 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <Heart className="h-12 w-12 text-pink-500 mx-auto mb-6" />
            <h1 className="text-4xl font-bold mb-4">YOUR JEWEL SANITARY NAPKINS LLC</h1>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Revolutionary sanitary napkins powered by patented graphene technology.
              Experience unmatched comfort and protection.
            </p>

            <div className="mt-6 flex flex-col items-center gap-2">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">Proudly Veteran & African American Owned</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                <span className="text-sm">Your Representative: Evergreen Beauty Lounge (ID: 301272)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Patent & Technology Section */}
      <section className="py-16 container mx-auto px-4">
        <div className="text-center mb-12">
          <Shield className="h-10 w-10 mx-auto mb-4 text-primary" />
          <h2 className="text-3xl font-bold mb-4">Patented Graphene Technology</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Our revolutionary sanitary napkins are powered by patented graphene technology,
            providing superior absorption, antibacterial properties, and unmatched comfort.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          <Card>
            <CardHeader>
              <Sparkles className="h-6 w-6 mb-2 text-primary" />
              <CardTitle>Graphene Enhanced</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Our secret ingredient - graphene - provides superior absorption and antimicrobial properties
                while maintaining breathability
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Shield className="h-6 w-6 mb-2 text-primary" />
              <CardTitle>Patented Protection</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Protected by international patents, our unique graphene integration
                technology sets new standards in feminine care
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Star className="h-6 w-6 mb-2 text-primary" />
              <CardTitle>Cutting-Edge Science</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Developed through years of research, our technology combines comfort
                with advanced materials science
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Product Video Section */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4">
          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle>See Our Innovation in Action</CardTitle>
              <CardDescription>
                Watch how our patented graphene technology revolutionizes feminine care
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video">
                <iframe
                  src="https://www.youtube.com/embed/o5qMsif06C4"
                  className="w-full h-full rounded-lg"
                  allowFullScreen
                  title="YOUR JEWEL SANITARY NAPKINS LLC Product Demo"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Product Features */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Products?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Superior Technology</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Patented graphene technology provides unmatched absorption and protection
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Eco-Conscious Design</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Innovative materials reduce environmental impact while maximizing performance
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Health-Focused</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Antibacterial properties and breathable design promote better hygiene
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Ecosystem Section */}
      <section className="py-16 container mx-auto px-4">
        <div className="text-center mb-12">
          <img
            src="/SolvyLogo-1024.png"
            alt="SOLVY Ecosystem"
            className="h-16 w-auto mx-auto mb-6"
          />
          <h2 className="text-3xl font-bold mb-4">SOLVY Ecosystem</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Our revolutionary ecosystem integrates blockchain technology with real-world financial solutions,
            providing unmatched security and efficiency.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          <Card>
            <CardHeader>
              <Shield className="h-6 w-6 mb-2 text-primary" />
              <CardTitle>DECIDEY Foundation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Drawing the line through foundational education, empowering informed decisions about our economic future
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Building2 className="h-6 w-6 mb-2 text-primary" />
              <CardTitle>SOLVY Platform</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Providing the mechanism and vehicle for markets to exercise true financial autonomy
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Heart className="h-6 w-6 mb-2 text-primary" />
              <CardTitle>Community Support</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Fostering a supportive network of empowered individuals committed to financial sovereignty
              </p>
            </CardContent>
          </Card>
        </div>
      </section>


      {/* Call to Action */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Experience the Future of Feminine Care</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="gap-2">
              <ShoppingCart className="h-5 w-5" />
              Shop Now
            </Button>
            <Button size="lg" variant="outline" className="gap-2" asChild>
              <Link href="/reign/dao">
                <div className="flex items-center">
                  <Heart className="h-5 w-5 mr-2" />
                  Join Our Community DAO
                </div>
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="gap-2">
              <Info className="h-5 w-5" />
              Learn More About Our Technology
            </Button>
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            Contact your representative: Evergreen Beauty Lounge (ID: 301272) for more information
          </p>
        </div>
      </section>
    </div>
  );
}