import { NextResponse, NextRequest } from "next/server";
import { createClient } from "@/libs/supabase/server";

export const dynamic = "force-dynamic";

// This route is called after a successful login. It exchanges the code for a session and redirects based on onboarding status.
export async function GET(req: NextRequest) {
  const requestUrl = new URL(req.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    const supabase = await createClient();
    await supabase.auth.exchangeCodeForSession(code);
    
    // Get user and check onboarding status
    const { data: { user } } = await supabase.auth.getUser();
    
    if (user) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("onboarding_complete")
        .eq("id", user.id)
        .single();

      // Redirect based on onboarding status
      if (profile?.onboarding_complete) {
        return NextResponse.redirect(requestUrl.origin + "/dashboard");
      } else {
        return NextResponse.redirect(requestUrl.origin + "/onboarding");
      }
    }
  }

  // Fallback redirect to onboarding if something goes wrong
  return NextResponse.redirect(requestUrl.origin + "/onboarding");
}
