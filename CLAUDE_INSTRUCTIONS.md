# Claude Code Instructions - ShipFast Next.js 15 + Tailwind v4 + Supabase

## Project Context
You are working on a **ShipFast TypeScript SaaS boilerplate** that has been upgraded to use the latest technologies:
- **Next.js 15.4+** with App Router
- **React 19**
- **TypeScript 5.9+**
- **Tailwind CSS 4.1+** (CSS-first configuration)
- **DaisyUI 5.0+**
- **Supabase** for authentication and database
- **Stripe** for payments
- **Resend** for emails

## Critical Next.js 15 Changes You Must Follow

### 1. Async APIs - ALWAYS Use Await
```typescript
// ❌ WRONG (Next.js 14 style)
const headersList = headers();
const cookieStore = cookies();
const { id } = params;

// ✅ CORRECT (Next.js 15 style)
const headersList = await headers();
const cookieStore = await cookies();
const { id } = await params;
```

### 2. Dynamic Route Params Are Now Promises
```typescript
// ❌ WRONG
export default function Page({ params }: { params: { id: string } }) {
  const id = params.id;
}

// ✅ CORRECT
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
}

// Also applies to generateMetadata
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
}
```

### 3. Supabase Server Client is Now Async
```typescript
// ❌ WRONG
import { createClient } from "@/libs/supabase/server";
const supabase = createClient();

// ✅ CORRECT
import { createClient } from "@/libs/supabase/server";
const supabase = await createClient();
```

## Tailwind CSS v4 Patterns You Must Use

### 1. CSS-First Configuration
```css
/* app/globals.css */
@import "tailwindcss";

@theme {
  --color-brand-500: #570df8;
  --spacing-custom: 2.5rem;
  --animate-bounce-slow: bounce 2s infinite;
}
```

### 2. Custom Utilities
```css
@utility btn-gradient {
  background: linear-gradient(45deg, #570df8, #a855f7);
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
}
```

### 3. No More tailwind.config.js
- All configuration goes in CSS using `@theme`
- Use `@tailwindcss/postcss` plugin in PostCSS config
- DaisyUI themes are configured in CSS, not JS

## Supabase Patterns You Must Follow

### 1. Server Components (Most Common)
```typescript
import { createClient } from "@/libs/supabase/server";
import { redirect } from "next/navigation";

export default async function PrivatePage() {
  const supabase = await createClient(); // Always await!
  
  const { data: { user }, error } = await supabase.auth.getUser();
  
  if (!user) {
    redirect("/signin");
  }
  
  return <div>Protected content</div>;
}
```

### 2. Client Components
```typescript
"use client";
import { createClient } from "@/libs/supabase/client";
import { useEffect, useState } from "react";

export default function ClientComponent() {
  const supabase = createClient(); // No await for client
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, []);
}
```

### 3. API Routes
```typescript
import { createClient } from "@/libs/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const supabase = await createClient(); // Always await!
  
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  // Your logic here
}
```

## Component Patterns

### 1. Server Component (Default)
```typescript
// No "use client" directive
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Title",
};

export default async function Page() {
  // Can use await, fetch data, etc.
  return <div>Server component</div>;
}
```

### 2. Client Component (When Needed)
```typescript
"use client";
import { useState, useEffect } from "react";

export default function InteractiveComponent() {
  const [state, setState] = useState(false);
  
  return (
    <button onClick={() => setState(!state)}>
      {state ? "On" : "Off"}
    </button>
  );
}
```

## API Route Patterns

### 1. Webhook Handler (Stripe)
```typescript
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const headersList = await headers(); // Must await!
  const signature = headersList.get("stripe-signature");
  
  // Verify webhook signature
  // Handle webhook event
}
```

### 2. Protected API Route
```typescript
import { createClient } from "@/libs/supabase/server";

export async function POST(req: NextRequest) {
  const supabase = await createClient(); // Must await!
  
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  // Protected logic here
}
```

## Styling Patterns

### 1. Use DaisyUI Components
```jsx
<div className="card bg-base-100 shadow-xl">
  <div className="card-body">
    <h2 className="card-title">Card Title</h2>
    <p>Card content</p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary">Action</button>
    </div>
  </div>
</div>
```

### 2. Responsive Design
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <div className="p-4 bg-base-200 rounded-lg">Content</div>
</div>
```

### 3. Custom Styles with CSS Variables
```jsx
<div 
  className="p-4 rounded-lg"
  style={{ backgroundColor: "var(--color-brand-500)" }}
>
  Custom colored content
</div>
```

## Error Handling Patterns

### 1. API Routes
```typescript
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    if (!body.email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }
    
    // Your logic
    return NextResponse.json({ success: true });
    
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
```

### 2. Client Components
```typescript
"use client";
import { toast } from "react-hot-toast";

export default function Component() {
  const handleAction = async () => {
    try {
      const response = await fetch("/api/action", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: "example" }),
      });
      
      if (!response.ok) {
        throw new Error("Action failed");
      }
      
      toast.success("Action completed successfully!");
      
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    }
  };
}
```

## Common Mistakes to Avoid

### ❌ Don't Do This
```typescript
// Using old Next.js 14 patterns
const params = { id: "123" }; // params should be awaited
const headers = headers(); // should be await headers()
const supabase = createClient(); // should be await createClient() for server

// Using old Tailwind config
module.exports = { theme: { ... } }; // Should be CSS @theme

// Hardcoding values
const apiUrl = "https://api.example.com"; // Should use env vars
```

### ✅ Do This Instead
```typescript
// Next.js 15 patterns
const { id } = await params;
const headersList = await headers();
const supabase = await createClient();

// Tailwind v4 CSS config
@theme {
  --color-primary: #570df8;
}

// Environment variables
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
```

## File Structure You Should Follow
```
app/
├── api/
│   ├── auth/callback/route.ts
│   ├── stripe/
│   │   ├── create-checkout/route.ts
│   │   └── create-portal/route.ts
│   └── webhook/stripe/route.ts
├── blog/[articleId]/page.tsx
├── dashboard/
│   ├── layout.tsx
│   └── page.tsx
├── globals.css
└── layout.tsx

components/
├── ButtonCheckout.tsx
├── ButtonSignin.tsx
└── LayoutClient.tsx

libs/
├── supabase/
│   ├── client.ts
│   └── server.ts
├── stripe.ts
└── resend.ts
```

## When to Use Each Pattern

### Use Server Components When:
- Fetching data from database/API
- Handling authentication checks
- Generating metadata
- Static content rendering

### Use Client Components When:
- Handling user interactions (clicks, form inputs)
- Managing local state
- Using browser APIs
- Real-time features

### Use API Routes When:
- Handling form submissions
- Webhook endpoints
- Server-side operations
- Database mutations

## Testing Considerations

### Test Build Command
Always test that the project builds successfully:
```bash
npm run build
```

### Common Build Errors to Watch For:
1. Missing `await` on async Next.js 15 APIs
2. Incorrect `params` typing in dynamic routes
3. Client/Server component boundary issues
4. Missing environment variables
5. Tailwind CSS configuration errors

Remember: This project uses the latest versions of all technologies, so always follow the patterns shown above for compatibility and best practices. 