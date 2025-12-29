import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HugeiconsIcon } from "@hugeicons/react";
import { Menu01Icon, LinkSquare02Icon, Image01Icon } from "@hugeicons/core-free-icons";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-background to-muted/50">
        <div className="container px-4 md:px-6 mx-auto text-center">
          <div className="flex flex-col items-center space-y-4">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-primary to-orange-600">
              Your Cafe's Digital Home
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Showcase your menu, links, and vibe in one beautiful link-in-bio.
              Designed for the modern food & beverage industry.
            </p>
            <div className="w-full max-w-sm space-y-4">
              <form className="flex flex-col sm:flex-row gap-2">
                <InputGroup className="h-11">
                    <InputGroupAddon align="inline-start">
                        bitebio.app/
                    </InputGroupAddon>
                    <InputGroupInput 
                        placeholder="your-cafe" 
                        type="text" 
                        className="h-full"
                    />
                </InputGroup>
                <Button asChild type="submit" size="lg" className="h-11">
                    <Link href="/onboard">Claim</Link>
                </Button>
              </form>
              <p className="text-xs text-muted-foreground">
                Start for free. No credit card required.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
            <Card className="border-none shadow-none bg-muted/30">
                <CardHeader>
                    <HugeiconsIcon icon={Menu01Icon} className="h-10 w-10 text-primary mb-2" />
                    <CardTitle>Digital Menu</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        Beautifully display your menu items with prices, descriptions, and photos.
                    </p>
                </CardContent>
            </Card>
            <Card className="border-none shadow-none bg-muted/30">
                <CardHeader>
                    <HugeiconsIcon icon={LinkSquare02Icon} className="h-10 w-10 text-primary mb-2" />
                    <CardTitle>Social Hub</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        Connect all your social media platforms and delivery apps in one place.
                    </p>
                </CardContent>
            </Card>
            <Card className="border-none shadow-none bg-muted/30">
                <CardHeader>
                    <HugeiconsIcon icon={Image01Icon} className="h-10 w-10 text-primary mb-2" />
                    <CardTitle>Visual Gallery</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        Showcase the ambiance of your space and your delicious dishes with a photo grid.
                    </p>
                </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
