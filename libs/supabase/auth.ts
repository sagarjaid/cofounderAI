import { createClient } from "./client";
import type { Profile } from "@/types";

export const signInWithLinkedIn = async () => {
  const supabase = createClient();
  const redirectTo =
    typeof window !== "undefined"
      ? `${window.location.origin}/api/auth/callback`
      : "http://localhost:3000/api/auth/callback";
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "linkedin_oidc",
    options: { redirectTo },
  });
  if (error) throw error;
};

export const signOut = async () => {
  const supabase = createClient()
  const { error } = await supabase.auth.signOut()
  if (error) {
    console.error("Error signing out:", error)
    throw error
  }
}

export const getCurrentUser = async () => {
  const supabase = createClient()
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()
  if (error) {
    console.error("Error getting current user:", error)
    return null
  }
  return user
}

export const getCurrentProfile = async () => {
  const supabase = createClient()
  const user = await getCurrentUser()
  if (!user) return null

  const { data: profile, error } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  if (error) {
    console.error("Error getting profile:", error)
    return null
  }

  return profile
}

export const updateProfile = async (profileData: Partial<Profile>) => {   
  const supabase = createClient();
  const user = await getCurrentUser();
  if (!user) throw new Error("No user logged in");
  const { error } = await supabase
    .from("profiles")
    .update({
      ...profileData,
      updated_at: new Date().toISOString(),
    })
    .eq("id", user.id);
  if (error) throw error;
};

export const isOnboardingComplete = async () => {
  const supabase = createClient()
  const user = await getCurrentUser()
  if (!user) return false

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("onboarding_complete")
    .eq("id", user.id)
    .single()

  if (error || !profile) return false
  return profile.onboarding_complete === true
}

export const redirectBasedOnOnboarding = async () => {
  const isComplete = await isOnboardingComplete()
  return isComplete ? "/dashboard" : "/onboarding"
}
