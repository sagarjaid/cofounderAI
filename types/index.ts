export * from "./config";

export interface Profile {
  id: string;
  email?: string;
  full_name?: string;
  first_name?: string;
  last_name?: string;
  avatar_url?: string;
  linkedin_url?: string;
  location?: string;
  timezone?: string;
  founder_type?: "hacker" | "hipster" | "hustler" | null;
  looking_for?: string[];
  weekly_hours?: string;
  has_idea?: string;
  idea_description?: string;
  looking_to_join?: boolean;
  calendar_type?: string;
  calendar_url?: string;
  bio?: string;
  skills?: string[];
  onboarding_complete?: boolean;
  price_id?: string;
  customer_id?: string;
  created_at?: string;
  updated_at?: string;
}
