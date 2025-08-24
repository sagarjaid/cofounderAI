# Onboarding Flow Implementation

## Overview
This implementation provides an efficient onboarding flow that automatically redirects users based on their onboarding completion status. The system works at multiple levels to ensure a seamless user experience while preserving access to public pages.

## How It Works

### 1. **Middleware Level (Primary Protection)**
- **File**: `libs/supabase/middleware.ts`
- **Purpose**: Intercepts requests and provides multi-layer protection
- **Behavior**:
  - **Public Routes** (no checks): `/`, `/privacy-policy`, `/tos`, `/signin`, `/blog`
  - **Protected Routes** (require authentication + onboarding checks):
    - **Authentication Check**: Unauthenticated users are redirected to `/signin`
    - **Onboarding Check**: 
      - If user tries to access `/onboarding` but has completed it → redirects to `/dashboard`
      - If user tries to access `/dashboard` but hasn't completed onboarding → redirects to `/onboarding`
  - Skips API routes and static files to avoid performance impact

### 2. **Auth Callback (Post-Login Redirect)**
- **File**: `app/api/auth/callback/route.ts`
- **Purpose**: Handles redirects immediately after successful authentication
- **Behavior**:
  - Checks user's onboarding status after login
  - Redirects to `/dashboard` if onboarding is complete
  - Redirects to `/onboarding` if onboarding is incomplete
  - Fallback to `/onboarding` if something goes wrong

### 3. **Page-Level Protection**
- **File**: `app/onboarding/page.tsx`
- **Purpose**: Additional safety checks and graceful error handling
- **Behavior**:
  - Checks if user is authenticated (redirects to signin if not)
  - Checks if user has already completed onboarding (redirects to dashboard if complete)
  - Handles authentication errors gracefully

## Key Benefits

### **Efficiency**
- **Selective Protection**: Only protects routes that need onboarding checks
- **Public Access Preserved**: Users can freely browse public pages without redirects
- **Minimal Database Calls**: Onboarding status is checked only when necessary
- **Fast Response**: Redirects happen at the middleware level before page rendering

### **User Experience**
- **Seamless Flow**: Users are automatically directed to the right place when needed
- **Public Freedom**: Users can access public pages without interruption
- **No Manual Navigation**: Eliminates confusion about where to go next
- **Consistent Behavior**: Same logic applied across all protected routes

### **Maintainability**
- **Centralized Logic**: Most redirect logic is in middleware
- **Easy to Modify**: Change onboarding requirements in one place
- **Clear Separation**: Each layer has a specific responsibility
- **Configurable Routes**: Easy to add/remove public routes

## Route Protection Strategy

### **Public Routes (No Authentication or Onboarding Checks)**
```typescript
const publicRoutes = [
  '/',                    // Home page
  '/privacy-policy',      // Privacy policy
  '/tos',                 // Terms of service
  '/signin',              // Sign in page
  '/blog',                // Blog (if you have one)
];
```

### **Protected Routes (Require Authentication + Onboarding Checks)**
```typescript
const protectedRoutes = [
  '/onboarding',          // Onboarding page
  '/dashboard',           // Dashboard page
];
```

### **Protection Levels**
1. **Authentication Required**: All protected routes first check if user is logged in
2. **Onboarding Status Check**: After authentication, onboarding status is verified
3. **Appropriate Redirects**: Users are sent to the right place based on their status

### **Adding New Public Routes**
To make a route public (no authentication or onboarding checks), simply add it to the `publicRoutes` array in the middleware.

### **Adding New Protected Routes**
To protect additional routes, add them to the `protectedRoutes` array:

```typescript
// In middleware.ts - add to protectedRoutes array
const protectedRoutes = [
  '/onboarding',          // Onboarding page
  '/dashboard',           // Dashboard page
  '/new-protected-route', // New protected route
];
```

The middleware will automatically apply both authentication and onboarding checks to any route in this array.

## Database Schema

The system relies on the `profiles` table having an `onboarding_complete` boolean field:

```sql
-- Example schema (adjust based on your actual table structure)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  onboarding_complete BOOLEAN DEFAULT FALSE,
  -- ... other fields
);
```

## Flow Diagram

```
User Access → Middleware Check → Route Type
                ↓
        ┌─────────────┬─────────────┐
        │   Public    │ Protected   │
        ↓             ↓             ↓
    No Redirects   Auth Check   Onboarding Check
                   ↓             ↓
               Redirect to    Redirect based on
               /signin        onboarding status
```

## Customization

### **Changing Onboarding Requirements**
Modify the `onboarding_complete` logic in the onboarding form submission or add additional fields to check.

### **Adding Onboarding Steps**
The current implementation supports 4 steps, but you can easily extend this by:
1. Updating the `totalSteps` variable
2. Adding new form fields
3. Updating the validation logic

## Testing

### **Test Cases**
1. **Unauthenticated User**: Should be redirected to `/signin` when accessing protected routes
2. **New User**: Should be redirected to `/onboarding` after login
3. **Completed User**: Should be redirected to `/dashboard` after login
4. **Direct Access**: Users can't bypass authentication by directly accessing protected routes
5. **Completed Access**: Users can't access `/onboarding` if already completed
6. **Public Pages**: Users can access public pages without any redirects
7. **Mixed Navigation**: Users can navigate between public and protected routes appropriately

### **Edge Cases Handled**
- **No Profile**: Users without profiles are treated as incomplete
- **API Routes**: Middleware skips API calls to avoid interference
- **Static Files**: Images and other assets are not affected
- **Error Handling**: Graceful fallbacks if database queries fail
- **Public Access**: Authenticated users can browse public pages freely
- **Authentication Errors**: Graceful handling of auth session issues

## Performance Considerations

- **Middleware Optimization**: Only runs on page routes, not API calls
- **Selective Checks**: Only checks authentication and onboarding for protected routes
- **Caching**: Consider adding Redis caching for frequently accessed user profiles
- **Database Indexes**: Ensure `onboarding_complete` field is indexed for fast queries
- **Lazy Loading**: Authentication and onboarding status are only checked when necessary

## Security

- **Row Level Security**: Ensure your Supabase RLS policies protect the profiles table
- **Authentication Required**: All protected routes require valid user sessions
- **No Information Leakage**: Failed queries don't expose sensitive data
- **Route Protection**: Only necessary routes are protected, maintaining flexibility
- **Multi-Layer Security**: Authentication check before onboarding status check
- **Graceful Error Handling**: Authentication errors don't crash the application
