"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Zap,
  Shield,
  Calendar,
  Linkedin,
  Search,
  Star,
  Sparkle,
} from "lucide-react";
import Link from "next/link";
import { signInWithLinkedIn, getCurrentUser } from "@/libs/supabase/auth";
import { useState, useEffect } from "react";
import FooterBig from "@/components/FooterBig";

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error("Error checking auth:", error);
      } finally {
        setIsCheckingAuth(false);
      }
    };

    checkAuth();
  }, []);

  const handleLinkedInSignIn = async () => {
    setIsLoading(true);
    try {
      await signInWithLinkedIn();
    } catch (error) {
      console.error("LinkedIn sign in error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading state while checking authentication
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen ">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sparkle
              className="w-7 h-7 text-black p-0.5 rounded border bg-black border-black"
              fill="white"
            />

            <span className="text-xl font-extrabold ">CoFounderAI</span>
            <Badge variant="secondary" className="ml-2 hidden sm:block">
              BETA
            </Badge>
          </div>

          <div className="flex items-center space-x-3">
            <Link
              href="#pricing"
              className="text-sm font-medium hover:text-blue-600"
            >
              Pricing
            </Link>
            {user ? (
              <Button asChild>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            ) : (
              <Button onClick={handleLinkedInSignIn} disabled={isLoading}>
                {isLoading ? "Connecting..." : "Join Beta"}
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-32 px-4 bg-gradient-to-t from-white via-blue-100 to-white">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="mb-12">
            <Badge className="bg-white text-gray-600 px-4 border-gray-100 py-2 rounded-full border">
              Now in Private Beta - Free Access
            </Badge>
          </div>

          <h1 className="text-2xl md:text-5xl text-black font-extrabold my-6 ">
            Find Co-Founder in Days, Not Months
          </h1>
          <p className="text-lg max-w-2xl mx-auto text-slate-700 mb-8 leading-relaxed">
            Join an exclusive network of verified entrepreneurs. Connect with
            Hackers, Hipsters, and Hustlers who are ready to build the next big
            thing together.
          </p>

          <div className="flex flex-col items-center gap-4 text-center  text-gray-600 sm:text-base">
            <img src="/usedby.png" className="w-[250px] " />{" "}
          
            <p className="text-center text-base">
              100+ founders already signup
            </p>

            {/* <LoginWithGoogle /> */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {user ? (
                <Button
                  size="lg"
                  className="text-lg px-8 py-6 cursor-pointer"
                  asChild
                >
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
              ) : (
                <Button
                  size="lg"
                  className="text-lg px-8 py-6 bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
                  onClick={handleLinkedInSignIn}
                  disabled={isLoading}
                >
                  {isLoading ? "Connecting..." : "Connect with LinkedIn"}
                </Button>
              )}
            </div>
           
            <span className="text-xs">✓ No credit card required</span>
          </div>
        </div>
      </section>

      {/* Founder Types */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Find Your Co-Founder Type
            </h2>
            <p className="text-slate-600 text-lg">
              Connect with the right skills to complement your expertise
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle className="text-blue-600">🧑‍💻 Hacker</CardTitle>
                <CardDescription>Technical Co-Founders</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600">
                  Developers, engineers, and technical experts who can build and
                  scale your product.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-purple-600" />
                </div>
                <CardTitle className="text-purple-600">🎨 Hipster</CardTitle>
                <CardDescription>Design & Product Co-Founders</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600">
                  Designers, product managers, and UX experts who create amazing
                  user experiences.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle className="text-green-600">📈 Hustler</CardTitle>
                <CardDescription>Business Co-Founders</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600">
                  Sales, marketing, and business development experts who drive
                  growth and revenue.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-16 px-4 bg-slate-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose CoFounder?</h2>
            <p className="text-slate-600 text-lg">
              Built for serious entrepreneurs who are ready to commit
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Shield className="w-8 h-8 text-blue-600 mb-2" />
                <CardTitle>Verified Profiles</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600">
                  All members verified through LinkedIn. No fake profiles, only
                  serious entrepreneurs.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Calendar className="w-8 h-8 text-purple-600 mb-2" />
                <CardTitle>Easy Scheduling</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600">
                  Integrated calendar booking. Schedule meetings directly
                  through Calendly, Google Calendar, or Cal.com.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Search className="w-8 h-8 text-green-600 mb-2" />
                <CardTitle>Smart Matching</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600">
                  Advanced filters by location, availability, skills, and
                  co-founder type for perfect matches.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-slate-600 text-lg mb-12">
            Join our exclusive network of verified entrepreneurs
          </p>

          <div className="flex flex-col items-center max-w-xs gap-8 w-full mx-auto">
            <div className="bg-white border-2 border-green-200 rounded-lg p-4 shadow-sm relative w-full">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-extrabold text-green-700 my-2">
                  Success Plan
                </h3>
                <p className="text-gray-500 text-xs">
                  Limited time beta access
                </p>
              </div>

              <div className="text-center space-y-4">
                <div className="text-4xl font-extrabold text-gray-800 my-4">
                  FREE
                </div>
                <div className="text-xl text-gray-500 line-through mb-4">
                  $49/month
                </div>

                <div className="flex  border-t-1 pt-6 flex-col gap-2 items-center">
                  <span className="text-sm text-black">
                    Full platform access
                  </span>
                  <span className="text-sm text-black">Unlimited search</span>
                  <span className="text-sm text-black">
                    Calendar integration
                  </span>
                  <span className="text-sm text-black">Priority support</span>
                  <span className="text-sm text-black">Featured profile</span>
                  <span className="text-sm text-black">And many more</span>
                </div>

                <div className="mt-6">
                  <button className="bg-green-700 w-full rounded hover:bg-green-800 text-white font-semibold py-3 px-6 cursor-pointer">
                    Get a Co-Founder Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}

      <div className=" w-full flex items-center justify-center">
        <div className=" m-4 flex max-w-4xl flex-col items-center text-center justify-center gap-6 rounded-2xl bg-blue-500 py-8 px-10 text-white">
          <div className="mt-4 text-3xl font-bold">
            Take the first step toward your dream startup today!
          </div>
          <p className="max-w-lg text-center">
            Turn Months of Searching Into Days of Matching, Join hundreds of
            entrepreneurs who are building the future together.
          </p>

          {user ? (
            <Button
              size="lg"
              variant="secondary"
              className="text-lg px-8 py-6"
              asChild
            >
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          ) : (
            <Button
              size="lg"
              variant="secondary"
              className="text-lg px-8 py-6 rounded-full cursor-pointer"
              onClick={handleLinkedInSignIn}
              disabled={isLoading}
            >
              {isLoading ? "Connecting..." : "Join Private Beta"}
            </Button>
          )}
        </div>
      </div>

      {/* Footer */}
      <FooterBig />
    </div>
  );
}
