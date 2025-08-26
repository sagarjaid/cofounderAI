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
  Check,
} from "lucide-react";
import Link from "next/link";
import { signInWithLinkedIn, getCurrentUser } from "@/libs/supabase/auth";
import { useState, useEffect } from "react";
import FooterBig from "@/components/FooterBig";
import Sam from "@/app/sam.png";  
import Naval from "@/app/naval.png";
import Michael from "@/app/michael.png";
      
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
            <Badge className="bg-white text-gray-600 px-4 border-gray-200 py-2 rounded-full border">
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
                  {isLoading ? "Connecting..." : "Continue with LinkedIn"}
                </Button>
              )}
            </div>
           
            <span className="text-xs">✓ No credit card required</span>
          </div>
        </div>
      </section>

      {/* Founder Types */}
      <section className="py-30 px-4 bg-white">
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
      <section id="pricing" className="py-30 px-4 bg-white">
        <div className="flex flex-col items-center mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-slate-600 text-lg mb-12">
          Pricing designed to get you a co-founder
          </p>

          <div className="flex flex-col items-start max-w-sm gap-6 w-full">
            <div className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-white p-6 rounded-xl w-full shadow-lg">
              
              {/* Header Section */}
              <div className="text-left mb-6">
                <div className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full mb-3">
                  Limited Time Beta Access
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Success Plan
                </h3>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-4xl font-black text-green-600">FREE</span>
                   
                  <span className="text-lg text-gray-400 line-through">$49/month</span>
                </div>
                <p className="text-sm text-gray-600">
                  Get started with full platform access
                </p>
              </div>

              {/* Features List */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-green-600" strokeWidth={3} /> 
                  <span className="text-sm text-gray-700">Full platform access</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-green-600" strokeWidth={3} /> 
                  <span className="text-sm text-gray-700">Unlimited search</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-green-600" strokeWidth={3} /> 
                  <span className="text-sm text-gray-700">Calendar integration</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-green-600" strokeWidth={3} /> 
                  <span className="text-sm text-gray-700">Priority support</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-green-600" strokeWidth={3} /> 
                  <span className="text-sm text-gray-700">Featured profile</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-green-600" strokeWidth={3} /> 
                  <span className="text-sm text-gray-700">And many more features</span>
                </div>
              </div>

              {/* CTA Button */}
              <button className="w-full text-sm bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold p-4 rounded transition-all duration-200 transform  cursor-pointer">
                Start finding co-founder Now!
              </button>
              
            </div>
          </div>
        </div>
      </section>

      {/* Headout */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h3 className="text-center text-2xl md:text-3xl font-bold text-gray-900 mb-20">
            What they say about startup co-founders?
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">


                        {/* Item 2 */}
                        <div className="flex flex-col items-center text-center">
              <div className="relative w-full max-w-xs">
                <div className="bg-gray-900 text-white rounded-xl px-5 py-6  h-40 flex items-center justify-center leading-relaxed shadow-md relative after:content-[''] after:absolute after:bottom-[-12px] after:left-1/2 after:-translate-x-1/2 after:w-6 after:h-6 after:bg-gray-900 after:rotate-45 after:rounded-sm">
                  “Invest in working with people you trust. The right
                  co-founder is a force multiplier.”
                </div>
              </div>
              <div className="mt-6 flex flex-col items-center">
                <img src={Naval.src} alt="Entrepreneur" className="h-30 w-30 object-contain" />
                <div className="mt-3 text-sm font-semibold tracking-wide">
                  Naval Ravikant
                </div>
                <div className="text-xs text-gray-500">Angel Investor</div>
              </div>
            </div>

            {/* Item 1 */}
            <div className="flex flex-col items-center text-center">
              <div className="relative w-full max-w-xs">
                <div className="bg-gray-900 text-white rounded-xl px-5 py-6 h-40 flex items-center justify-center leading-relaxed shadow-md relative after:content-[''] after:absolute after:bottom-[-12px] after:left-1/2 after:-translate-x-1/2 after:w-6 after:h-6 after:bg-gray-900 after:rotate-45 after:rounded-sm">
                  “Do these things before you start: talk to users and ship
                  something. Startups die of indifference more than
                  competition.”
                </div>
              </div>
              <div className="mt-6 flex flex-col items-center">
                <img src={Sam.src} alt="Entrepreneur" className="h-40 w-40 object-contain" />
                <div className="mt-3 text-sm font-semibold tracking-wide">
                  Sam Altman
                </div>
                <div className="text-xs text-gray-500">OPENAI founder</div>
              </div>
            </div>



            {/* Item 3 */}
            <div className="flex flex-col items-center text-center">
              <div className="relative w-full max-w-xs">
                <div className="bg-gray-900 text-white rounded-xl px-5 py-6 h-40 flex items-center justify-center leading-relaxed shadow-md relative after:content-[''] after:absolute after:bottom-[-12px] after:left-1/2 after:-translate-x-1/2 after:w-6 after:h-6 after:bg-gray-900 after:rotate-45 after:rounded-sm">
                  “The top twenty most valuable tech companies out of the U.S.
                  have at least two co-founders.”
                </div>
              </div>
              <div className="mt-6 flex flex-col items-center">
                <img src={Michael.src} alt="Entrepreneur" className="h-30 w-30 object-contain" />
                <div className="mt-3 text-sm font-semibold tracking-wide">
                  Michael Seibel
                </div>
                <div className="text-xs text-gray-500">YC Partner</div>
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
