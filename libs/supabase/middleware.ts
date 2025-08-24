import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // refreshing the auth token
  const { data: { user } } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;
  
  // Skip middleware for API routes and static files
  if (pathname.startsWith('/api/') || pathname.startsWith('/_next/')) {
    return supabaseResponse;
  }

  // Define public routes that don't need authentication or onboarding checks
  const publicRoutes = [
    '/',                    // Home page
    '/privacy-policy',      // Privacy policy
    '/tos',                 // Terms of service
    '/signin',              // Sign in page
    '/blog',                // Blog (if you have one)
  ];

  // Define protected routes that require authentication
  const protectedRoutes = [
    '/onboarding',          // Onboarding page
    '/dashboard',           // Dashboard page
  ];

  // Check if the current route is protected
  if (protectedRoutes.includes(pathname)) {
    // If user is not authenticated, redirect to signin
    if (!user) {
      return NextResponse.redirect(new URL('/signin', request.url));
    }

    // If user is authenticated, check onboarding status
    const { data: profile } = await supabase
      .from("profiles")
      .select("onboarding_complete")
      .eq("id", user.id)
      .single();

    // Handle onboarding page access
    if (pathname === '/onboarding') {
      if (profile?.onboarding_complete) {
        // Redirect to dashboard if onboarding is already complete
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }
    }

    // Handle dashboard page access
    if (pathname === '/dashboard') {
      if (!profile?.onboarding_complete) {
        // Redirect to onboarding if not complete
        return NextResponse.redirect(new URL('/onboarding', request.url));
      }
    }
  }

  return supabaseResponse;
}
